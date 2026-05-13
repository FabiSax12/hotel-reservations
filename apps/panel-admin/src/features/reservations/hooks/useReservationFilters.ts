import type { ReservationStatus } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { DEFAULT_FILTERS, ROOM_ALL_KEY } from "../constants/reservation-filters";
import { FILTERED_RESULTS } from "../constants/filtered-results";

interface UseReservationFiltersReturn {
  toggleStatus: (status: ReservationStatus) => void;
  update: (partial: Partial<ReservationFilters>) => void;
  clearFilters: () => void;
  isFiltered: boolean;
  selectedRoomKey: string;
  handleRoomChange: (key: string | number | null) => void;
  handleGuestNameChange: (value: string) => void;
}

export const useReservationFilters = (
  filters: ReservationFilters,
  onFiltersChange: (filters: ReservationFilters) => void,
): UseReservationFiltersReturn => {
  const update = (partial: Partial<ReservationFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const toggleStatus = (status: ReservationStatus) => {
    const current = filters.statuses;
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    update({ statuses: next });
  };

  const clearFilters = () => onFiltersChange({ ...DEFAULT_FILTERS });

  const isFiltered =
    filters.statuses.length > FILTERED_RESULTS.EMPTY ||
    filters.guestName !== DEFAULT_FILTERS.guestName ||
    filters.roomName !== DEFAULT_FILTERS.roomName ||
    filters.dateFrom !== DEFAULT_FILTERS.dateFrom ||
    filters.dateTo !== DEFAULT_FILTERS.dateTo;

  const selectedRoomKey = filters.roomName === "" ? ROOM_ALL_KEY : filters.roomName;

  const handleRoomChange = (key: string | number | null) => {
    if (key === null) return;
    update({ roomName: key === ROOM_ALL_KEY ? "" : String(key) });
  };

  const handleGuestNameChange = (value: string) => update({ guestName: value });

  return { toggleStatus, update, clearFilters, isFiltered, selectedRoomKey, handleRoomChange, handleGuestNameChange };
};
