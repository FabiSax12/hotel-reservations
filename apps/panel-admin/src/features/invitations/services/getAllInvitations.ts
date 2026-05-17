"use server";
import {
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_TABLES,
  type PendingInvitation,
} from "@hotel/db";

export const getAllInvitations = async (): Promise<PendingInvitation[]> => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select("*")
    .order(DB_COLUMNS.pending_invitations.created_at, { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
