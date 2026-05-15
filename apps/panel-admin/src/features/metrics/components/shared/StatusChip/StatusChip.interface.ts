import type { ReservationStatus } from "../../../domain/metrics.types";

export interface StatusChipProps {
  status: ReservationStatus;
  label: string;
  count: number;
  pct: number;
}
