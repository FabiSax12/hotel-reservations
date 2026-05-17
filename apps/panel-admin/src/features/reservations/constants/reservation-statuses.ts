import type { ReservationStatus } from "../domain/reservation";

export const RESERVATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const satisfies Record<string, ReservationStatus>;

export const RESERVATION_STATUSES: readonly ReservationStatus[] = Object.freeze([
  RESERVATION_STATUS.PENDING,
  RESERVATION_STATUS.APPROVED,
  RESERVATION_STATUS.CANCELLED,
  RESERVATION_STATUS.COMPLETED,
] as const);
