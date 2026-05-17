"use server";

import { verifyAdminRole } from "@hotel/core/auth";
import { type AdminUser, createSupabaseServerClient } from "@hotel/db";
import type { Session, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export type AuthContextData = {
  session: Session | null;
  user: User | null;
  profile: AdminUser | null;
};

export async function getAuthContextAction(): Promise<AuthContextData> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);

  const session = data.session ?? null;
  const user = session?.user ?? null;
  const profile: AdminUser | null = user ? await verifyAdminRole(user.id) : null;

  return { session, user, profile };
}
