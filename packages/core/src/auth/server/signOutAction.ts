"use server";

/**
 * @fileoverview Server-side sign out action.
 *
 * Handles sign out and cleanup of cookies/session.
 * Used by both panel-admin and portal-reservas.
 *
 * @example
 * ```ts
 * import { signOutAction } from "@hotel/core/auth";
 *
 * await signOutAction({ redirectTo: "/login" });
 * ```
 */

import { createSupabaseServerClient } from "@hotel/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AuthError } from "../shared/types";

/**
 * Options for signOutAction.
 */
export interface SignOutOptions {
  /** URL to redirect after sign out */
  redirectTo?: string;
  /** Custom cookie store */
  cookieStore?: Awaited<ReturnType<typeof cookies>>;
}

/**
 *Result of sign out action.
 */
export interface SignOutResult {
  error: AuthError | null;
}

/**
 * Server action: sign out and clear session.
 *
 * Clears Supabase session and cookies, then redirects.
 *
 * @param options - Sign out options
 * @returns SignOutResult with error if any
 *
 * @example
 * ```ts
 * await signOutAction({ redirectTo: "/login" });
 * ```
 */
export async function signOutAction(options: SignOutOptions = {}): Promise<SignOutResult> {
  const { redirectTo = "/login", cookieStore = await cookies() } = options;

  const supabase = createSupabaseServerClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("[signOutAction] Error:", error.message);
    // Still redirect even on error
    redirect(redirectTo);
  }

  redirect(redirectTo);
}

/**
 * Redirect to login (convenience function).
 *
 * @example
 * ```ts
 * redirectToLogin();
 * ```
 */
export async function redirectToLogin(): Promise<never> {
  redirect("/login");
}
