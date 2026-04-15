import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";

export function createSupabaseServerClient(cookieStore: {
  getAll: () => { name: string; value: string }[];
  set: (name: string, value: string, options?: object) => void;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookies) =>
        cookies.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
    },
  });
}

// For client-side usage in browser context only.
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// For Server Actions that don't need to read/write session cookies (e.g. signUp, signIn flows).
export function createSupabaseServerActionClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}

export type SupabaseServerClient = ReturnType<typeof createSupabaseServerClient>;

// Uses the service role key — never call from the browser.
export function createSupabaseServiceClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}
