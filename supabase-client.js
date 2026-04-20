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
    mode: "supabase-pending",
    error: null,
    statusDetail: "",
    isConfigured() {
      return Boolean(this.url && this.publishableKey);
    },
    isReady() {
      return Boolean(this.client);
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
      return this.client.from("project_documents").upsert(payload).select();
    },
    async deleteProjectDocumentsByIds(ids) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      if (!Array.isArray(ids) || !ids.length) return { data: [], error: null };
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
      return this.client.storage.from(this.projectDocumentBucket).upload(objectPath, file, {
        cacheControl: "3600",
        upsert: true,
      });
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
      return this.client.auth.signInWithPassword(credentials);
    },
    async signUp(credentials) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
      }
      return this.client.auth.signUp(credentials);
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
      return this.client.auth.signOut();
    },
    async getSession() {
      if (!this.client) {
        return { data: { session: null }, error: new Error("Supabase client is not ready.") };
      }
      return this.client.auth.getSession();
    },
    onAuthStateChange(callback) {
      if (!this.client) return { data: { subscription: { unsubscribe() {} } } };
      return this.client.auth.onAuthStateChange(callback);
    },
    async upsertProject(payload) {
      if (!this.client) {
        return { data: null, error: new Error("Supabase client is not ready.") };
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
    bridge.mode = "supabase-ready";
    bridge.statusDetail = "Supabase 클라이언트가 준비되었습니다.";
  } catch (error) {
    bridge.mode = "supabase-error";
    bridge.error = error;
    bridge.statusDetail = error?.message || "Supabase 초기화에 실패했습니다.";
  }

  window.BLUEWORKS_SUPABASE = bridge;
})();
