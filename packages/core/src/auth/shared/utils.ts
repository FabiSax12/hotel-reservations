/**
 * @fileoverview Common utility functions for auth.
 *
 * Reusable helpers for both server and client auth operations.
 */

import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { AUTH_ROLES } from "../config/constants";
import type { AdminProfile, AuthError, ClientProfile } from "./types";

/**
 * Checks if a session is valid and not expired.
 *
 * @param session - The session to check
 * @returns true if session exists and is not expired
 *
 * @example
 * ```ts
 * if (!isSessionValid(session)) {
 *   redirect("/login");
 * }
 * ```
 */
export function isSessionValid(session: Session | null): session is Session {
  if (!session) return false;
  const now = Date.now() / 1000;
  return session.expires_at ? session.expires_at > now : true;
}

/**
 * Checks if user has admin role and is active.
 *
 * @param profile - The user profile to check
 * @returns true if user is admin and is_active
 *
 * @example
 * ```ts
 * if (!isAdminUser(profile)) {
 *   throw new Error("Admin only");
 * }
 * ```
 */
export function hasRole(
  profile: { role?: string | null } | null,
  allowedRoles: readonly string[],
): boolean {
  if (!profile?.role) return false;
  return allowedRoles.includes(profile.role);
}

export function isAdminUser(
  profile: { role?: string | null; is_active?: boolean; [key: string]: unknown } | null,
): boolean {
  if (!profile) return false;
  return hasRole(profile, [AUTH_ROLES.ADMIN, AUTH_ROLES.OWNER]) && profile.is_active === true;
}

/**
 * Extracts user ID from session or user object.
 *
 * @param sessionOrUser - Session or User object
 * @returns User ID string or null
 *
 * @example
 * ```ts
 * const userId = getUserId(session);
 * ```
 */
export function getUserId(sessionOrUser: Session | SupabaseUser | null): string | null {
  if (!sessionOrUser) return null;
  if ("id" in sessionOrUser) {
    return sessionOrUser.id;
  }
  return null;
}

/**
 * Creates a standardized auth error from Supabase error.
 *
 * @param error - Error from Supabase
 * @returns Formatted AuthError
 *
 * @example
 * ```ts
 * catch (err) {
 *   return createAuthError(err);
 * }
 * ```
 */
export function createAuthError(error: unknown): AuthError {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes("invalid")) {
      return { code: "INVALID_CREDENTIALS", message: error.message };
    }
    if (message.includes("user")) {
      return { code: "USER_NOT_FOUND", message: error.message };
    }
    if (message.includes("network")) {
      return { code: "NETWORK_ERROR", message: error.message };
    }
  }
  return { code: "UNKNOWN_ERROR", message: String(error) };
}

/**
 * Redirect URL helpers for auth flows.
 *
 * @param baseUrl - Base URL to redirect after auth
 * @returns Redirect URL for auth
 *
 * @example
 * ```ts
 * const url = getRedirectUrl("/dashboard");
 * ```
 */
export function getRedirectUrl(baseUrl: string): string {
  return baseUrl;
}

/**
 * Validates that profile matches expected type.
 *
 * @param profile - Profile to validate
 * @param expectedRole - Expected role ("admin" | "client")
 * @returns true if profile matches
 *
 * @example
 * ```ts
 * if (!validateProfile(profile, "admin")) {
 *   throw new Error("Admin required");
 * }
 * ```
 */
export function validateProfile(
  profile: AdminProfile | ClientProfile | null,
  expectedRole: "admin" | "client",
): profile is AdminProfile | ClientProfile {
  if (!profile) return false;
  return "role" in profile && profile.role === expectedRole;
}
