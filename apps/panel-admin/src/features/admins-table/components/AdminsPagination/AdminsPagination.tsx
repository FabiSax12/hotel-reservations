"use client";

import { Pagination } from "@heroui/react";
import { useI18n } from "@/locales";
import {
  ADMINS_PAGINATION_ELLIPSIS_THRESHOLD,
  ADMINS_PAGINATION_MAX_VISIBLE_PAGES,
  ADMINS_PAGINATION_NEIGHBOR_WINDOW,
} from "../../constants/pagination";
import type { AdminsPaginationProps } from "./AdminsPagination.interface";
import { ADMINS_PAGINATION_STYLES } from "./AdminsPagination.styles";

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= ADMINS_PAGINATION_MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (page > ADMINS_PAGINATION_ELLIPSIS_THRESHOLD) pages.push("ellipsis");

  const start = Math.max(2, page - ADMINS_PAGINATION_NEIGHBOR_WINDOW);
  const end = Math.min(totalPages - 1, page + ADMINS_PAGINATION_NEIGHBOR_WINDOW);
  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - (ADMINS_PAGINATION_NEIGHBOR_WINDOW + 1)) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

export function AdminsPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: AdminsPaginationProps) {
  const { t } = useI18n();
  const texts = t.ADMINS.PAGINATION;

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <Pagination className={ADMINS_PAGINATION_STYLES.wrapper}>
      <Pagination.Summary>
        {texts.SHOWING} {startItem}–{endItem} {texts.OF} {totalItems} {texts.ITEMS_LABEL}
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={() => onPageChange(page - 1)}>
            <Pagination.PreviousIcon />
            <span>{texts.PREVIOUS}</span>
          </Pagination.Previous>
        </Pagination.Item>

        {getPageNumbers(page, totalPages).map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === page} onPress={() => onPageChange(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => onPageChange(page + 1)}
          >
            <span>{texts.NEXT}</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
