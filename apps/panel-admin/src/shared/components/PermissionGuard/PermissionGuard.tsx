"use client";

import { useHasPermissions } from "@/shared/hooks/useHasPermissions";
import type { PermissionGuardProps } from "./PermissionGuard.interface";

export function PermissionGuard({
  permissions,
  requireAll = true,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const hasAccess = useHasPermissions(permissions, requireAll);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
