"use client";
import type { User } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import { AUTH_LOG_MESSAGES as LOG } from "../constants/log-messages";
import { getSession, subscribeToAuthChanges } from "../services/authSessionService";

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const currentUser = await getSession();
        setUser(currentUser);
      } catch (error) {
        console.error(LOG.SESSION_FETCH_ERROR, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const subscription = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
}
