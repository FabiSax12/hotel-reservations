"use client";

import type { Reservation } from "../domain/reservation";
import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "@/themes/reservations-page.theme";
import { useReservationsFiltering } from "../hooks/useReservationsFiltering";
import { EmptyState } from "./EmptyState";
import { ReservationsFilters } from "./ReservationsFilters";
import { ReservationsPageHeader } from "./ReservationsPageHeader";
import { ReservationsTable } from "./ReservationsTable";

interface ReservationsListProps {
  reservations: readonly Reservation[];
}

export const ReservationsList = ({ reservations }: ReservationsListProps) => {
  const { filters, setFilters, statusCounts, filtered } = useReservationsFiltering(reservations);

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
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <ReservationsTable reservations={filtered} />
        )}
      </div>
    </main>
  );
};
