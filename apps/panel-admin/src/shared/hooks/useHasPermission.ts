"use client";

import type { PermissionName } from "@hotel/db/types";
import { useMemo } from "react";
import { useAuth } from "@/shared/auth/context/useAuth";

export function useHasPermission(permission: PermissionName): boolean {
  const { profile, loading } = useAuth();

  return useMemo(() => {
    if (loading || !profile) return false;
    if (profile.role === "owner") return true;
    return profile.permissions?.includes(permission) ?? false;
  }, [profile, loading, permission]);
}
