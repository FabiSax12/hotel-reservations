"use client";

import { FILTER_BAR_STYLES as S } from "./ReservationsFilters.styles";
import { useReservationFilters } from "../../../hooks/useReservationFilters";
import { StatusPillGroup } from "../StatusPillGroup/StatusPillGroup";
import { RoomSelector } from "../RoomSelector/RoomSelector";
import { FilterResultsSummary } from "../FilterResultsSummary/FilterResultsSummary";
import { ClearFiltersButton } from "../ClearFiltersButton/ClearFiltersButton";
import { DateRangePicker } from "../DateRangePicker/DateRangePicker";
import { GuestSearchInput } from "../GuestSearchInput/GuestSearchInput";
import type { ReservationsFiltersProps } from "./ReservationsFilters.interface";

export const ReservationsFilters = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  statusCounts,
  rooms,
}: ReservationsFiltersProps) => {
  const { toggleStatus, update, clearFilters, isFiltered, selectedRoomKey, handleRoomChange, handleGuestNameChange } =
    useReservationFilters(filters, onFiltersChange);

  const handleClearStatuses = () => update({ statuses: [] });
  const handleDateRangeChange = (checkIn: string, checkOut: string) =>
    update({ dateFrom: checkIn, dateTo: checkOut });

  return (
    <div className={S.wrapper}>
      <div className={S.bar}>
        <StatusPillGroup
          statuses={filters.statuses}
          statusCounts={statusCounts}
          totalCount={totalCount}
          onAllClick={handleClearStatuses}
          onStatusToggle={toggleStatus}
        />

        <div className={S.spacer} />

        <div className={S.rightSection}>
          <GuestSearchInput value={filters.guestName} onChange={handleGuestNameChange} />

          <RoomSelector value={selectedRoomKey} rooms={rooms} onChange={handleRoomChange} />

          <DateRangePicker
            checkIn={filters.dateFrom}
            checkOut={filters.dateTo}
            onChange={handleDateRangeChange}
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
