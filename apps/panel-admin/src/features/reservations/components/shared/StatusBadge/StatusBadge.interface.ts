import type { ReservationStatus } from "../../../domain/reservation";

export interface StatusBadgeProps {
  status: ReservationStatus;
  size?: "sm" | "md" | "lg";
}
