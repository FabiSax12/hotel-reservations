"use server";
import {
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_ENUMS,
  DB_TABLES,
  type PendingInvitation,
} from "@hotel/db";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export const getPendingInvitations = async (): Promise<PendingInvitation[]> => {
  await requirePermission(PERMISSIONS.ADMINS.INVITE);

  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select("*")
    .eq(DB_COLUMNS.pending_invitations.status, DB_ENUMS.invitation_status.pending)
    .order(DB_COLUMNS.pending_invitations.created_at, { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
