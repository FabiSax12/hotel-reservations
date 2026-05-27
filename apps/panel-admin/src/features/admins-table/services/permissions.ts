"use server";

import { getUserPermissions, setUserPermissions } from "@hotel/core/permissions";
import {
  type AdminsList,
  createSupabaseServiceClient,
  DB_COLUMNS,
  DB_ENUMS,
  DB_TABLES,
  RPC_FUNCTIONS,
} from "@hotel/db";
import type { PermissionName } from "@hotel/db/types";
import { cookies } from "next/headers";
import { requirePermission } from "@/shared/auth/requirePermission";

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

  // Get permissions for each admin
  const adminsWithPermissions = await Promise.all(
    (admins as AdminsList).map(async (admin) => {
      const permissions =
        admin.role === "owner"
          ? Object.values(DB_ENUMS.user_permission)
          : await getUserPermissions(admin.id);

      return {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        role: admin.role as "admin" | "owner",
        permissions,
        is_active: admin.is_active,
      };
    }),
  );

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

// Re-export createSupabaseServerClient for use in this file
import { createSupabaseServerClient } from "@hotel/db";
import { PERMISSIONS } from "@/shared/constants/permissions";
