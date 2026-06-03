"use server";
import {
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_TABLES,
  type PendingInvitation,
} from "@hotel/db";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export const getAllInvitations = async (): Promise<PendingInvitation[]> => {
  await requirePermission(PERMISSIONS.ADMINS.INVITE);

  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select("*")
    .order(DB_COLUMNS.pending_invitations.created_at, { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
