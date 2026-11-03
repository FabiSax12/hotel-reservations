"use server";

import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "@hotel/core/audit";
import { getAuditRequestContext, logAuditEvent } from "@hotel/core/audit/server";
import { getVerifiedSession } from "@hotel/core/auth";
import { getUserPermissions, setUserPermissions } from "@hotel/core/permissions";
import {
  type AdminsList,
  createSupabaseServerClient,
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_ENUMS,
  DB_TABLES,
  RPC_FUNCTIONS,
} from "@hotel/db";
import type { PermissionName } from "@hotel/db/types";
import { cookies } from "next/headers";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { APP_ROLES } from "@/shared/constants/roles";
import {
  UPDATE_PERMISSION_ERRORS,
  type UpdatePermissionError,
} from "../constants/permissionErrors";

export type AdminWithPermissions = {
  id: string;
  full_name: string | null;
  email: string;
  role: typeof APP_ROLES.ADMIN | typeof APP_ROLES.OWNER;
  permissions: PermissionName[];
  is_active: boolean;
};

export type UpdatePermissionsResult = { success: true } | { error: UpdatePermissionError };

export async function getUserPermissionsService(userId: string): Promise<PermissionName[]> {
  // J3.1 (J2-POC-2): this read was reachable by any authenticated session with no
  // guard at all, leaking any admin's (including the owner's) full permission set
  // via the Next-Action endpoint. Same bar as its sibling getUserPermissionsList.
  await requirePermission(PERMISSIONS.ADMINS.VIEW);
  return await getUserPermissions(userId);
}

export async function getUserPermissionsList(): Promise<AdminWithPermissions[]> {
  await requirePermission(PERMISSIONS.ADMINS.VIEW);

  const supabase = createSupabaseServiceClient();

  // Get admins using the existing RPC
  const { data: admins, error } = await supabase.rpc(RPC_FUNCTIONS.GET_ADMINS);
  if (error) throw new Error(error.message);

  const adminsList = admins as AdminsList;

  // Collect non-owner admin IDs
  const nonOwnerIds = adminsList
    .filter((admin) => admin.role !== APP_ROLES.OWNER)
    .map((admin) => admin.id);

  // Fetch all permissions in ONE query for non-owners
  const permissionsMap = new Map<string, PermissionName[]>();
  if (nonOwnerIds.length > 0) {
    const { data: permissionsData, error: permError } = await supabase
      .from(DB_TABLES.USER_PERMISSIONS)
      .select(`${DB_COLUMNS.user_permissions.user_id}, ${DB_COLUMNS.user_permissions.permission}`)
      .in(DB_COLUMNS.user_permissions.user_id, nonOwnerIds);

    if (permError) throw new Error(permError.message);

    // Group by user_id
    for (const row of permissionsData ?? []) {
      const userId = row[DB_COLUMNS.user_permissions.user_id] as string;
      const permission = row[DB_COLUMNS.user_permissions.permission] as PermissionName;
      const existing = permissionsMap.get(userId) ?? [];
      existing.push(permission);
      permissionsMap.set(userId, existing);
    }
  }

  // Map admins with their permissions
  const adminsWithPermissions = adminsList.map((admin) => ({
    id: admin.id,
    full_name: admin.full_name,
    email: admin.email,
    role: admin.role as typeof APP_ROLES.ADMIN | typeof APP_ROLES.OWNER,
    permissions:
      admin.role === APP_ROLES.OWNER
        ? Object.values(DB_ENUMS.user_permission)
        : (permissionsMap.get(admin.id) ?? []),
    is_active: admin.is_active,
  }));

  return adminsWithPermissions;
}

export async function updateUserPermissions(
  targetUserId: string,
  permissions: PermissionName[],
): Promise<UpdatePermissionsResult> {
  await requirePermission(PERMISSIONS.PERMISSIONS.MANAGE);

  // J3.1 (J2-POC-4 pattern): getSession() trusts the cookie as-is; getUser()/
  // getVerifiedSession() re-validates the JWT against the Supabase Auth server.
  const cookieStore = await cookies();
  const supabaseServer = createSupabaseServerClient(cookieStore);
  const { user } = await getVerifiedSession(supabaseServer);

  if (!user) {
    return { error: UPDATE_PERMISSION_ERRORS.UNKNOWN_ERROR };
  }

  const currentUserId = user.id;

  // Validation: cannot modify own permissions
  if (currentUserId === targetUserId) {
    return { error: UPDATE_PERMISSION_ERRORS.SELF_MODIFY };
  }

  const supabase = createSupabaseServiceClient();

  // Validation: target must be an existing, non-owner admin (J2-POC-3: a target
  // with no admin role at all should never reach setUserPermissions).
  const { data: targetRole } = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, targetUserId)
    .single();

  if (!targetRole) {
    return { error: UPDATE_PERMISSION_ERRORS.INVALID_TARGET };
  }

  if (targetRole.role === DB_ENUMS.user_role.owner) {
    return { error: UPDATE_PERMISSION_ERRORS.OWNER_MODIFY };
  }

  if (targetRole.role !== DB_ENUMS.user_role.admin) {
    return { error: UPDATE_PERMISSION_ERRORS.INVALID_TARGET };
  }

  // Validation: all permissions must be valid
  const validPermissions = Object.values(DB_ENUMS.user_permission);
  const invalidPermissions = permissions.filter((p) => !validPermissions.includes(p));
  if (invalidPermissions.length > 0) {
    return { error: UPDATE_PERMISSION_ERRORS.INVALID_PERMISSION };
  }

  // J3.1 (J2-POC-3): "confused deputy" fix. A caller with permissions:manage could
  // otherwise grant a target MORE permissions than the caller itself holds (e.g.
  // admins:revoke, audit:view) by calling this action directly, bypassing the UI.
  // The owner has no row in user_permissions (permissions are implicit for it),
  // so the subset check only applies to non-owner callers.
  const isCallerOwner = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, currentUserId)
    .single()
    .then(({ data }) => data?.role === DB_ENUMS.user_role.owner);

  if (!isCallerOwner) {
    const callerPermissions = new Set(await getUserPermissions(currentUserId));
    const exceededPermissions = permissions.filter((p) => !callerPermissions.has(p));
    if (exceededPermissions.length > 0) {
      return { error: UPDATE_PERMISSION_ERRORS.PERMISSION_EXCEEDED };
    }
  }

  const previousPermissions = await getUserPermissions(targetUserId);

  try {
    await setUserPermissions(targetUserId, permissions, currentUserId);

    // J3.4: audit the permission change (who, target, before/after).
    const { ipAddress, userAgent } = await getAuditRequestContext();
    const granted = permissions.filter((p) => !previousPermissions.includes(p));
    const revoked = previousPermissions.filter((p) => !permissions.includes(p));
    await logAuditEvent({
      actorId: currentUserId,
      actorEmail: user.email ?? null,
      action:
        granted.length > 0 && revoked.length === 0
          ? AUDIT_ACTIONS.USER_PERMISSION_GRANTED
          : revoked.length > 0 && granted.length === 0
            ? AUDIT_ACTIONS.USER_PERMISSION_REVOKED
            : AUDIT_ACTIONS.USER_PERMISSION_GRANTED,
      entity: AUDIT_ENTITIES.PERMISSION,
      entityId: targetUserId,
      metadata: { before: previousPermissions, after: permissions, granted, revoked },
      ipAddress,
      userAgent,
    });

    return { success: true };
  } catch {
    return { error: UPDATE_PERMISSION_ERRORS.UNKNOWN_ERROR };
  }
}
