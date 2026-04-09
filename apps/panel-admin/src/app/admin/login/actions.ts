"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { verifyAdminRole } from "@hotel/core/auth";
import { createSupabaseServerClient } from "@hotel/db";

export async function loginAction(
  prevState: { error: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();

  const supabase = createSupabaseServerClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Credenciales inválidas" };
  }

  const admin = await verifyAdminRole(data.user.id);

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "Acceso denegado" };
  }

  redirect("/admin/dashboard");
}
