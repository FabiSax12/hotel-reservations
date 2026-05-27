"use client";

import { useCallback, useState } from "react";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useToggleAdminStatus } from "../../hooks/useToggleAdminStatus";
import type { AdminWithPermissions } from "../../services/permissions";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { PermissionDrawer } from "../PermissionDrawer/PermissionDrawer";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES } from "./AdminsTableView.styles";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminWithPermissions | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { statusCounts } = useAdminsFiltering(admins);

  const refreshAdmins = useCallback(async () => {
    const { getAdmins } = await import("../../services/getAdmins");
    const data = await getAdmins();
    setAdmins(data);
  }, []);

  const { handleToggle, togglingId } = useToggleAdminStatus(refreshAdmins);

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

  return (
    <main className={ADMINS_PAGE_STYLES.wrapper}>
      <AdminsPageHeader totalCount={admins.length} statusCounts={statusCounts} />

      <AdminsTable
        admins={admins}
        onToggle={handleToggle}
        togglingId={togglingId}
        onManagePermissions={handleManagePermissions}
      />

      <PermissionDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        admin={selectedAdmin}
        onSuccess={handlePermissionUpdateSuccess}
      />
    </main>
  );
};
