"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/locales";
import { PageHeader } from "@/shared/components/PageHeader";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useToggleAdminStatus } from "../../hooks/useToggleAdminStatus";
import type { AdminWithPermissions } from "../../services/permissions";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { PermissionDrawer } from "../PermissionDrawer/PermissionDrawer";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES } from "./AdminsTableView.styles";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const { t } = useI18n();
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
      <PageHeader.Root>
        <PageHeader.Heading>
          <PageHeader.Title>
            {t.ADMINS.PAGE.TITLE_PREFIX}{" "}
            <PageHeader.TitleHighlight>{t.ADMINS.PAGE.TITLE_ACCENT}</PageHeader.TitleHighlight>
          </PageHeader.Title>
          <PageHeader.Description>
            {t.ADMINS.PAGE.DESCRIPTION}{" "}
            <PageHeader.DescriptionHighlight>{admins.length}</PageHeader.DescriptionHighlight>
          </PageHeader.Description>
        </PageHeader.Heading>
        <PageHeader.Stats>
          <PageHeader.StatCard
            label={t.ADMINS.STATS.ACTIVE_LABEL}
            value={statusCounts.active}
            note={t.ADMINS.STATS.ACTIVE_NOTE}
          />
          <PageHeader.StatCard
            label={t.ADMINS.STATS.INACTIVE_LABEL}
            value={statusCounts.inactive}
            note={t.ADMINS.STATS.INACTIVE_NOTE}
          />
          <PageHeader.StatCard
            label={t.ADMINS.STATS.TOTAL_LABEL}
            value={admins.length}
            note={t.ADMINS.STATS.TOTAL_NOTE}
          />
        </PageHeader.Stats>
      </PageHeader.Root>

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
