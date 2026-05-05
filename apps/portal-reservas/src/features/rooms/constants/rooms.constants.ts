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
   * Simulated delay (ms) for the availability check hook.
   * Mimics a real DB fetch while the feature is in mock mode.
   */
  AVAILABILITY_DELAY_MS: 600,
  /**
   * Simulated delay (ms) for the reservation action.
   */
  RESERVE_DELAY_MS: 1200,
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
} as const);
