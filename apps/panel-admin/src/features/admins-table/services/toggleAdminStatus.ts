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

export type ToggleAdminStatusResult =
  | { success: true }
  | { error: "NOT_FOUND" | "SELF_MODIFY" | "OWNER_MODIFY" | "UNKNOWN_ERROR" };

export const toggleAdminStatus = async (
  adminId: string,
  // Kept for backwards-compatible call sites; no longer trusted as source of
  // truth for the new state (J3.1 / J2-POC-5 below).
  _clientReportedIsActive: boolean,
): Promise<ToggleAdminStatusResult> => {
  await requirePermission(PERMISSIONS.ADMINS.DISABLE);

  const cookieStore = await cookies();
  const { user } = await getVerifiedSession(createSupabaseServerClient(cookieStore));
  if (!user) return { error: "UNKNOWN_ERROR" };

  // J3.1 (J2-POC-5): reject self and owner as a target, same checks already
  // applied by updateUserPermissions (SELF_MODIFY / OWNER_MODIFY).
  if (user.id === adminId) {
    return { error: "SELF_MODIFY" };
  }

  const supabase = createSupabaseServiceClient();

  const { data: targetRole } = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, adminId)
    .single();

  if (!targetRole) return { error: "NOT_FOUND" };
  if (targetRole.role === DB_ENUMS.user_role.owner) {
    return { error: "OWNER_MODIFY" };
  }

  // J3.1 (J2-POC-5): recompute the new state from the real row instead of the
  // boolean the client supplied — the client-supplied value was never checked
  // against the database, so any caller could toggle in either direction
  // regardless of the account's actual current state.
  const { data: profile, error: fetchError } = await supabase
    .from(DB_TABLES.PROFILES)
    .select(DB_COLUMNS.profiles.is_active)
    .eq(DB_COLUMNS.profiles.id, adminId)
    .single();

  if (fetchError || !profile) return { error: "NOT_FOUND" };

  const wasActive = profile.is_active;
  const { error } = await supabase
    .from(DB_TABLES.PROFILES)
    .update({ is_active: !wasActive })
    .eq(DB_COLUMNS.profiles.id, adminId);

  if (error) return { error: "UNKNOWN_ERROR" };

  // Revoke all sessions when deactivating an admin
  if (wasActive) {
    await supabase.auth.admin.signOut(adminId);
  }

  // J3.4: audit the status change.
  const { ipAddress, userAgent } = await getAuditRequestContext();
  await logAuditEvent({
    actorId: user.id,
    actorEmail: user.email ?? null,
    action: AUDIT_ACTIONS.USER_STATUS_CHANGED,
    entity: AUDIT_ENTITIES.USER,
    entityId: adminId,
    metadata: { from: wasActive, to: !wasActive },
    ipAddress,
    userAgent,
  });

  return { success: true };
};
