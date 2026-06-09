"use client";

import { useReservationsView } from "../../../hooks/useReservationsView";
import { useBookingMode } from "../../../hooks/useBookingMode";
import { ReservationsFilters } from "../../filters/ReservationsFilters/ReservationsFilters";
import { EmptyState } from "../EmptyState/EmptyState";
import { ReservationsPageHeader } from "../ReservationsPageHeader/ReservationsPageHeader";
import { ReservationsPagination } from "../ReservationsPagination/ReservationsPagination";
import { ReservationsTable } from "../ReservationsTable/ReservationsTable";
import type { ReservationsViewProps } from "./ReservationsView.interface";
import { CARD_STYLES, RESERVATIONS_PAGE_STYLES } from "./ReservationsView.styles";

export const ReservationsView = ({
  reservations,
  rooms,
  initialBookingMode,
  initialPage = 1,
}: ReservationsViewProps) => {
  const { mode: bookingMode, handleModeChange, isPending } = useBookingMode(initialBookingMode);

  const {
    filters,
    setFilters,
    statusCounts,
    filtered,
    paginated,
    page,
    totalPages,
    pageSize,
    hasResults,
    handlePageChange,
  } = useReservationsView(reservations, initialPage);

  return (
    <main className={RESERVATIONS_PAGE_STYLES.wrapper}>
      <ReservationsPageHeader
        totalCount={reservations.length}
        statusCounts={statusCounts}
        bookingMode={bookingMode}
        onBookingModeChange={handleModeChange}
        isBookingModeLoading={isPending}
      />

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
        {hasResults ? <ReservationsTable reservations={paginated} /> : <EmptyState />}
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
