"use server";
import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "@hotel/core/audit";
import { getAuditRequestContext, logAuditEvent } from "@hotel/core/audit/server";
import { getVerifiedSession } from "@hotel/core/auth";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_ENUMS,
  DB_TABLES,
} from "@hotel/db";
import { cookies } from "next/headers";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import type { RevokeInvitationResult } from "../domain/invitation.types";

export const revokeInvitation = async (invitationId: string): Promise<RevokeInvitationResult> => {
  await requirePermission(PERMISSIONS.ADMINS.REVOKE);

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

  // J3.3 (J2-POC-7): allowlist, not denylist. The old check only rejected
  // "revoked", letting an "accepted" invitation through and silently deleting
  // an active admin account (auth.admin.deleteUser) under the "revoke" label.
  // Revoking is only valid for invitations still pending activation; disabling
  // an active account has its own explicit action (toggleAdminStatus).
  if (invitation.status !== DB_ENUMS.invitation_status.pending) {
    return { error: "NOT_PENDING" };
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(invitation.user_id);
  const { error: updateError } = await supabase
    .from(DB_TABLES.PENDING_INVITATIONS)
    .update({
      status: DB_ENUMS.invitation_status.revoked,
      revoked_at: new Date().toISOString(),
    })
    .eq(DB_COLUMNS.pending_invitations.id, invitationId);

  if (updateError || deleteError) return { error: "UNKNOWN_ERROR" };

  // J3.4: audit the revocation.
  const cookieStore = await cookies();
  const { user } = await getVerifiedSession(createSupabaseServerClient(cookieStore));
  const { ipAddress, userAgent } = await getAuditRequestContext();
  await logAuditEvent({
    actorId: user?.id ?? null,
    actorEmail: user?.email ?? null,
    action: AUDIT_ACTIONS.USER_STATUS_CHANGED,
    entity: AUDIT_ENTITIES.USER,
    entityId: invitationId,
    metadata: { action: "invitation_revoked" },
    ipAddress,
    userAgent,
  });

  return { success: true };
};
