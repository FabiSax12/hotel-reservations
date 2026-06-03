"use client";

import { useEffect, useMemo, useState } from "react";
import { ADMINS_PAGE_SIZE } from "../constants/pagination";

export function useAdminsPagination<T>(items: T[]) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / ADMINS_PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [items]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ADMINS_PAGE_SIZE;
    return items.slice(start, start + ADMINS_PAGE_SIZE);
  }, [items, page]);

  return { page, setPage, paginated, totalPages, totalItems: items.length };
}
