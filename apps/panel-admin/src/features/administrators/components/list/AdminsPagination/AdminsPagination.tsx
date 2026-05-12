"use client";

import { Pagination } from "@heroui/react";
import { useI18n } from "@/locales";
import {
  PAGINATION_MAX_VISIBLE_PAGES,
  PAGINATION_ELLIPSIS_THRESHOLD,
  PAGINATION_NEIGHBOR_WINDOW,
} from "../../../constants/administrators.constants";
import { ADMINS_PAGINATION_STYLES } from "./AdminsPagination.styles";
import type { AdminsPaginationProps } from "./AdminsPagination.interfaces";

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= PAGINATION_MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (page > PAGINATION_ELLIPSIS_THRESHOLD) pages.push("ellipsis");

  const start = Math.max(2, page - PAGINATION_NEIGHBOR_WINDOW);
  const end   = Math.min(totalPages - 1, page + PAGINATION_NEIGHBOR_WINDOW);
  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - (PAGINATION_NEIGHBOR_WINDOW + 1)) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

export const AdminsPagination = ({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: AdminsPaginationProps) => {
  const { t } = useI18n();

  const startItem = (page - 1) * pageSize + 1;
  const endItem   = Math.min(page * pageSize, totalItems);

  const handlePrevious  = () => onPageChange(page - 1);
  const handleNext      = () => onPageChange(page + 1);
  const buildPageHandler = (p: number) => () => onPageChange(p);

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <Pagination className={ADMINS_PAGINATION_STYLES.wrapper}>
      <Pagination.Summary>
        {t.ADMINISTRATORS.PAGINATION.SHOWING} {startItem}–{endItem}{" "}
        {t.ADMINISTRATORS.PAGINATION.OF} {totalItems}{" "}
        {t.ADMINISTRATORS.PAGINATION.ITEMS}
      </Pagination.Summary>

      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={handlePrevious}>
            <Pagination.PreviousIcon />
            <span>{t.ADMINISTRATORS.PAGINATION.PREVIOUS}</span>
          </Pagination.Previous>
        </Pagination.Item>

        {pageNumbers.map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === page} onPress={buildPageHandler(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={handleNext}>
            <span>{t.ADMINISTRATORS.PAGINATION.NEXT}</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
};
