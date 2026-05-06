/**
 * @fileoverview Server-side types for auth.
 */

import type { Session } from "@supabase/supabase-js";
import type { cookies } from "next/headers";
import type { AdminProfile, ClientProfile } from "../shared/types";

/**
 * Cookie store interface for server clients.
 */
export type CookieStore = Awaited<ReturnType<typeof cookies>>;

/**
 * Server auth context returned for SSR hydration.
 */
export interface ServerAuthContext {
  session: Session | null;
  user: Session["user"] | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
}

/**
 * Options for loginAction.
 */
export interface LoginActionOptions {
  requireAdmin?: boolean;
  redirectTo?: string;
  cookieStore?: CookieStore;
}

/**
 * Options for signOutAction.
 */
export interface SignOutOptions {
  redirectTo?: string;
  cookieStore?: CookieStore;
}

/**
 * Result of sign out action.
 */
export interface SignOutResult {
  error: import("../shared/types").AuthError | null;
}
