"use client";

import { useRouter } from "next/navigation";
import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsPagination } from "../AdminsPagination/AdminsPagination";
import { AdminsEmptyState } from "../../shared/AdminsEmptyState/AdminsEmptyState";
import { ADMINS_VIEW_STYLES as STYLE } from "./AdminsView.styles";
import { ADMIN_EMPTY_COUNT, ADMIN_PAGE_SIZE, PAGINATION_SINGLE_PAGE } from "../../../constants/administrators.constants";
import type { AdminsViewProps } from "./AdminsView.interfaces";

export const AdminsView = ({
  administrators,
  sessionUserId,
  totalCount,
  activeCount,
  inactiveCount,
  page,
  totalPages,
}: AdminsViewProps) => {
  const router    = useRouter();
  const hasAdmins = administrators.length > ADMIN_EMPTY_COUNT;
  const showPagination = totalPages > PAGINATION_SINGLE_PAGE;

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <main className={STYLE.wrapper}>
      <div className={STYLE.body}>
        <AdminsPageHeader totalCount={totalCount} activeCount={activeCount} inactiveCount={inactiveCount} />
      </div>

      <div className={STYLE.bodyWithOverflow}>
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
