"use client";

import { useAdminsFiltering } from "../../hooks/useAdminsFiltering";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import type { AdminsTableViewProps } from "./AdminsTableView.interface";
import { ADMINS_PAGE_STYLES } from "./AdminsTableView.styles";

export const AdminsTableView = ({ admins }: AdminsTableViewProps) => {
    const { statusCounts } = useAdminsFiltering(admins);

    return (
        <main className={ADMINS_PAGE_STYLES.wrapper}>
            <AdminsPageHeader totalCount={admins.length} statusCounts={statusCounts} />

            <AdminsTable admins={admins} />
        </main>
    );
};
