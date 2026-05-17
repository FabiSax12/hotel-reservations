"use server";

import { createSupabaseServiceClient } from "@hotel/db";

export type ToggleAdminStatusResult = { success: true } | { error: "NOT_FOUND" | "UNKNOWN_ERROR" };

export const toggleAdminStatus = async (
  adminId: string,
  isActive: boolean,
): Promise<ToggleAdminStatusResult> => {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_active: !isActive })
    .eq("id", adminId);

  if (error) return { error: "UNKNOWN_ERROR" };

  // Revoke all sessions when deactivating an admin
  if (!isActive) {
    await supabase.auth.admin.signOut(adminId);
  }

  return { success: true };
};
