"use server";

import { createSupabaseServiceClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";

export type ToggleAdminStatusResult = { success: true } | { error: "NOT_FOUND" | "UNKNOWN_ERROR" };

export const toggleAdminStatus = async (
  adminId: string,
  isActive: boolean,
): Promise<ToggleAdminStatusResult> => {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from(DB_TABLES.PROFILES)
    .update({ is_active: !isActive })
    .eq(DB_COLUMNS.profiles.id, adminId);

  if (error) return { error: "UNKNOWN_ERROR" };

  // Revoke all sessions when deactivating an admin
  if (!isActive) {
    await supabase.auth.admin.signOut(adminId);
  }

  return { success: true };
};
