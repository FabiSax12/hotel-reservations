import type { ReservationStatus } from "../../../domain/metrics.types";

export interface ProportionalBarSegment {
  status: ReservationStatus;
  pct: number;
}

export interface ProportionalBarProps {
  segments: ProportionalBarSegment[];
  ariaLabel: string;
}
