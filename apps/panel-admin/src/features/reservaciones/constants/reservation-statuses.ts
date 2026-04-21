import type { ReservationStatus } from "../domain/reservation";

export const RESERVATION_STATUSES: readonly ReservationStatus[] = Object.freeze([
  "pending",
  "approved",
  "cancelled",
  "completed",
] as const);
