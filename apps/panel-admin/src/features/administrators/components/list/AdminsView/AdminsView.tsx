"use client";

import { useRouter } from "next/navigation";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsPagination } from "../AdminsPagination/AdminsPagination";
import { AdminsEmptyState } from "../../shared/AdminsEmptyState/AdminsEmptyState";
import { ADMINS_PAGE_STYLES, ADMINS_CARD_STYLES } from "./AdminsView.styles";
import { ADMIN_EMPTY_COUNT, ADMIN_PAGE_SIZE } from "../../../constants/administrators.constants";
import type { AdminsViewProps } from "./AdminsView.interfaces";

const SINGLE_PAGE = 1;

export const AdminsView = ({
  administrators,
  sessionUserId,
  totalCount,
  page,
  totalPages,
}: AdminsViewProps) => {
  const router    = useRouter();
  const hasAdmins = administrators.length > ADMIN_EMPTY_COUNT;
  const showPagination = totalPages > SINGLE_PAGE;

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <main className={ADMINS_PAGE_STYLES.wrapper}>
      <div className={ADMINS_CARD_STYLES.body}>
        <AdminsPageHeader totalCount={totalCount} />
      </div>

      <div className={ADMINS_CARD_STYLES.bodyWithOverflow}>
        {hasAdmins ? (
          <>
            <AdminsTable administrators={administrators} sessionUserId={sessionUserId} />
            {showPagination && (
              <AdminsPagination
                page={page}
                totalPages={totalPages}
                totalItems={totalCount}
                pageSize={ADMIN_PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <AdminsEmptyState />
        )}
      </div>
    </main>
  );
};
