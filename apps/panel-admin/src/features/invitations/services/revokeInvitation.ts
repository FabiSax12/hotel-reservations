"use server";
import { createSupabaseServiceClient, DB_COLUMNS, DB_ENUMS, DB_TABLES } from "@hotel/db";
import type { RevokeInvitationResult } from "../domain/invitation.types";

export const revokeInvitation = async (invitationId: string): Promise<RevokeInvitationResult> => {
  const supabase = createSupabaseServiceClient();

  const { data: invitation, error: fetchError } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select(`\
      ${DB_COLUMNS.pending_invitations.id},\
      ${DB_COLUMNS.pending_invitations.status},\
      ${DB_COLUMNS.pending_invitations.user_id}\
    `)
    .eq(DB_COLUMNS.pending_invitations.id, invitationId)
    .maybeSingle();

  if (fetchError || !invitation) return { error: "NOT_FOUND" };
  if (invitation.status === DB_ENUMS.invitation_status.revoked) return { error: "ALREADY_REVOKED" };

  const { error: deleteError } = await supabase.auth.admin.deleteUser(invitation.user_id);
  const { error: updateError } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .update({
      status: DB_ENUMS.invitation_status.revoked,
      revoked_at: new Date().toISOString(),
    })
    .eq(DB_COLUMNS.pending_invitations.id, invitationId);

  if (updateError || deleteError) return { error: "UNKNOWN_ERROR" };
  return { success: true };
};
