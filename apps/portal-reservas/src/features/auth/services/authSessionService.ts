import { createSupabaseClient } from "@hotel/db/client";
import type { User, Subscription } from "@supabase/supabase-js";

export const getSession = async (): Promise<User | null> => {
  const supabase = createSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error fetching session:", error);
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
