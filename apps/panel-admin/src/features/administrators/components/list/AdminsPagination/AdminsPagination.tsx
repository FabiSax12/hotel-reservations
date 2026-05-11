"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import { useI18n } from "@/locales";
import { ADMINS_PAGINATION_STYLES as S } from "./AdminsPagination.styles";
import type { AdminsPaginationProps } from "./AdminsPagination.interfaces";

const MAX_VISIBLE_PAGES  = 5;
const ELLIPSIS_THRESHOLD = 2;

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [1];

  if (current > ELLIPSIS_THRESHOLD + 1) pages.push("…");

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);

  for (let p = start; p <= end; p++) pages.push(p);

  if (current < total - ELLIPSIS_THRESHOLD) pages.push("…");

  pages.push(total);
  return pages;
}

export const AdminsPagination = ({ page, totalPages }: AdminsPaginationProps) => {
  const { t }  = useI18n();
  const router = useRouter();

  const navigateToPage = (target: number) => {
    router.push(`?page=${target}`);
  };

  const handlePrevious = () => navigateToPage(page - 1);
  const handleNext     = () => navigateToPage(page + 1);

  const buildPageHandler = (target: number) => () => navigateToPage(target);

  const pageRange = buildPageRange(page, totalPages);

  return (
    <div className={S.wrapper}>
      <Pagination>
        <Pagination.Content className={S.content}>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={page <= 1}
              onPress={handlePrevious}
              aria-label={t.ADMINISTRATORS.PAGINATION.PREVIOUS}
              className={S.navButton}
            >
              <Pagination.PreviousIcon />
            </Pagination.Previous>
          </Pagination.Item>

          {pageRange.map((item, idx) =>
            item === "…" ? (
              <Pagination.Item key={`ellipsis-${idx}`}>
                <Pagination.Ellipsis className={S.ellipsis} />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={item}>
                <Pagination.Link
                  isActive={item === page}
                  onPress={buildPageHandler(item)}
                  className={item === page ? S.pageLinkActive : S.pageLink}
                >
                  {item}
                </Pagination.Link>
              </Pagination.Item>
            ),
          )}

          <Pagination.Item>
            <Pagination.Next
              isDisabled={page >= totalPages}
              onPress={handleNext}
              aria-label={t.ADMINISTRATORS.PAGINATION.NEXT}
              className={S.navButton}
            >
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};
