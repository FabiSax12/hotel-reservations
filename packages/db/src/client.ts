import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { DB_ENV } from "./config/env";
import type { Database } from "./database.types";

export function createSupabaseServerClient(cookieStore: {
  getAll: () => { name: string; value: string }[];
  set: (name: string, value: string, options?: object) => void;
}) {
  return createServerClient<Database>(DB_ENV.SUPABASE_URL, DB_ENV.SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookies) =>
        cookies.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Ignored: setAll is called from Server Components where cookies are read-only.
          }
        }),
    },
  });
}

// For client-side usage in browser context only.
export function createSupabaseClient() {
  return createBrowserClient<Database>(DB_ENV.SUPABASE_URL, DB_ENV.SUPABASE_ANON_KEY);
}

// For Server Actions that don't need to read/write session cookies (e.g. signUp, signIn flows).
export function createSupabaseServerActionClient() {
  return createServerClient<Database>(DB_ENV.SUPABASE_URL, DB_ENV.SUPABASE_ANON_KEY, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}

export type SupabaseServerClient = ReturnType<typeof createSupabaseServerClient>;

// Uses the service role key — never call from the browser.
export function createSupabaseServiceClient() {
  return createServerClient<Database>(DB_ENV.SUPABASE_URL, DB_ENV.SUPABASE_SERVICE_ROLE_KEY, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}
