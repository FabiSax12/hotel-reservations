"use client";

import { useState } from "react";
import { useAdminsTable } from "../../hooks/useAdminsTable";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useAdminsPagination } from "../../hooks/useAdminsPagination";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsPagination } from "../AdminsPagination/AdminsPagination";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsFilters } from "../Filters/AdminsFilters";
import { PermissionDrawer } from "../PermissionDrawer/PermissionDrawer";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES, CARD_STYLES } from "./AdminsTableView.styles";
import type { AdminStatusFilter } from "../Filters/AdminsFilters.interface";
import { FILTERS_STATUS } from "../../constants/filters-status";
import { ADMINS_PAGE_SIZE } from "../../constants/pagination";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
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
      <AdminsPageHeader totalCount={admins.length} statusCounts={statusCounts} />

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
