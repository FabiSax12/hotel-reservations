"use client";

/**
 * @fileoverview Client-side auth session hook.
 *
 * React hook for accessing auth session in client components.
 * Handles initial session fetch and subscription to auth changes.
 *
 * @example
 * ```ts
 * const { user, loading } = useAuthSession();
 * ```
 */

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { getClientSession, subscribeToAuthChanges } from "./authSessionService";

export interface UseAuthSessionResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for accessing auth session in client components.
 *
 * Fetches initial session on mount and subscribes
 * to auth state changes for real-time updates.
 *
 * @returns { user, loading, error }
 *
 * @example
 * ```ts
 * function Dashboard() {
 *   const { user, loading } = useAuthSession();
 *
 *   if (loading) return <Spinner />;
 *
 *   return <h1>Welcome, {user?.email}</h1>;
 * }
 * ```
 */
export function useAuthSession(): UseAuthSessionResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const fetchSession = async () => {
      try {
        const currentUser = await getClientSession();
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Session fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Subscribe to auth changes
    subscription = subscribeToAuthChanges((newUser) => {
      setUser(newUser);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { user, loading, error };
}
