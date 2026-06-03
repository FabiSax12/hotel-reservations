"use client";

import type { PermissionName } from "@hotel/db/types";
import { useMemo } from "react";
import { useAuth } from "@/shared/auth/context/useAuth";

export function useHasPermissions(permissions: PermissionName[], requireAll = true): boolean {
  const { profile, loading } = useAuth();

  return useMemo(() => {
    if (loading || !profile) return false;
    if (profile.role === "owner") return true;

    const userPermissions = profile.permissions ?? [];

    return requireAll
      ? permissions.every((p) => userPermissions.includes(p))
      : permissions.some((p) => userPermissions.includes(p));
  }, [profile, loading, permissions, requireAll]);
}
