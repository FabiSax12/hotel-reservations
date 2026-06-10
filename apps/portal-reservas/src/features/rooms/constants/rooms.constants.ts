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

export const ROOM_INVENTORY = Object.freeze({
  /**
   * Whether room inventory is backed by real DB data. False under US-DM-07
   * (inventory is assumed to be 1), so scarcity/availability-count UI is
   * suppressed to avoid showing every room as the "last one". Flip to true once
   * a real inventory source lands to re-enable those badges unchanged.
   */
  IS_TRACKED: false,
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

/**
 * Timing/UX constants for the quick-search and calendar interactions. The
 * mock-availability fields were removed in US-DM-07 (availability is now derived
 * from real reservations).
 */
export const ROOM_MOCK = Object.freeze({
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
