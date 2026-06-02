/**
 * @file room-detail.constants.ts — Functional constants for the room detail feature.
 *
 * All thresholds, delays, and query strings centralized here. Zero magic
 * numbers/strings in component or hook files.
 */

export const ROOM_DETAIL = Object.freeze({
  /**
   * Duration (ms) of the side panel slide-out before it unmounts.
   * Must match the panel's CSS transition (`duration-300` in room-detail.theme).
   */
  EXIT_MS: 300,
  /** Minimum horizontal pointer travel (px) to register a carousel swipe. */
  SWIPE_THRESHOLD_PX: 40,
} as const);

/** Media query matching the mobile-sheet breakpoint (below Tailwind `lg`). */
export const ROOM_DETAIL_MOBILE_QUERY = "(max-width: 1023px)";

/** Discriminant values for a RoomDetailSelection. */
export const SELECTION_KIND = Object.freeze({
  ROOM: "room",
  PACKAGE: "package",
} as const);
