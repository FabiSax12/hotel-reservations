"use client";

import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "./ReservationsView.styles";
import { useReservationsView } from "../../../hooks/useReservationsView";
import { EmptyState } from "../EmptyState/EmptyState";
import { ReservationsFilters } from "../../filters/ReservationsFilters/ReservationsFilters";
import { ReservationsPageHeader } from "../ReservationsPageHeader/ReservationsPageHeader";
import { ReservationsTable } from "../ReservationsTable/ReservationsTable";
import { ReservationsPagination } from "../ReservationsPagination/ReservationsPagination";
import type { ReservationsViewProps } from "./ReservationsView.interface";

export const ReservationsView = ({ reservations, rooms, initialPage = 1 }: ReservationsViewProps) => {
  const { filters, setFilters, statusCounts, filtered, paginated, page, totalPages, pageSize, hasResults, handlePageChange } =
    useReservationsView(reservations, initialPage);

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
            page={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};
