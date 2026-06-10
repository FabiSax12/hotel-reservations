import {
  ADMINS_PAGINATION_ELLIPSIS_THRESHOLD,
  ADMINS_PAGINATION_MAX_VISIBLE_PAGES,
  ADMINS_PAGINATION_NEIGHBOR_WINDOW,
} from "../constants/pagination";

export function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
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
