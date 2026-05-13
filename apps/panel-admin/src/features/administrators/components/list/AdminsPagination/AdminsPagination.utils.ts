import {
  PAGINATION_FIRST_PAGE,
  PAGINATION_MAX_VISIBLE_PAGES,
  PAGINATION_ELLIPSIS_THRESHOLD,
  PAGINATION_NEIGHBOR_WINDOW,
} from "../../../constants/administrators.constants";

export function getPageNumbers(
  page: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= PAGINATION_MAX_VISIBLE_PAGES) {
    for (let i = PAGINATION_FIRST_PAGE; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(PAGINATION_FIRST_PAGE);
  if (page > PAGINATION_ELLIPSIS_THRESHOLD) pages.push("ellipsis");

  const start = Math.max(
    PAGINATION_FIRST_PAGE + 1,
    page - PAGINATION_NEIGHBOR_WINDOW,
  );
  const end = Math.min(totalPages - 1, page + PAGINATION_NEIGHBOR_WINDOW);
  for (let i = start; i <= end; i++) pages.push(i);

  if (page < totalPages - (PAGINATION_NEIGHBOR_WINDOW + 1))
    pages.push("ellipsis");
  pages.push(totalPages);

  return pages;
}
