"use client";

import { useReservationFilters } from "../../../hooks/useReservationFilters";
import { ClearFiltersButton } from "../ClearFiltersButton/ClearFiltersButton";
import { DateRangePicker } from "../DateRangePicker/DateRangePicker";
import { FilterResultsSummary } from "../FilterResultsSummary/FilterResultsSummary";
import { GuestSearchInput } from "../GuestSearchInput/GuestSearchInput";
import { RoomSelector } from "../RoomSelector/RoomSelector";
import { StatusPillGroup } from "../StatusPillGroup/StatusPillGroup";
import type { ReservationsFiltersProps } from "./ReservationsFilters.interface";
import { FILTER_BAR_STYLES as STYLES } from "./ReservationsFilters.styles";

export const ReservationsFilters = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  statusCounts,
  rooms,
}: ReservationsFiltersProps) => {
  const {
    toggleStatus,
    update,
    clearFilters,
    isFiltered,
    selectedRoomKey,
    handleRoomChange,
    handleGuestNameChange,
  } = useReservationFilters(filters, onFiltersChange);

  const handleClearStatuses = () => update({ statuses: [] });
  const handleDateRangeChange = (checkIn: string, checkOut: string) =>
    update({ dateFrom: checkIn, dateTo: checkOut });

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.bar}>
        <StatusPillGroup
          statuses={filters.statuses}
          statusCounts={statusCounts}
          totalCount={totalCount}
          onAllClick={handleClearStatuses}
          onStatusToggle={toggleStatus}
        />

        <div className={STYLES.spacer} />

        <div className={STYLES.rightSection}>
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
