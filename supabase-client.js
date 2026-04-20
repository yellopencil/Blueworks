(function () {
  const SUPABASE_URL = "https://uanpcrvzahjrbgjvvioz.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zJqlCjId8XiTq6W05l_JSA_8VHISJ3-";

  const bridge = {
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
    client: null,
    mode: "supabase-pending",
    error: null,
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
  } catch (error) {
    bridge.mode = "supabase-error";
    bridge.error = error;
  }

  window.BLUEWORKS_SUPABASE = bridge;
})();
