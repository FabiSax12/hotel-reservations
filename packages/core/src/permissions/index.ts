import { createSupabaseServiceClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import type { PermissionName } from "@hotel/db/types";
import { AUTH_ROLES } from "../auth/config/constants";

/**
 * Get all permissions for a user.
 */
export async function getUserPermissions(userId: string): Promise<PermissionName[]> {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.USER_PERMISSIONS)
    .select(DB_COLUMNS.user_permissions.permission)
    .eq(DB_COLUMNS.user_permissions.user_id, userId);

  if (error) {
    console.error("Failed to fetch user permissions:", error.message);
    return [];
  }

  return data?.map((row) => row.permission) ?? [];
}

/**
 * Check if a user has a specific permission.
 * Owners always return true.
 */
export async function hasPermission(userId: string, permission: PermissionName): Promise<boolean> {
  const supabase = createSupabaseServiceClient();

  const { data: roleData } = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, userId)
    .single();

  if (roleData?.role === AUTH_ROLES.OWNER) {
    return true;
  }

  const { data, error } = await supabase
    .from(DB_TABLES.USER_PERMISSIONS)
    .select(DB_COLUMNS.user_permissions.permission)
    .eq(DB_COLUMNS.user_permissions.user_id, userId)
    .eq(DB_COLUMNS.user_permissions.permission, permission as PermissionName)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to check permission:", error.message);
    return false;
  }

  return !!data;
}

/**
 * Check if a user has ALL of the specified permissions.
 * Owners always return true.
 */
export async function hasAllPermissions(
  userId: string,
  permissions: PermissionName[],
): Promise<boolean> {
  const supabase = createSupabaseServiceClient();

  const { data: roleData } = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, userId)
    .single();

  if (roleData?.role === AUTH_ROLES.OWNER) {
    return true;
  }

  const { data, error } = await supabase
    .from(DB_TABLES.USER_PERMISSIONS)
    .select(DB_COLUMNS.user_permissions.permission)
    .eq(DB_COLUMNS.user_permissions.user_id, userId)
    .in(DB_COLUMNS.user_permissions.permission, permissions as PermissionName[]);

  if (error) {
    console.error("Failed to check permissions:", error.message);
    return false;
  }

  const userPermissions = (data?.map((row) => row.permission) ?? []) as PermissionName[];
  return permissions.every((p) => userPermissions.includes(p));
}

/**
 * Check if a user has ANY of the specified permissions.
 * Owners always return true.
 */
export async function hasAnyPermission(
  userId: string,
  permissions: PermissionName[],
): Promise<boolean> {
  const supabase = createSupabaseServiceClient();

  const { data: roleData } = await supabase
    .from(DB_TABLES.USER_ROLES)
    .select(DB_COLUMNS.user_roles.role)
    .eq(DB_COLUMNS.user_roles.user_id, userId)
    .single();

  if (roleData?.role === AUTH_ROLES.OWNER) {
    return true;
  }

  const { data, error } = await supabase
    .from(DB_TABLES.USER_PERMISSIONS)
    .select(DB_COLUMNS.user_permissions.permission)
    .eq(DB_COLUMNS.user_permissions.user_id, userId)
    .in(DB_COLUMNS.user_permissions.permission, permissions as PermissionName[]);

  if (error) {
    console.error("Failed to check permissions:", error.message);
    return false;
  }

  const userPermissions = (data?.map((row) => row.permission) ?? []) as PermissionName[];
  return permissions.some((p) => userPermissions.includes(p));
}

export async function setUserPermissions(
  userId: string,
  permissions: PermissionName[],
  grantedBy: string,
): Promise<void> {
  const supabase = createSupabaseServiceClient();
  // Prepare rows to upsert
  const permissionsToInsert = permissions.map((permission) => ({
    [DB_COLUMNS.user_permissions.user_id]: userId,
    [DB_COLUMNS.user_permissions.permission]: permission,
    [DB_COLUMNS.user_permissions.granted_by]: grantedBy,
  }));

  // Upsert all provided permissions, using onConflict to avoid duplicates
  const { error: upsertError } = await supabase
    .from(DB_TABLES.USER_PERMISSIONS)
    .upsert(permissionsToInsert, {
      onConflict: `${DB_COLUMNS.user_permissions.user_id},${DB_COLUMNS.user_permissions.permission}`,
      ignoreDuplicates: true,
    });

  if (upsertError) {
    console.error("Failed to upsert permissions:", upsertError.message);
    throw new Error("Failed to set user permissions");
  }

  // Remove any permissions not in the provided list
  const permissionsList = permissions.map((p) => `'${p}'`).join(",");
  const { error: deleteError } = await supabase
    .from(DB_TABLES.USER_PERMISSIONS)
    .delete()
    .eq(DB_COLUMNS.user_permissions.user_id, userId)
    .not(DB_COLUMNS.user_permissions.permission, "in", `(${permissionsList})`);

  if (deleteError) {
    console.error("Failed to remove old permissions:", deleteError.message);
    throw new Error("Failed to set user permissions");
  }
}
