"use client";

import { AdminsPageHeader } from "../AdminsPageHeader/AdminsPageHeader";
import { AdminsTable } from "../AdminsTable/AdminsTable";
import { AdminsPagination } from "../AdminsPagination/AdminsPagination";
import { AdminsEmptyState } from "../../shared/AdminsEmptyState/AdminsEmptyState";
import { ADMINS_PAGE_STYLES, ADMINS_BG_IMAGE } from "./AdminsView.styles";
import { ADMIN_EMPTY_COUNT } from "../../../constants/administrators.constants";
import type { AdminsViewProps } from "./AdminsView.interfaces";

const SINGLE_PAGE = 1;

export const AdminsView = ({
  administrators,
  sessionUserId,
  totalCount,
  page,
  totalPages,
}: AdminsViewProps) => {
  const hasAdmins      = administrators.length > ADMIN_EMPTY_COUNT;
  const showPagination = totalPages > SINGLE_PAGE;

  return (
    <main className={ADMINS_PAGE_STYLES.root}>
      <div
        className={ADMINS_PAGE_STYLES.bgLayer}
        style={{ backgroundImage: `url(${ADMINS_BG_IMAGE})` }}
      />
      <div className={ADMINS_PAGE_STYLES.overlay} />

      <div className={ADMINS_PAGE_STYLES.content}>
        <AdminsPageHeader totalCount={totalCount} />

        {hasAdmins ? (
          <>
            <AdminsTable administrators={administrators} sessionUserId={sessionUserId} />
            {showPagination && (
              <AdminsPagination page={page} totalPages={totalPages} />
            )}
          </>
        ) : (
          <AdminsEmptyState />
        )}
      </div>
    </main>
  );
};
