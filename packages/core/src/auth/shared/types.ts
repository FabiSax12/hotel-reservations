/**
 * @fileoverview Shared type definitions for auth across apps.
 *
 * These types are reused by both panel-admin and portal-reservas to ensure
 * consistent session/profile handling and avoid desync between client and server.
 */

import type { PermissionName } from "@hotel/db/types";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";

/**
 * Base user type from Supabase auth.
 * Re-exported for consistent imports across packages.
 */
/**
 * Auth session from Supabase.
 * Re-exported for consistent imports across packages.
 */
export type { Session, User as SupabaseUser } from "@supabase/supabase-js";

/**
 * Admin user profile from the auth table.
 * Contains role and activation status from the custom users table.
 */
export interface AdminProfile {
  id: string;
  email: string;
  role: "admin" | "owner";
  is_active: boolean;
  permissions?: PermissionName[];
}

/**
 * Client user profile for portal-reservas.
 */
export interface ClientProfile {
  id: string;
  full_name: string;
  phone: string | null;
  created_at: string;
}

/**
 * Unified auth state returned by server helpers.
 */
export interface AuthState {
  session: Session | null;
  user: SupabaseUser | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
}

/**
 * Result of a login action.
 */
export interface LoginResult {
  session: Session | null;
  user: SupabaseUser | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  error: AuthError | null;
}

/**
 * Auth error types used across packages.
 */
export type AuthError =
  | { code: "INVALID_CREDENTIALS"; message: string }
  | { code: "USER_NOT_FOUND"; message: string }
  | { code: "USER_NOT_ACTIVE"; message: string }
  | { code: "NETWORK_ERROR"; message: string }
  | { code: "EMAIL_ALREADY_REGISTERED"; message: string }
  | { code: "UNKNOWN_ERROR"; message: string };

/**
 * Auth context value exposed to React components.
 */
export interface AuthContextValue {
  session: Session | null;
  user: SupabaseUser | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Props for AuthProvider component.
 */
export interface AuthProviderProps {
  initialSession: Session | null;
  initialUser: SupabaseUser | null;
  initialProfile: AdminProfile | ClientProfile | null;
  initialIsAdmin: boolean;
  children: React.ReactNode;
}
