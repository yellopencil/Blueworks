(function () {
  const SUPABASE_URL = "https://uanpcrvzahjrbgjvvioz.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zJqlCjId8XiTq6W05l_JSA_8VHISJ3-";
  const SITE_ASSET_BUCKET = "site-assets";
  const PROJECT_DOCUMENT_BUCKET = "project-documents";
  const QUOTE_PDF_BUCKET = "quote-pdf-history";
  const DEFAULT_REQUEST_TIMEOUT_MS = 12000;
  const AUTH_REQUEST_TIMEOUT_MS = 15000;

  const bridge = {
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
    siteAssetBucket: SITE_ASSET_BUCKET,
    projectDocumentBucket: PROJECT_DOCUMENT_BUCKET,
    quotePdfBucket: QUOTE_PDF_BUCKET,
    client: null,
    cachedSession: null,
    mode: "supabase-pending",
    error: null,
    statusDetail: "",
    isConfigured() {
      return Boolean(this.url && this.publishableKey);
    },
    isReady() {
      return Boolean(this.client);
    },
    withTimeout(promise, timeoutMs, fallbackMessage) {
      let timeoutId = null;
      return Promise.race([
        Promise.resolve(promise),
        new Promise((_, reject) => {
          timeoutId = window.setTimeout(() => {
            reject(new Error(fallbackMessage));
          }, timeoutMs);
        }),
      ]).finally(() => {
        if (timeoutId) window.clearTimeout(timeoutId);
      });
    },
    async runClientQuery(promise, fallbackMessage, timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS) {
      try {
        return await this.withTimeout(promise, timeoutMs, fallbackMessage);
      } catch (error) {
        return { data: null, error };
      }
    },
    setCachedSession(session) {
      this.cachedSession = session || null;
    },
    isSessionExpiringSoon(session, leewaySeconds = 45) {
      const expiresAt = Number(session?.expires_at || 0);
      if (!expiresAt) return false;
      return expiresAt - Math.floor(Date.now() / 1000) <= leewaySeconds;
    },
    async refreshCachedSession(force = false) {
      if (!this.client) {
        return { data: { session: null }, error: new Error("Supabase client is not ready.") };
      }
      if (!force && this.cachedSession?.access_token && !this.isSessionExpiringSoon(this.cachedSession)) {
        return { data: { session: this.cachedSession }, error: null };
      }
      if (typeof this.client.auth.refreshSession === "function" && this.cachedSession?.refresh_token) {
        const refreshResult = await this.runClientQuery(
          this.client.auth.refreshSession(),
          "로그인 상태 갱신 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
          AUTH_REQUEST_TIMEOUT_MS,
        );
        if (!refreshResult?.error && refreshResult?.data?.session) {
          this.setCachedSession(refreshResult.data.session);
          return refreshResult;
        }
      }
      return this.getSession();
    },
    async getAccessToken() {
      const sessionResult = await this.refreshCachedSession();
      return sessionResult?.data?.session?.access_token || "";
    },
    async restRequest(path, options = {}) {
      let accessToken = await this.getAccessToken();
      if (!accessToken) {
        return { data: null, error: new Error("Supabase session token is not ready.") };
      }
      const {
        method = "GET",
        query = "",
        body,
        prefer = "",
        timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
        timeoutMessage = "Supabase 요청 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      } = options;
      const requestUrl = `${this.url}/rest/v1/${path}${query ? `?${query}` : ""}`;
      const executeRequest = async (token) => {
        const headers = {
          apikey: this.publishableKey,
          Authorization: `Bearer ${token}`,
        };
        if (body !== undefined) headers["Content-Type"] = "application/json";
        if (prefer) headers.Prefer = prefer;
        const controller = typeof AbortController === "function" ? new AbortController() : null;
        const timeoutId = controller
          ? window.setTimeout(() => controller.abort(), timeoutMs)
          : null;
        try {
          return await fetch(requestUrl, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
            signal: controller?.signal,
          });
        } finally {
          if (timeoutId) window.clearTimeout(timeoutId);
        }
      };
      try {
        let response = await executeRequest(accessToken);
        if ((response.status === 401 || response.status === 403) && this.cachedSession?.refresh_token) {
          const refreshedSessionResult = await this.refreshCachedSession(true);
          const refreshedToken = refreshedSessionResult?.data?.session?.access_token || "";
          if (refreshedToken) {
            accessToken = refreshedToken;
            response = await executeRequest(accessToken);
          }
        }
        const text = await response.text();
        let parsed = null;
        if (text) {
          try {
            parsed = JSON.parse(text);
          } catch (error) {
            parsed = text;
          }
        }
        if (!response.ok) {
          const message =
            parsed?.message ||
            parsed?.error_description ||
            parsed?.hint ||
            parsed?.details ||
            response.statusText ||
            "Request failed.";
          return { data: null, error: new Error(message) };
        }
        return { data: parsed, error: null };
      } catch (error) {
        const nextError = error?.name === "AbortError" ? new Error(timeoutMessage) : error;
        return { data: null, error: nextError };
      }
    },
    async storageUploadRequest(bucket, objectPath, file) {
      let accessToken = await this.getAccessToken();
      if (!accessToken) {
        return { data: null, error: new Error("Supabase session token is not ready.") };
      }
      const requestUrl = `${this.url}/storage/v1/object/${bucket}/${objectPath}`;
      const timeoutMessage = "파일 업로드 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.";
      const executeUpload = async (token) => {
        const controller = typeof AbortController === "function" ? new AbortController() : null;
        const timeoutId = controller
          ? window.setTimeout(() => controller.abort(), 20000)
          : null;
        try {
          return await fetch(requestUrl, {
            method: "POST",
            headers: {
              apikey: this.publishableKey,
              Authorization: `Bearer ${token}`,
              "x-upsert": "true",
              "content-type": file?.type || "application/octet-stream",
            },
            body: file,
            signal: controller?.signal,
          });
        } finally {
          if (timeoutId) window.clearTimeout(timeoutId);
        }
      };
      try {
        let response = await executeUpload(accessToken);
        if ((response.status === 401 || response.status === 403) && this.cachedSession?.refresh_token) {
          const refreshedSessionResult = await this.refreshCachedSession(true);
          const refreshedToken = refreshedSessionResult?.data?.session?.access_token || "";
          if (refreshedToken) {
            accessToken = refreshedToken;
            response = await executeUpload(accessToken);
          }
        }
        const text = await response.text();
        let parsed = null;
        if (text) {
          try {
            parsed = JSON.parse(text);
          } catch (error) {
            parsed = text;
          }
        }
        if (!response.ok) {
          const message =
            parsed?.message ||
            parsed?.error ||
            parsed?.error_description ||
            parsed?.hint ||
            parsed?.details ||
            response.statusText ||
            "Storage upload failed.";
          return { data: null, error: new Error(message) };
        }
        return { data: parsed, error: null };
      } catch (error) {
        const nextError = error?.name === "AbortError" ? new Error(timeoutMessage) : error;
        return { data: null, error: nextError };
      }
    },
    async fetchProjects() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("projects").select("*").order("created_at", { ascending: false }),
        "프로젝트 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchSchedules() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("schedules").select("*").order("date", { ascending: true }),
        "일정 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchWorklogs() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client
          .from("worklogs")
          .select("*, worklog_tasks(*)")
          .order("worklog_date", { ascending: false }),
        "업무일지 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchYearGoals() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client
          .from("year_goals")
          .select("*")
          .order("year", { ascending: false })
          .order("half", { ascending: true })
          .order("created_at", { ascending: true }),
        "연간 목표 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchArchiveNotes() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("archive_notes").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
        "메모 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchArchiveCodeCategories() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("archive_code_categories").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }),
        "카테고리 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchArchiveCodes() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("archive_codes").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
        "코드 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchProfiles() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("profiles").select("*").order("created_at", { ascending: false }),
        "멤버 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchSiteSettings() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("site_settings").select("*").order("updated_at", { ascending: false }).limit(1),
        "사이트 설정 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchCurrentProfile(userId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("profiles").select("*").eq("id", userId).maybeSingle(),
        "계정 정보 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertProfile(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("profiles").upsert(payload).select().single(),
        "멤버 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertSiteSettings(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("site_settings").upsert(payload).select().single(),
        "사이트 설정 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertYearGoals(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("year_goals").upsert(payload).select(),
        "연간 목표 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertWorklog(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client
          .from("worklogs")
          .upsert(payload, { onConflict: "worklog_date" })
          .select()
          .single(),
        "업무일지 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async insertWorklogTasks(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(payload) || !payload.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("worklog_tasks").insert(payload).select(),
        "업무 항목 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteWorklogTasksByWorklogId(worklogId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!worklogId) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("worklog_tasks").delete().eq("worklog_id", worklogId),
        "업무 항목 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteWorklogsByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("worklogs").delete().in("id", ids),
        "업무일지 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteWorklogsByDates(dateKeys) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(dateKeys) || !dateKeys.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("worklogs").delete().in("worklog_date", dateKeys),
        "업무일지 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteYearGoalsByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("year_goals").delete().in("id", ids),
        "연간 목표 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchQuoteSettings() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.cachedSession?.access_token) {
        return this.restRequest("quote_settings", {
          method: "GET",
          query: "id=eq.global&select=*",
        }).then((result) => ({
          data: Array.isArray(result?.data) ? result.data[0] || null : result?.data || null,
          error: result?.error || null,
        }));
      }
      return this.runClientQuery(
        this.client.from("quote_settings").select("*").eq("id", "global").maybeSingle(),
        "견적 설정 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertQuoteSettings(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.cachedSession?.access_token) {
        return this.restRequest("quote_settings", {
          method: "POST",
          query: "on_conflict=id&select=*",
          body: payload,
          prefer: "resolution=merge-duplicates,return=representation",
        }).then((result) => ({
          data: Array.isArray(result?.data) ? result.data[0] || null : result?.data || null,
          error: result?.error || null,
        }));
      }
      return this.runClientQuery(
        this.client.from("quote_settings").upsert(payload).select().single(),
        "견적 설정 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchProjectDocuments() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("project_documents").select("*").order("created_at", { ascending: false }),
        "문서 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertProjectDocuments(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.cachedSession?.access_token) {
        return this.restRequest("project_documents", {
          method: "POST",
          query: "on_conflict=id&select=*",
          body: payload,
          prefer: "resolution=merge-duplicates,return=representation",
        });
      }
      return this.runClientQuery(
        this.client.from("project_documents").upsert(payload).select(),
        "문서 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteProjectDocumentsByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      if (this.cachedSession?.access_token) {
        const encodedIds = ids.map((id) => encodeURIComponent(id)).join(",");
        return this.restRequest("project_documents", {
          method: "DELETE",
          query: `id=in.(${encodedIds})`,
        });
      }
      return this.runClientQuery(
        this.client.from("project_documents").delete().in("id", ids),
        "문서 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    getSiteAssetPublicUrl(path) {
      if (!this.client || !path) return "";
      const { data } = this.client.storage.from(this.siteAssetBucket).getPublicUrl(path);
      return data?.publicUrl || "";
    },
    async uploadSiteAsset(file, objectPath) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.storage.from(this.siteAssetBucket).upload(objectPath, file, {
          cacheControl: "3600",
          upsert: true,
        }),
        "사이트 자산 업로드 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        20000,
      );
    },
    async removeSiteAsset(path) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!path) return { data: [], error: null };
      return this.runClientQuery(
        this.client.storage.from(this.siteAssetBucket).remove([path]),
        "사이트 자산 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async uploadProjectDocument(file, objectPath) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.storageUploadRequest(this.projectDocumentBucket, objectPath, file);
    },
    async removeProjectDocumentAsset(path) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!path) return { data: [], error: null };
      return this.runClientQuery(
        this.client.storage.from(this.projectDocumentBucket).remove([path]),
        "문서 파일 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async createProjectDocumentSignedUrl(path, expiresIn = 3600) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.storage.from(this.projectDocumentBucket).createSignedUrl(path, expiresIn),
        "문서 링크 생성 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async fetchQuotePdfHistory() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.cachedSession?.access_token) {
        return this.restRequest("quote_pdf_history", {
          method: "GET",
          query: "select=*&order=created_at.desc",
        });
      }
      return this.runClientQuery(
        this.client
          .from("quote_pdf_history")
          .select("*")
          .order("created_at", { ascending: false }),
        "견적 PDF 목록 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async insertQuotePdfHistory(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.cachedSession?.access_token) {
        const result = await this.restRequest("quote_pdf_history", {
          method: "POST",
          query: "select=*",
          body: payload,
          prefer: "return=representation",
        });
        if (Array.isArray(result?.data)) result.data = result.data[0] || null;
        return result;
      }
      return this.runClientQuery(
        this.client.from("quote_pdf_history").insert(payload).select().single(),
        "견적 PDF 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteQuotePdfHistoryByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      if (this.cachedSession?.access_token) {
        const quotedIds = ids.map((id) => `"${String(id).replace(/"/g, '""')}"`).join(",");
        return this.restRequest("quote_pdf_history", {
          method: "DELETE",
          query: `id=in.(${quotedIds})`,
          prefer: "return=representation",
        });
      }
      return this.runClientQuery(
        this.client.from("quote_pdf_history").delete().in("id", ids),
        "견적 PDF 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async uploadQuotePdf(file, objectPath) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.storageUploadRequest(this.quotePdfBucket, objectPath, file);
    },
    async removeQuotePdfAsset(path) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!path) return { data: [], error: null };
      return this.runClientQuery(
        this.client.storage.from(this.quotePdfBucket).remove([path]),
        "견적 PDF 파일 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async createQuotePdfSignedUrl(path, expiresIn = 3600) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.storage.from(this.quotePdfBucket).createSignedUrl(path, expiresIn),
        "견적 PDF 링크 생성 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async signInWithPassword(credentials) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      const result = await this.runClientQuery(
        this.client.auth.signInWithPassword(credentials),
        "로그인 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        AUTH_REQUEST_TIMEOUT_MS,
      );
      this.setCachedSession(result?.data?.session || null);
      return result;
    },
    async signUp(credentials) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      const result = await this.runClientQuery(
        this.client.auth.signUp(credentials),
        "회원가입 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        AUTH_REQUEST_TIMEOUT_MS,
      );
      this.setCachedSession(result?.data?.session || null);
      return result;
    },
    async resetPasswordForEmail(email, options = {}) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.auth.resetPasswordForEmail(email, options),
        "비밀번호 재설정 메일 발송 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        AUTH_REQUEST_TIMEOUT_MS,
      );
    },
    async updateUserPassword(password) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.auth.updateUser({ password }),
        "비밀번호 변경 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        AUTH_REQUEST_TIMEOUT_MS,
      );
    },
    async signOut() {
      if (!this.client) {
        return { error: new Error("Supabase client is not ready.") };
      }
      const result = await this.runClientQuery(
        this.client.auth.signOut(),
        "로그아웃 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        AUTH_REQUEST_TIMEOUT_MS,
      );
      this.setCachedSession(null);
      return result;
    },
    async getSession() {
      if (!this.client) {
        return { data: { session: null }, error: new Error("Supabase client is not ready.") };
      }
      const result = await this.runClientQuery(
        this.client.auth.getSession(),
        "로그인 상태 확인 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
        AUTH_REQUEST_TIMEOUT_MS,
      );
      if (!result?.error) this.setCachedSession(result?.data?.session || null);
      return result;
    },
    onAuthStateChange(callback) {
      if (!this.client) return { data: { subscription: { unsubscribe() {} } } };
      return this.client.auth.onAuthStateChange((event, session) => {
        this.setCachedSession(session || null);
        window.setTimeout(() => {
          Promise.resolve(callback(event, session)).catch((error) => {
            console.error("Auth state change handler failed:", error);
          });
        }, 0);
      });
    },
    async upsertProject(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.cachedSession?.access_token) {
        const result = await this.restRequest("projects", {
          method: "POST",
          query: "on_conflict=id&select=*",
          body: payload,
          prefer: "resolution=merge-duplicates,return=representation",
        });
        if (Array.isArray(result.data)) result.data = result.data[0] || null;
        return result;
      }
      return this.runClientQuery(
        this.client.from("projects").upsert(payload).select().single(),
        "프로젝트 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteProject(projectId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("projects").delete().eq("id", projectId),
        "프로젝트 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertSchedule(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("schedules").upsert(payload).select().single(),
        "일정 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteSchedule(scheduleId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("schedules").delete().eq("id", scheduleId),
        "일정 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertArchiveNotes(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("archive_notes").upsert(payload).select(),
        "메모 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteArchiveNotesByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("archive_notes").delete().in("id", ids),
        "메모 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertArchiveCodeCategories(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("archive_code_categories").upsert(payload).select(),
        "카테고리 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteArchiveCodeCategoriesByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("archive_code_categories").delete().in("id", ids),
        "카테고리 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async upsertArchiveCodes(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.runClientQuery(
        this.client.from("archive_codes").upsert(payload).select(),
        "코드 저장 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
    async deleteArchiveCodesByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.runClientQuery(
        this.client.from("archive_codes").delete().in("id", ids),
        "코드 삭제 응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요.",
      );
    },
  };

  try {
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      throw new Error("Supabase browser library is not loaded.");
    }
    bridge.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    bridge.client.auth.getSession()
      .then(({ data }) => bridge.setCachedSession(data?.session || null))
      .catch(() => {});
    bridge.mode = "supabase-ready";
    bridge.statusDetail = "Supabase 클라이언트가 준비되었습니다.";
  } catch (error) {
    bridge.mode = "supabase-error";
    bridge.error = error;
    bridge.statusDetail = error?.message || "Supabase 초기화에 실패했습니다.";
  }

  window.BLUEWORKS_SUPABASE = bridge;
})();
