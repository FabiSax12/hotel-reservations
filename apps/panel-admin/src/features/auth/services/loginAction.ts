"use server";

import { verifyAdminRole } from "@hotel/core/auth";
import { createSupabaseServerClient, DB_COLUMNS, DB_ENUMS, DB_TABLES } from "@hotel/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import type { LoginActionState } from "@/features/auth/domain/credentials";

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: "INVALID_CREDENTIALS" };
  }

  const admin = await verifyAdminRole(data.user.id);

  if (!admin) {
    await supabase.auth.signOut();

    const { data: roleData } = await supabase
      .from(DB_TABLES.USER_ROLES)
      .select(DB_COLUMNS.user_roles.role)
      .eq(DB_COLUMNS.user_roles.user_id, data.user.id)
      .single();

    if (roleData?.role === DB_ENUMS.user_role.admin) {
      return { error: "ACCOUNT_DEACTIVATED" };
    }

    return { error: "ACCESS_DENIED" };
  }

  redirect(ROUTES.ADMIN.DASHBOARD);
}
