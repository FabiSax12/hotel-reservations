"use client";
 
import { useEffect } from "react";
import { getSession, subscribeToAuthChanges } from "../services/authSessionService";
import { AUTH_LOG_MESSAGES as LOG } from "../constants/log-messages";
import { useUserStore } from "@/store/userStore";
 
export function useAuthSession() {
  const { user, isLoading, setUser, setIsLoading } = useUserStore();
 
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
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
  }, [setUser, setIsLoading]);
 
  return { user, isLoading };
}
