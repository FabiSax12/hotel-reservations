import { createSupabaseClient, createSupabaseServiceClient } from "@hotel/db";
import type { AdminUser } from "@hotel/db/types";
import { AUTH_COLUMNS, AUTH_ROLES, AUTH_TABLE } from "./config/constants";

export async function signInWithPassword(email: string, password: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const supabase = createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getSession() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data;
}

export async function verifyAdminRole(userId: string): Promise<AdminUser | null> {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(AUTH_TABLE)
    .select(
      `${AUTH_COLUMNS.ID}, ${AUTH_COLUMNS.EMAIL}, ${AUTH_COLUMNS.ROLE}, ${AUTH_COLUMNS.IS_ACTIVE}`
    )
    .eq(AUTH_COLUMNS.ID, userId)
    .single();

  if (error) throw new Error(error.message);

  if (data.role === AUTH_ROLES.ADMIN && data.is_active) {
    return data as AdminUser;
  }

  return null;
}
