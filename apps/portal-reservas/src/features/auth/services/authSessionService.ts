import { createSupabaseClient } from "@hotel/db/client";
import type { User, Subscription } from "@supabase/supabase-js";
import { AUTH_LOG_MESSAGES as LOG } from "@/features/auth/constants/log-messages";

export const getSession = async (): Promise<User | null> => {
  const supabase = createSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error(LOG.SESSION_FETCH_ERROR, error);
    throw error;
  }
  
  return session?.user ?? null;
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void): Subscription => {
  const supabase = createSupabaseClient();
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  
  return subscription;
};

export const signOut = async (): Promise<void> => {
  const supabase = createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error(LOG.SESSION_FETCH_ERROR, error); // Using same log for now or could add a specific one
    throw error;
  }
};
