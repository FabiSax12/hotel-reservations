"use client";

import type { AdminsList } from "@hotel/db/types";
import { useCallback, useState } from "react";
import type { AdminWithPermissions } from "../services/permissions";

export function usePermissionDrawerHandlers(initialAdmins: AdminsList) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminWithPermissions | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const refreshAdmins = useCallback(async () => {
    const { getAdmins } = await import("../services/getAdmins");
    const data = await getAdmins();
    setAdmins(data);
  }, []);

  const handleManagePermissions = useCallback((admin: AdminWithPermissions) => {
    setSelectedAdmin(admin);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedAdmin(null);
  }, []);

  const handlePermissionUpdateSuccess = useCallback(() => {
    refreshAdmins();
  }, [refreshAdmins]);

  return {
    admins,
    selectedAdmin,
    isDrawerOpen,
    refreshAdmins,
    handleManagePermissions,
    handleCloseDrawer,
    handlePermissionUpdateSuccess,
  };
}
