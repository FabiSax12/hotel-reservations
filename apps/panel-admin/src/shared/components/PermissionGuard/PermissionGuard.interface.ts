import type { PermissionName } from "@hotel/db/types";
import type { ReactNode } from "react";

export interface PermissionGuardProps {
  /** Array of permissions to check */
  permissions: PermissionName[];
  /** When using an array, require all permissions (default: true) */
  requireAll?: boolean;
  /** Content to render if user has permission */
  children: ReactNode;
  /** Content to render if user lacks permission (default: null) */
  fallback?: ReactNode;
}
