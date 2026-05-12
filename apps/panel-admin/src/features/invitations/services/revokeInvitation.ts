"use server";
import { createSupabaseServiceClient } from "@hotel/db";
import type { RevokeInvitationResult } from "../../admins-table/domain/invitation.types";

export const revokeInvitation = async (invitationId: string): Promise<RevokeInvitationResult> => {
  const supabase = createSupabaseServiceClient();

  const { data: invitation, error: fetchError } = await supabase
    .from("pending_invitations")
    .select("id, status")
    .eq("id", invitationId)
    .maybeSingle();

  if (fetchError || !invitation) return { error: "NOT_FOUND" };
  if (invitation.status === "revoked") return { error: "ALREADY_REVOKED" };

  const { error: updateError } = await supabase
    .from("pending_invitations")
    .update({
      status: "revoked",
      revoked_at: new Date().toISOString(),
    })
    .eq("id", invitationId);

  if (updateError) return { error: "UNKNOWN_ERROR" };
  return { success: true };
};
