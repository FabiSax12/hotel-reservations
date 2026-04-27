import type { ReservationStatus } from "../domain/reservation";

type ChipColor = "warning" | "success" | "danger" | "accent";

export const STATUS_COLOR: Record<ReservationStatus, ChipColor> = Object.freeze(
  {
    pending: "warning",
    approved: "success",
    cancelled: "danger",
    completed: "accent",
  } as const,
);
