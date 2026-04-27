import type { ReservationStatus } from "../../domain/reservation";

export interface StatusPillGroupProps {
  statuses: ReservationStatus[];
  statusCounts: Record<ReservationStatus, number>;
  totalCount: number;
  onAllClick: () => void;
  onStatusToggle: (status: ReservationStatus) => void;
}
