"use client";

import { useCallback } from "react";
import type { AdminsTableProps } from "../components/AdminsTable/AdminsTable.interface";
import type { AdminWithPermissions } from "../services/permissions";

interface UseAdminActionsOptions {
  onToggle: (adminId: string, currentIsActive: boolean) => void;
  onManagePermissions?: (admin: AdminWithPermissions) => void;
}

interface UseAdminActionsReturn {
  handleToggle: (adminId: string, currentIsActive: boolean) => void;
  handleManagePermissions: (admin: AdminsTableProps["admins"][number]) => void;
}

export const useAdminActions = ({
  onToggle,
  onManagePermissions,
}: UseAdminActionsOptions): UseAdminActionsReturn => {
  const handleToggle = useCallback(
    (adminId: string, currentIsActive: boolean) => {
      onToggle(adminId, currentIsActive);
    },
    [onToggle],
  );

  const handleManagePermissions = useCallback(
    (admin: AdminsTableProps["admins"][number]) => {
      if (onManagePermissions) {
        onManagePermissions({
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          role: admin.role as "admin" | "owner",
          permissions: [],
          is_active: admin.is_active,
        });
      }
    },
    [onManagePermissions],
  );

  return { handleToggle, handleManagePermissions };
};
