"use server";

import { createSupabaseServerClient } from "@hotel/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export async function signOutAction(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  redirect(ROUTES.AUTH.LOGIN);
}
