"use client";

import { Pagination } from "@heroui/react";
import type { ReservationsPaginationProps } from "./ReservationsPagination.interface";
import { RESERVATIONS_PAGINATION_STYLES } from "./ReservationsPagination.styles";
import {
  PAGINATION_ELLIPSIS_THRESHOLD,
  PAGINATION_LABELS,
  PAGINATION_MAX_VISIBLE_PAGES,
  PAGINATION_NEIGHBOR_WINDOW,
} from "../../../constants/pagination";

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= PAGINATION_MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (page > PAGINATION_ELLIPSIS_THRESHOLD) pages.push("ellipsis");

  const start = Math.max(2, page - PAGINATION_NEIGHBOR_WINDOW);
  const end = Math.min(totalPages - 1, page + PAGINATION_NEIGHBOR_WINDOW);
  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - (PAGINATION_NEIGHBOR_WINDOW + 1)) pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}

export function ReservationsPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ReservationsPaginationProps) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <Pagination className={RESERVATIONS_PAGINATION_STYLES.wrapper}>
      <Pagination.Summary>
        {PAGINATION_LABELS.SHOWING} {startItem}–{endItem} {PAGINATION_LABELS.OF} {totalItems} {PAGINATION_LABELS.ITEMS_LABEL}
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={() => onPageChange(page - 1)}>
            <Pagination.PreviousIcon />
            <span>{PAGINATION_LABELS.PREVIOUS}</span>
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
          )
        )}

        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={() => onPageChange(page + 1)}>
            <span>{PAGINATION_LABELS.NEXT}</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
