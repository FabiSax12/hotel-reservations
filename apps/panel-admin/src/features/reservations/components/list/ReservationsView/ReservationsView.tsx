"use client";

import { useEffect, useRef, useState } from "react";
import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "./ReservationsView.styles";
import { useReservationsFiltering } from "../../../hooks/useReservationsFiltering";
import { FILTERED_RESULTS } from "../../../constants/filtered-results";
import { PAGE_SIZE } from "../../../constants/pagination";
import { EmptyState } from "../EmptyState/EmptyState";
import { ReservationsFilters } from "../../filters/ReservationsFilters/ReservationsFilters";
import { ReservationsPageHeader } from "../ReservationsPageHeader/ReservationsPageHeader";
import { ReservationsTable } from "../ReservationsTable/ReservationsTable";
import { ReservationsPagination } from "../ReservationsPagination/ReservationsPagination";
import type { ReservationsViewProps } from "./ReservationsView.interface";

function updateUrlPage(p: number) {
  const url = new URL(window.location.href);
  if (p <= 1) url.searchParams.delete("page");
  else url.searchParams.set("page", String(p));
  window.history.replaceState(null, "", url.toString());
}

export const ReservationsView = ({ reservations, rooms, initialPage = 1 }: ReservationsViewProps) => {
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

  return (
    <main className={RESERVATIONS_PAGE_STYLES.wrapper}>
      <ReservationsPageHeader totalCount={reservations.length} statusCounts={statusCounts} />

      <div className={CARD_STYLES.bodySmall}>
        <ReservationsFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={reservations.length}
          filteredCount={filtered.length}
          statusCounts={statusCounts}
          rooms={rooms}
        />
      </div>

      <div className={CARD_STYLES.bodyWithOverflow}>
        {hasResults ? (
          <ReservationsTable reservations={paginated} />
        ) : (
          <EmptyState />
        )}
        {hasResults && totalPages > 1 && (
          <ReservationsPagination
            page={safePage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};
