import type { ReservationStatus } from "../../../domain/metricsTypes";

export interface StatusChipProps {
  status: ReservationStatus;
  label: string;
  count: number;
  pct: number;
}
