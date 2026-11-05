/**
 * @file reservation-rules.ts — server-side business rules for reservations.
 *
 * OP-R05 / OP-R07 (Fase 3): the panel UI only offers valid choices, but the
 * Server Actions receive whatever the client sends. These guards are the
 * server's own check of the values before they reach the database.
 */

import { BOOKING_MODE } from "../constants/booking-mode";
import { RESERVATION_STATUSES } from "../constants/reservation-statuses";
import { VALID_TRANSITIONS } from "../constants/status-transitions";
import type { BookingMode, ReservationStatus } from "./reservation";

const BOOKING_MODES: readonly string[] = Object.values(BOOKING_MODE);

export function isReservationStatus(value: unknown): value is ReservationStatus {
  return typeof value === "string" && (RESERVATION_STATUSES as readonly string[]).includes(value);
}

export function isValidStatusTransition(from: ReservationStatus, to: ReservationStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isBookingMode(value: unknown): value is BookingMode {
  return typeof value === "string" && BOOKING_MODES.includes(value);
}

/** A status change the reservation state machine does not allow (e.g. cancelled → approved). */
export class InvalidStatusTransitionError extends Error {
  readonly code = "INVALID_STATUS_TRANSITION" as const;

  constructor(from: string | null, to: string) {
    super(`Invalid reservation status transition: ${from ?? "?"} -> ${to}`);
    this.name = "InvalidStatusTransitionError";
  }
}

export class ReservationNotFoundError extends Error {
  readonly code = "RESERVATION_NOT_FOUND" as const;

  constructor() {
    super("Reservation not found");
    this.name = "ReservationNotFoundError";
  }
}

/** A booking_confirmation_mode value outside the BookingMode enum. */
export class InvalidBookingModeError extends Error {
  readonly code = "INVALID_BOOKING_MODE" as const;

  constructor() {
    super("Invalid booking confirmation mode");
    this.name = "InvalidBookingModeError";
  }
}
