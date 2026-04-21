"use client";

import { FILTER_BAR_STYLES as S } from "@/themes/reservations-filters.theme";
import type { ReservationStatus } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { useReservationFilters } from "../hooks/useReservationFilters";
import { StatusPillGroup } from "./StatusPillGroup";
import { RoomSelector } from "./RoomSelector";
import { FilterResultsSummary } from "./FilterResultsSummary";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { DateRangePicker } from "./DateRangePicker";

interface ReservationsFiltersProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: ReservationFilters) => void;
  totalCount: number;
  filteredCount: number;
  statusCounts: Record<ReservationStatus, number>;
}

export const ReservationsFilters = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  statusCounts,
}: ReservationsFiltersProps) => {
  const { toggleStatus, update, clearFilters, isFiltered, selectedRoomKey, handleRoomChange } =
    useReservationFilters(filters, onFiltersChange);

  return (
    <div className={S.wrapper}>
      <div className={S.bar}>
        <StatusPillGroup
          statuses={filters.statuses}
          statusCounts={statusCounts}
          totalCount={totalCount}
          onAllClick={() => update({ statuses: [] })}
          onStatusToggle={toggleStatus}
        />

        <div className={S.spacer} />

        <div className={S.rightSection}>
          <RoomSelector value={selectedRoomKey} onChange={handleRoomChange} />

          <DateRangePicker
            checkIn={filters.dateFrom}
            checkOut={filters.dateTo}
            onChange={(checkIn, checkOut) => update({ dateFrom: checkIn, dateTo: checkOut })}
          />

          <ClearFiltersButton isFiltered={isFiltered} onClear={clearFilters} />
        </div>
      </div>

      <FilterResultsSummary
        filteredCount={filteredCount}
        totalCount={totalCount}
        isFiltered={isFiltered}
      />
    </div>
  );
};
