/**
 * Application route constants — single source of truth for URL paths.
 *
 * Deeply frozen with `as const` and `Object.freeze` for compile-time safety.
 * Zero hardcoded route strings outside this file.
 *
 * Auth routes support the Supabase Auth flow:
 * - LOGIN/REGISTER: User-facing forms
 * - VERIFY_EMAIL: Post-registration email confirmation
 * - ERROR: Auth error display (e.g., invalid token, expired link)
 * - CALLBACK: Supabase OAuth/magic-link callback handler
 */
export const ROUTES = Object.freeze({
  HOME: "/",
  AUTH: Object.freeze({
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    ERROR: "/auth/error",
    CALLBACK: "/auth/callback",
  } as const),
} as const);
