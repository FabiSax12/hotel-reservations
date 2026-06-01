"use client";

import { useCallback, useState } from "react";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useToggleAdminStatus } from "../../hooks/useToggleAdminStatus";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsFilters } from "../Filters/AdminsFilters";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES, CARD_STYLES } from "./AdminsTableView.styles";
import type { AdminStatusFilter } from "../Filters/AdminsFilters.interface";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [activeFilter, setActiveFilter] = useState<AdminStatusFilter>("all");
  const { statusCounts, filtered } = useAdminsFiltering(admins, activeFilter);

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
          isFiltered={activeFilter !== "all"}
          onClear={() => setActiveFilter("all")}
          statusCounts={statusCounts}
        />
      </div>

      <AdminsTable admins={filtered} onToggle={handleToggle} togglingId={togglingId} />
    </main>
  );
};
