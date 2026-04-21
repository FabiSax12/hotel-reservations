"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@hotel/db/client";
import type { User } from "@supabase/supabase-js";

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseClient();

    // Fetch initial session
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
}
