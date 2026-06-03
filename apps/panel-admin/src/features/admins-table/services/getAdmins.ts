"use server";
import { type AdminsList, createSupabaseServiceClient, RPC_FUNCTIONS } from "@hotel/db";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export const getAdmins = async () => {
  await requirePermission(PERMISSIONS.ADMINS.VIEW);

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.rpc(RPC_FUNCTIONS.GET_ADMINS);
  if (error) throw new Error(error.message);

  return data as AdminsList;
};
