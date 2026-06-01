"use client";

import { useCallback, useState } from "react";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useAdminsPagination } from "../../hooks/useAdminsPagination";
import { useToggleAdminStatus } from "../../hooks/useToggleAdminStatus";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsPagination } from "../AdminsPagination/AdminsPagination";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsFilters } from "../Filters/AdminsFilters";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES, CARD_STYLES } from "./AdminsTableView.styles";
import type { AdminStatusFilter } from "../Filters/AdminsFilters.interface";
import { FILTERS_STATUS } from "../../constants/filters-status";
import { ADMINS_PAGE_SIZE } from "../../constants/pagination";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [activeFilter, setActiveFilter] = useState<AdminStatusFilter>(FILTERS_STATUS.ALL);
  const { statusCounts, filtered } = useAdminsFiltering(admins, activeFilter);
  const { page, setPage, paginated, totalPages, totalItems } = useAdminsPagination(filtered);

  const refreshAdmins = useCallback(async () => {
    const { getAdmins } = await import("../../services/getAdmins");
    const data = await getAdmins();
    setAdmins(data);
  }, []);

  const { handleToggle, togglingId } = useToggleAdminStatus(refreshAdmins);

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

      <AdminsTable admins={paginated} onToggle={handleToggle} togglingId={togglingId} />

      <AdminsPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={ADMINS_PAGE_SIZE}
        onPageChange={setPage}
      />
    </main>
  );
};
