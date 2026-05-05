import type { ReservationStatus } from "../../../domain/reservation";
import type { ReservationFilters } from "../../../domain/reservation-filters";

export interface ReservationsFiltersProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: ReservationFilters) => void;
  totalCount: number;
  filteredCount: number;
  statusCounts: Record<ReservationStatus, number>;
}
