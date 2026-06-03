"use client";

import { useAdminsTable } from "../../hooks/useAdminsTable";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { PermissionDrawer } from "../PermissionDrawer/PermissionDrawer";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES } from "./AdminsTableView.styles";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const {
    admins,
    statusCounts,
    togglingId,
    selectedAdmin,
    isDrawerOpen,
    handleToggle,
    openPermissionDrawer,
    closePermissionDrawer,
    onPermissionUpdateSuccess,
  } = useAdminsTable({ initialAdmins });

  return (
    <main className={ADMINS_PAGE_STYLES.wrapper}>
      <AdminsPageHeader totalCount={admins.length} statusCounts={statusCounts} />

      <AdminsTable
        admins={admins}
        onToggle={handleToggle}
        togglingId={togglingId}
        onManagePermissions={openPermissionDrawer}
      />

      <PermissionDrawer
        isOpen={isDrawerOpen}
        onClose={closePermissionDrawer}
        admin={selectedAdmin}
        onSuccess={onPermissionUpdateSuccess}
      />
    </main>
  );
};
