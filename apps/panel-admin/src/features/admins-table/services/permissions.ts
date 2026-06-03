"use server";

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

export type AdminWithPermissions = {
  id: string;
  full_name: string | null;
  email: string;
  role: "admin" | "owner";
  permissions: PermissionName[];
  is_active: boolean;
};

export type UpdatePermissionsResult =
  | { success: true }
  | { error: "SELF_MODIFY" | "OWNER_MODIFY" | "INVALID_PERMISSION" | "UNKNOWN_ERROR" };

export async function getUserPermissionsService(userId: string): Promise<PermissionName[]> {
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
  const nonOwnerIds = adminsList.filter((admin) => admin.role !== "owner").map((admin) => admin.id);

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
    role: admin.role as "admin" | "owner",
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

  // Get current user ID from session
  const cookieStore = await cookies();
  const supabaseServer = createSupabaseServerClient(cookieStore);
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  if (!session?.user) {
    return { error: "UNKNOWN_ERROR" };
  }

  const currentUserId = session.user.id;

  // Validation: cannot modify own permissions
  if (currentUserId === targetUserId) {
    return { error: "SELF_MODIFY" };
  }

  const supabase = createSupabaseServiceClient();

  // Validation: cannot modify owner permissions
  const { data: targetRole } = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, targetUserId)
    .single();

  if (targetRole?.role === DB_ENUMS.user_role.owner) {
    return { error: "OWNER_MODIFY" };
  }

  // Validation: all permissions must be valid
  const validPermissions = Object.values(DB_ENUMS.user_permission);
  const invalidPermissions = permissions.filter((p) => !validPermissions.includes(p));
  if (invalidPermissions.length > 0) {
    return { error: "INVALID_PERMISSION" };
  }

  try {
    await setUserPermissions(targetUserId, permissions, currentUserId);
    return { success: true };
  } catch {
    return { error: "UNKNOWN_ERROR" };
  }
}
