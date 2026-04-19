import type { ReservationStatus } from "../domain/reservation";

export const STATUS_I18N_KEY: Record<
  ReservationStatus,
  keyof { PENDING: string; APPROVED: string; CANCELLED: string; COMPLETED: string }
> = Object.freeze({
  pending: "PENDING",
  approved: "APPROVED",
  cancelled: "CANCELLED",
  completed: "COMPLETED",
} as const);
