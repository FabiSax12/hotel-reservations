"use client";

import { useEffect, useRef, useState } from "react";
import { FILTERED_RESULTS } from "../constants/filtered-results";
import { PAGE_SIZE } from "../constants/pagination";
import type { Reservation } from "../domain/reservation";
import { useReservationsFiltering } from "./useReservationsFiltering";

function updateUrlPage(p: number) {
  const url = new URL(window.location.href);
  if (p <= 1) url.searchParams.delete("page");
  else url.searchParams.set("page", String(p));
  window.history.replaceState(null, "", url.toString());
}

export function useReservationsView(reservations: readonly Reservation[], initialPage = 1) {
  const { filters, setFilters, statusCounts, filtered } = useReservationsFiltering(reservations);
  const [page, setPage] = useState(initialPage);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
    updateUrlPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const hasResults = filtered.length > FILTERED_RESULTS.EMPTY;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlPage(newPage);
  };

  return {
    filters,
    setFilters,
    statusCounts,
    filtered,
    paginated,
    page: safePage,
    totalPages,
    pageSize: PAGE_SIZE,
    hasResults,
    handlePageChange,
  };
}
