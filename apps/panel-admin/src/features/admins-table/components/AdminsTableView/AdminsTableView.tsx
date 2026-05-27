"use client";

import { useCallback, useState } from "react";
import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { useToggleAdminStatus } from "../../hooks/useToggleAdminStatus";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES } from "./AdminsTableView.styles";

export const AdminsTableView = ({ admins: initialAdmins }: AdminsTableViewProps) => {
  const [admins, setAdmins] = useState(initialAdmins);
  const { statusCounts } = useAdminsFiltering(admins);

  const refreshAdmins = useCallback(async () => {
    const { getAdmins } = await import("../../services/getAdmins");
    const data = await getAdmins();
    setAdmins(data);
  }, []);

  const { handleToggle, togglingId } = useToggleAdminStatus(refreshAdmins);

  return (
    <main className={ADMINS_PAGE_STYLES.wrapper}>
      <AdminsPageHeader totalCount={admins.length} statusCounts={statusCounts} />

      <AdminsTable admins={admins} onToggle={handleToggle} togglingId={togglingId} />
    </main>
  );
};
