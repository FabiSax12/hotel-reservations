import type { BookingMode } from "../domain/reservation";

export const BOOKING_MODE_SETTING_KEY = "booking_confirmation_mode" as const;

export const BOOKING_MODE = {
  MANUAL: "manual",
  AUTOMATIC: "automatic",
} as const satisfies Record<string, BookingMode>;
