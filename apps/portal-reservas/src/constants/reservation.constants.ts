/**
 * @file reservation.constants.ts — URL parameter keys for the reservation flow.
 *
 * Shared between the rooms reserve CTA (which builds the /reserve link) and the
 * checkout feature (which parses it). Kept global so neither feature depends on
 * the other just to agree on the query-string contract.
 */

export const RESERVATION_PARAMS = Object.freeze({
  /** Comma-separated room IDs being reserved (one for a room, many for a package). */
  ROOMS: "rooms",
  /** ISO check-in date (YYYY-MM-DD). */
  CHECK_IN: "checkIn",
  /** ISO check-out date (YYYY-MM-DD). */
  CHECK_OUT: "checkOut",
  /** Total guest count (adults + children). */
  GUESTS: "guests",
} as const);

/** Separator between room IDs in the `rooms` query parameter. */
export const RESERVATION_ROOMS_SEPARATOR = ",";
