"use server";

/**
 * @fileoverview Server-side session refresh action.
 *
 * Forces a session refresh from the server to ensure
 * client has latest session state.
 * Used by AuthProvider.refresh() to sync client state.
 *
 * @example
 * ```ts
 * // In client hook
 * const { refresh } = useAuth();
 * await refresh();
 * ```
 */

import { createSupabaseServerClient } from "@hotel/db";
import type { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { verifyAdminRole } from "../index";
import type { AdminProfile, AuthState, ClientProfile } from "../shared/types";

/**
 * Server action: force refresh session from server.
 *
 * Gets latest session and profile from cookies.
 * Used by client to sync auth state after login.
 *
 * @returns AuthState with latest session/user/profile
 *
 * @example
 * ```ts
 * const authState = await refreshSession();
 * ```
 */
export async function refreshSession(): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("[refreshSession] Error:", error.message);
    return {
      session: null,
      user: null,
      profile: null,
      isAdmin: false,
      isLoading: false,
    };
  }

  const session = (data.session ?? null) as Session | null;
  const user = session?.user ?? null;

  let profile: AdminProfile | ClientProfile | null = null;
  let isAdmin = false;

  if (user) {
    const adminProfile = await verifyAdminRole(user.id);
    if (adminProfile) {
      profile = adminProfile as unknown as AdminProfile;
      isAdmin = true;
    }
  }

  return {
    session,
    user,
    profile,
    isAdmin,
    isLoading: false,
  };
}

/**
 * Alias for refreshSession.
 */
export const getAuthContextAction = refreshSession;
