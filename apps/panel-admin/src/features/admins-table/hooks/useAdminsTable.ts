"use client";

import type { AdminsList } from "@hotel/db/types";
import { useCallback, useState } from "react";
import type { AdminWithPermissions } from "../services/permissions";
import { useAdminsFiltering } from "./useAdminsFiltering";
import { useToggleAdminStatus } from "./useToggleAdminStatus";

interface UseAdminsTableOptions {
  initialAdmins: AdminsList;
}

interface UseAdminsTableReturn {
  admins: AdminsList;
  statusCounts: { active: number; inactive: number; total: number };
  togglingId: string | null;
  selectedAdmin: AdminWithPermissions | null;
  isDrawerOpen: boolean;
  handleToggle: (adminId: string, currentIsActive: boolean) => void;
  openPermissionDrawer: (admin: AdminWithPermissions) => void;
  closePermissionDrawer: () => void;
  onPermissionUpdateSuccess: () => void;
}

export const useAdminsTable = ({ initialAdmins }: UseAdminsTableOptions): UseAdminsTableReturn => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminWithPermissions | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { statusCounts } = useAdminsFiltering(admins);

  const refreshAdmins = useCallback(async () => {
    const { getAdmins } = await import("../services/getAdmins");
    const data = await getAdmins();
    setAdmins(data);
  }, []);

  const { handleToggle, togglingId } = useToggleAdminStatus(refreshAdmins);

  const openPermissionDrawer = useCallback((admin: AdminWithPermissions) => {
    setSelectedAdmin(admin);
    setIsDrawerOpen(true);
  }, []);

  const closePermissionDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedAdmin(null);
  }, []);

  const onPermissionUpdateSuccess = useCallback(() => {
    refreshAdmins();
  }, [refreshAdmins]);

  return {
    admins,
    statusCounts,
    togglingId,
    selectedAdmin,
    isDrawerOpen,
    handleToggle,
    openPermissionDrawer,
    closePermissionDrawer,
    onPermissionUpdateSuccess,
  };
};
