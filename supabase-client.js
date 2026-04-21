(function () {
  const SUPABASE_URL = "https://uanpcrvzahjrbgjvvioz.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zJqlCjId8XiTq6W05l_JSA_8VHISJ3-";
  const SITE_ASSET_BUCKET = "site-assets";
  const PROJECT_DOCUMENT_BUCKET = "project-documents";

  const bridge = {
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
    siteAssetBucket: SITE_ASSET_BUCKET,
    projectDocumentBucket: PROJECT_DOCUMENT_BUCKET,
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
    setCachedSession(session) {
      this.cachedSession = session || null;
    },
    async getAccessToken() {
      if (this.cachedSession?.access_token) return this.cachedSession.access_token;
      const sessionResult = await this.getSession();
      return sessionResult?.data?.session?.access_token || "";
    },
    async restRequest(path, options = {}) {
      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        return { data: null, error: new Error("Supabase session token is not ready.") };
      }
      const {
        method = "GET",
        query = "",
        body,
        prefer = "",
      } = options;
      const requestUrl = `${this.url}/rest/v1/${path}${query ? `?${query}` : ""}`;
      const headers = {
        apikey: this.publishableKey,
        Authorization: `Bearer ${accessToken}`,
      };
      if (body !== undefined) headers["Content-Type"] = "application/json";
      if (prefer) headers.Prefer = prefer;
      try {
        const response = await fetch(requestUrl, {
          method,
          headers,
          body: body === undefined ? undefined : JSON.stringify(body),
        });
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
        return { data: null, error };
      }
    },
    async storageUploadRequest(bucket, objectPath, file) {
      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        return { data: null, error: new Error("Supabase session token is not ready.") };
      }
      const requestUrl = `${this.url}/storage/v1/object/${bucket}/${objectPath}`;
      try {
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            apikey: this.publishableKey,
            Authorization: `Bearer ${accessToken}`,
            "x-upsert": "true",
            "content-type": file?.type || "application/octet-stream",
          },
          body: file,
        });
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
        return { data: null, error };
      }
    },
    async fetchProjects() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("projects").select("*").order("created_at", { ascending: false });
    },
    async fetchSchedules() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("schedules").select("*").order("date", { ascending: true });
    },
    async fetchArchiveNotes() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("archive_notes").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    },
    async fetchArchiveCodeCategories() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("archive_code_categories").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    },
    async fetchArchiveCodes() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("archive_codes").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    },
    async fetchProfiles() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("profiles").select("*").order("created_at", { ascending: false });
    },
    async fetchSiteSettings() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("site_settings").select("*").order("updated_at", { ascending: false }).limit(1);
    },
    async fetchCurrentProfile(userId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("profiles").select("*").eq("id", userId).maybeSingle();
    },
    async upsertProfile(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("profiles").upsert(payload).select().single();
    },
    async upsertSiteSettings(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("site_settings").upsert(payload).select().single();
    },
    async fetchQuoteSettings() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("quote_settings").select("*").eq("id", "global").maybeSingle();
    },
    async upsertQuoteSettings(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("quote_settings").upsert(payload).select().single();
    },
    async fetchProjectDocuments() {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("project_documents").select("*").order("created_at", { ascending: false });
    },
    async upsertProjectDocuments(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.getAccessToken()) {
        return this.restRequest("project_documents", {
          method: "POST",
          query: "on_conflict=id&select=*",
          body: payload,
          prefer: "resolution=merge-duplicates,return=representation",
        });
      }
      return this.client.from("project_documents").upsert(payload).select();
    },
    async deleteProjectDocumentsByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      if (this.getAccessToken()) {
        const encodedIds = ids.map((id) => encodeURIComponent(id)).join(",");
        return this.restRequest("project_documents", {
          method: "DELETE",
          query: `id=in.(${encodedIds})`,
        });
      }
      return this.client.from("project_documents").delete().in("id", ids);
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
      return this.client.storage.from(this.siteAssetBucket).upload(objectPath, file, {
        cacheControl: "3600",
        upsert: true,
      });
    },
    async removeSiteAsset(path) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!path) return { data: [], error: null };
      return this.client.storage.from(this.siteAssetBucket).remove([path]);
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
      return this.client.storage.from(this.projectDocumentBucket).remove([path]);
    },
    async createProjectDocumentSignedUrl(path, expiresIn = 3600) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.storage.from(this.projectDocumentBucket).createSignedUrl(path, expiresIn);
    },
    async signInWithPassword(credentials) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      const result = await this.client.auth.signInWithPassword(credentials);
      this.setCachedSession(result?.data?.session || null);
      return result;
    },
    async signUp(credentials) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      const result = await this.client.auth.signUp(credentials);
      this.setCachedSession(result?.data?.session || null);
      return result;
    },
    async resetPasswordForEmail(email, options = {}) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.auth.resetPasswordForEmail(email, options);
    },
    async updateUserPassword(password) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.auth.updateUser({ password });
    },
    async signOut() {
      if (!this.client) {
        return { error: new Error("Supabase client is not ready.") };
      }
      const result = await this.client.auth.signOut();
      this.setCachedSession(null);
      return result;
    },
    async getSession() {
      if (!this.client) {
        return { data: { session: null }, error: new Error("Supabase client is not ready.") };
      }
      const result = await this.client.auth.getSession();
      if (!result?.error) this.setCachedSession(result?.data?.session || null);
      return result;
    },
    onAuthStateChange(callback) {
      if (!this.client) return { data: { subscription: { unsubscribe() {} } } };
      return this.client.auth.onAuthStateChange((event, session) => {
        this.setCachedSession(session || null);
        return callback(event, session);
      });
    },
    async upsertProject(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (this.getAccessToken()) {
        const result = await this.restRequest("projects", {
          method: "POST",
          query: "on_conflict=id&select=*",
          body: payload,
          prefer: "resolution=merge-duplicates,return=representation",
        });
        if (Array.isArray(result.data)) result.data = result.data[0] || null;
        return result;
      }
      return this.client.from("projects").upsert(payload).select().single();
    },
    async deleteProject(projectId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("projects").delete().eq("id", projectId);
    },
    async upsertSchedule(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("schedules").upsert(payload).select().single();
    },
    async deleteSchedule(scheduleId) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("schedules").delete().eq("id", scheduleId);
    },
    async upsertArchiveNotes(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("archive_notes").upsert(payload).select();
    },
    async deleteArchiveNotesByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.client.from("archive_notes").delete().in("id", ids);
    },
    async upsertArchiveCodeCategories(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("archive_code_categories").upsert(payload).select();
    },
    async deleteArchiveCodeCategoriesByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.client.from("archive_code_categories").delete().in("id", ids);
    },
    async upsertArchiveCodes(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.from("archive_codes").upsert(payload).select();
    },
    async deleteArchiveCodesByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
      return this.client.from("archive_codes").delete().in("id", ids);
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
