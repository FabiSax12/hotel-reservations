"use server";
import { inviteAdminByEmail } from "@hotel/core/auth";
import { createSupabaseServiceClient } from "@hotel/db";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import type { ResendInvitationResult } from "../domain/invitation.types";

export const resendInvitation = async (invitationId: string): Promise<ResendInvitationResult> => {
  const supabase = createSupabaseServiceClient();

  const { data: invitation, error: fetchError } = await supabase
    .from("pending_invitations")
    .select("email, status, expires_at")
    .eq("id", invitationId)
    .maybeSingle();

  if (fetchError || !invitation) return { error: "NOT_FOUND" };
  if (invitation.status === "expired") return { error: "EXPIRED" };

  const newExpiry = new Date();
  newExpiry.setDate(newExpiry.getDate() + 7);

  const { error: updateError } = await supabase
    .from("pending_invitations")
    .update({ expires_at: newExpiry.toISOString() })
    .eq("id", invitationId);

  if (updateError) return { error: "UNKNOWN_ERROR" };

  try {
    await inviteAdminByEmail(
      invitation.email,
      `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`,
    );
    return { success: true };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
};
