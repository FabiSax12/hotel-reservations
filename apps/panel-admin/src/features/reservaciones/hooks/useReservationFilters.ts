import type { ReservationStatus } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { DEFAULT_FILTERS } from "../domain/reservation-filters";

const ROOM_ALL_KEY = "__ALL__";

interface UseReservationFiltersReturn {
  toggleStatus: (status: ReservationStatus) => void;
  update: (partial: Partial<ReservationFilters>) => void;
  clearFilters: () => void;
  isFiltered: boolean;
  selectedRoomKey: string;
  handleRoomChange: (key: string | number | null) => void;
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
    filters.statuses.length > 0 ||
    filters.roomName !== "" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

  const selectedRoomKey = filters.roomName === "" ? ROOM_ALL_KEY : filters.roomName;

  const handleRoomChange = (key: string | number | null) => {
    if (key === null) return;
    update({ roomName: key === ROOM_ALL_KEY ? "" : String(key) });
  };

  return { toggleStatus, update, clearFilters, isFiltered, selectedRoomKey, handleRoomChange };
};
