"use server";
import { createSupabaseServiceClient, type PendingInvitation } from "@hotel/db";

export const getPendingInvitations = async (): Promise<PendingInvitation[]> => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("pending_invitations")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
