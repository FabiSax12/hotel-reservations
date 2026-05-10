"use client";

/**
 * @fileoverview React AuthProvider with SSR hydration.
 *
 * Provides auth context to React tree with initial state
 * from server (SSR) and auto-refresh on client.
 * This fixes the null-session-on-first-render bug.
 *
 * @example
 * ```ts
 * // In RootLayout
 * import { getServerAuthContext, AuthProvider } from "@hotel/core/auth";
 *
 * const { session, user, profile, isAdmin } = await getServerAuthContext();
 *
 * return (
 *   <AuthProvider
 *     initialSession={session}
 *     initialUser={user}
 *     initialProfile={profile}
 *     initialIsAdmin={isAdmin}
 *   >
 *     {children}
 *   </AuthProvider>
 * );
 * ```
 */

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { refreshSession } from "../server/refreshSession";
import type {
  AdminProfile,
  AuthContextValue,
  AuthProviderProps,
  ClientProfile,
} from "../shared/types";
import { getClientSession, signOutClient, subscribeToAuthChanges } from "./authSessionService";

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * AuthProvider wraps the app with auth context.
 *
 * Takes initial session/user/profile from SSR
 * and subscribes to auth changes on client
 * to keep state in sync.
 *
 * After login, session/user/profile are guaranteed non-null
 * because we refresh after navigation.
 */
export function AuthProvider({
  initialSession,
  initialUser,
  initialProfile,
  initialIsAdmin,
  children,
}: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<User | null>(initialUser);
  const [profile, setProfile] = useState<AdminProfile | ClientProfile | null>(initialProfile);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Force refresh from server.
   * Called after login or when client state is stale.
   */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const authState = await refreshSession();
      setSession(authState.session);
      setUser(authState.user);
      setProfile(authState.profile);
      setIsAdmin(authState.isAdmin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refresh failed");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Sign out from client.
   */
  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await signOutClient();
      setSession(null);
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      isAdmin,
      loading,
      error,
      refresh,
      signOut,
    }),
    [session, user, profile, isAdmin, loading, error, refresh, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context.
 *
 * @throws Error if used outside AuthProvider
 *
 * @example
 * ```ts
 * function Dashboard() {
 *   const { user, profile, loading } = useAuth();
 *
 *   if (loading) return <Spinner />;
 *
 *   return <h1>Welcome, {user?.email}</h1>;
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

/**
 * HOC to protect client components.
 *
 * @example
 * ```ts
 * export default withAuth(ProtectedComponent);
 * ```
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<P> {
  return function WithAuthComponent(props: P) {
    const { loading } = useAuth();
    if (loading) return null;
    return <Component {...props} />;
  };
}
