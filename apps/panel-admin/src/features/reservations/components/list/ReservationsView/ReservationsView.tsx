"use client";

import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "./ReservationsView.styles";
import { useReservationsFiltering } from "../../../hooks/useReservationsFiltering";
import { FILTERED_RESULTS } from "../../../constants/filtered-results";
import { EmptyState } from "../EmptyState/EmptyState";
import { ReservationsFilters } from "../../filters/ReservationsFilters/ReservationsFilters";
import { ReservationsPageHeader } from "../ReservationsPageHeader/ReservationsPageHeader";
import { ReservationsTable } from "../ReservationsTable/ReservationsTable";
import type { ReservationsViewProps } from "./ReservationsView.interface";

export const ReservationsView = ({ reservations }: ReservationsViewProps) => {
  const { filters, setFilters, statusCounts, filtered } = useReservationsFiltering(reservations);
  const hasResults = filtered.length > FILTERED_RESULTS.EMPTY;

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
        />
      </div>

      <div className={CARD_STYLES.bodyWithOverflow}>
        {hasResults ? (
          <ReservationsTable reservations={filtered} />
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
};
