"use server";

import { verifyAdminRole } from "@hotel/core/auth";
import type { UserProfile } from "@hotel/db";
import { createSupabaseServerClient } from "@hotel/db";
import type { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const getInitialAuthStatus = async () => {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  const initialSession = (data.session ?? null) as Session | null;
  const initialUser = initialSession?.user ?? null;
  const initialProfile: UserProfile | null = initialUser
    ? await verifyAdminRole(initialUser.id)
    : null;

  return { initialSession, initialUser, initialProfile };
};
