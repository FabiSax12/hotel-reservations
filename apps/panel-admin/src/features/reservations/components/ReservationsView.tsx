"use client";

import type { Reservation } from "../domain/reservation";
import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "@/themes/reservations-page.theme";
import { useReservationsFiltering } from "../hooks/useReservationsFiltering";
import { EmptyState } from "./EmptyState";
import { ReservationsFilters } from "./ReservationsFilters";
import { ReservationsPageHeader } from "./ReservationsPageHeader";
import { ReservationsTable } from "./ReservationsTable";

interface ReservationsViewProps {
  reservations: readonly Reservation[];
}

export const ReservationsView = ({ reservations }: ReservationsViewProps) => {
  const { filters, setFilters, statusCounts, filtered } = useReservationsFiltering(reservations);
  const hasResults = filtered.length > 0;

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
