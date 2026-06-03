import type { ReservationStatus } from "../../../domain/metricsTypes";

export interface ProportionalBarSegment {
  status: ReservationStatus;
  pct: number;
}

export interface ProportionalBarProps {
  segments: ProportionalBarSegment[];
  ariaLabel: string;
}
