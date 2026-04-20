(function () {
  const SUPABASE_URL = "https://uanpcrvzahjrbgjvvioz.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zJqlCjId8XiTq6W05l_JSA_8VHISJ3-";

  const bridge = {
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
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
