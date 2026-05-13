"use client";

import { Pagination } from "@heroui/react";
import { useI18n } from "@/locales";
import { PAGINATION_FIRST_PAGE } from "../../../constants/administrators.constants";
import { getPageNumbers } from "./AdminsPagination.utils";
import { ADMINS_PAGINATION_STYLES as STYLE } from "./AdminsPagination.styles";
import type { AdminsPaginationProps } from "./AdminsPagination.interfaces";

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

  const handlePrevious   = () => onPageChange(page - 1);
  const handleNext       = () => onPageChange(page + 1);
  const buildPageHandler = (p: number) => () => onPageChange(p);

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <Pagination className={STYLE.wrapper}>
      <Pagination.Summary>
        {t.ADMINISTRATORS.PAGINATION.SHOWING} {startItem}–{endItem}{" "}
        {t.ADMINISTRATORS.PAGINATION.OF} {totalItems}{" "}
        {t.ADMINISTRATORS.PAGINATION.ITEMS}
      </Pagination.Summary>

      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === PAGINATION_FIRST_PAGE} onPress={handlePrevious}>
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
