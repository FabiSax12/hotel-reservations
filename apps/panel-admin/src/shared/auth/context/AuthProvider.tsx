"use client";

import type { UserProfile } from "@hotel/db";
import type { Session } from "@supabase/supabase-js";
import { useCallback, useMemo, useState } from "react";
import { getAuthContextAction } from "@/features/auth/services/getAuthContextAction";
import { AuthContext } from "./authContext";

export type AuthProviderProps = {
  initialSession: Session | null;
  initialUser: Session["user"] | null;
  initialProfile: UserProfile | null;
  children: React.ReactNode;
};

export function AuthProvider({
  initialSession,
  initialUser,
  initialProfile,
  children,
}: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<Session["user"] | null>(initialUser);
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuthContextAction();
      setSession(data.session);
      setUser(data.user);
      setProfile(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ session, user, profile, loading, error, refresh }),
    [session, user, profile, loading, error, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
