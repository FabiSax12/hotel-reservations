"use server";
import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "@hotel/core/audit";
import { getAuditRequestContext, logAuditEvent } from "@hotel/core/audit/server";
import { getVerifiedSession, inviteAdminByEmail } from "@hotel/core/auth";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_ENUMS,
  DB_TABLES,
} from "@hotel/db";
import { cookies } from "next/headers";
import { ENV } from "@/config/env";
import { ROUTES } from "@/config/routes";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import type { ResendInvitationResult } from "../domain/invitation.types";

export const resendInvitation = async (invitationId: string): Promise<ResendInvitationResult> => {
  await requirePermission(PERMISSIONS.ADMINS.INVITE);
  const supabase = createSupabaseServiceClient();

  const { data: invitation, error: fetchError } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .select(
      `${DB_COLUMNS.pending_invitations.email}, \
      ${DB_COLUMNS.pending_invitations.status}, \
      ${DB_COLUMNS.pending_invitations.expires_at}`,
    )
    .eq(DB_COLUMNS.pending_invitations.id, invitationId)
    .maybeSingle();

  if (fetchError || !invitation) return { error: "NOT_FOUND" };

  // J3.3 (J2-POC-7): the old check only rejected the literal string "expired",
  // a value `status` never actually holds in the database (expiry is computed
  // client-side, never persisted — see fase-1-diagnostico.md). That let resend
  // succeed on ANY real status, including "revoked", reactivating an invitation
  // the owner had explicitly revoked. Allowlist "pending" instead.
  if (invitation.status === DB_ENUMS.invitation_status.expired) return { error: "EXPIRED" };
  if (invitation.status !== DB_ENUMS.invitation_status.pending) {
    return { error: "NOT_PENDING" };
  }

  const newExpiry = new Date();
  newExpiry.setDate(newExpiry.getDate() + 7);

  const { error: updateError } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .update({ expires_at: newExpiry.toISOString() })
    .eq(DB_COLUMNS.pending_invitations.id, invitationId);

  if (updateError) return { error: "UNKNOWN_ERROR" };

  try {
    await inviteAdminByEmail(
      invitation.email,
      `${ENV.NEXT_PUBLIC_BASE_URL}${ROUTES.AUTH.ACTIVATE}`,
    );

    // J3.4: audit the resend.
    const cookieStore = await cookies();
    const { user } = await getVerifiedSession(createSupabaseServerClient(cookieStore));
    const { ipAddress, userAgent } = await getAuditRequestContext();
    await logAuditEvent({
      actorId: user?.id ?? null,
      actorEmail: user?.email ?? null,
      action: AUDIT_ACTIONS.USER_INVITED,
      entity: AUDIT_ENTITIES.USER,
      entityId: invitationId,
      metadata: { action: "invitation_resent", email: invitation.email },
      ipAddress,
      userAgent,
    });

    return { success: true };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
};
