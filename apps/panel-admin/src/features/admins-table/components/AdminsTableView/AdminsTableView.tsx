"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import { PageHeader } from "@/shared/components/PageHeader";
import { FILTERS_STATUS } from "../../constants/filters-status";
import { ADMINS_PAGE_SIZE } from "../../constants/pagination";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useAdminsPagination } from "../../hooks/useAdminsPagination";
import { useAdminsTable } from "../../hooks/useAdminsTable";
import { AdminsPagination } from "../AdminsPagination/AdminsPagination";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsFilters } from "../Filters/AdminsFilters";
import type { AdminStatusFilter } from "../Filters/AdminsFilters.interface";
import { PermissionDrawer } from "../PermissionDrawer/PermissionDrawer";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES, CARD_STYLES } from "./AdminsTableView.styles";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<AdminStatusFilter>(FILTERS_STATUS.ALL);

  const {
    admins,
    togglingId,
    selectedAdmin,
    isDrawerOpen,
    handleToggle,
    openPermissionDrawer,
    closePermissionDrawer,
    onPermissionUpdateSuccess,
  } = useAdminsTable({ initialAdmins });

  const { statusCounts, filtered } = useAdminsFiltering(admins, activeFilter);
  const { page, setPage, paginated, totalPages, totalItems } = useAdminsPagination(filtered);

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

      <div className={CARD_STYLES.bodySmall}>
        <AdminsFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isFiltered={activeFilter !== FILTERS_STATUS.ALL}
          onClear={() => setActiveFilter(FILTERS_STATUS.ALL)}
          statusCounts={statusCounts}
        />
      </div>

      <AdminsTable
        admins={paginated}
        onToggle={handleToggle}
        togglingId={togglingId}
        onManagePermissions={openPermissionDrawer}
      />

      <AdminsPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={ADMINS_PAGE_SIZE}
        onPageChange={setPage}
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
