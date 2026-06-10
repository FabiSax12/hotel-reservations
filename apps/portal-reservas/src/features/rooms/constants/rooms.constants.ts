/**
 * @file rooms.constants.ts — Logic-related constants for the rooms feature.
 *
 * All thresholds, delays, and magic numbers are centralized here.
 * Zero magic strings or numbers in component or hook files.
 */

export const ROOM_THRESHOLDS = Object.freeze({
  /** Rooms with inventory at or below this value show the urgency badge. */
  SCARCE: 2,
} as const);

export const ROOM_DEFAULTS = Object.freeze({
  /**
   * The `rooms` table has no inventory column yet (US-DM-07). The rooms service
   * assumes a single unit per room so availability can be derived from
   * reservations and the package grouping never double-books a physical room.
   */
  INVENTORY: 1,
} as const);

export const ROOM_AVAILABILITY = Object.freeze({
  /** How many days ahead the availability calendar is computed from reservations. */
  WINDOW_DAYS: 120,
} as const);

export const RESERVATION_STATUS = Object.freeze({
  /** Cancelled reservations free the room, so they never block availability. */
  CANCELLED: "cancelled",
} as const);

/** Developer-facing messages thrown by the rooms service (surfaced via error.tsx). */
export const ROOM_SERVICE_ERROR = Object.freeze({
  FETCH_ROOMS: "Failed to load rooms from the database",
  FETCH_AVAILABILITY: "Failed to load reservations for availability",
} as const);

export const ROOM_GROUPING = Object.freeze({
  /** A room's capacity must not exceed remaining guests by more than this value. */
  MAX_WASTE: 2,
  /** No package may contain more than this many rooms. */
  MAX_ROOMS: 4,
} as const);

export const ROOM_ANIMATION = Object.freeze({
  /** Stagger delay between each card entrance (ms). */
  CASCADE_DELAY_MS: 120,
  /** Duration of the card entrance animation (ms). */
  ENTRANCE_DURATION_MS: 500,
  /** Duration of the card expansion panel animation (ms). */
  EXPAND_DURATION_MS: 400,
  /** Duration of the expand chevron rotation (ms). */
  CHEVRON_ROTATE_DURATION_MS: 300,
} as const);

export const ROOM_MOCK = Object.freeze({
  /**
   * Simulated delay (ms) for the availability check hook before a room resolves
   * as reservable. Mimics a real DB fetch while the feature is in mock mode.
   */
  AVAILABILITY_DELAY_MS: 3000,
  /**
   * Number of available-date slots generated per room in mock data.
   */
  AVAILABLE_DATE_COUNT: 18,
  /**
   * Offset in days from today before first available slot.
   */
  FIRST_AVAILABLE_OFFSET: 3,
  /**
   * Stable i18n key returned by `useRoomAvailability` on error.
   * Resolved to a locale string by the consuming component via `t.ROOMS`.
   */
  AVAILABILITY_ERROR_KEY: "AVAILABILITY_ERROR",
  /**
   * Default days offset from today for quick search check-in.
   */
  QUICK_SEARCH_DAYS_OFFSET_IN: 7,
  /**
   * Default days offset from today for quick search check-out.
   */
  QUICK_SEARCH_DAYS_OFFSET_OUT: 10,
  /**
   * Milliseconds per day (used for date offset calculations).
   */
  MS_PER_DAY: 86400000,
  /**
   * Delay (ms) before auto-submitting after the second date is picked
   * in the check-availability calendar. Gives the user a moment to see
   * their selection before the UI transitions.
   */
  CALENDAR_SUBMIT_DELAY_MS: 120,
} as const);
