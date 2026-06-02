/**
 * @file rooms-reveal.constants.ts — Timing for hiding/revealing the room list.
 *
 * Centralizes the delay used while the hero calendar or a data refresh is
 * active. Zero magic numbers in hook files.
 */

export const ROOMS_REVEAL = Object.freeze({
  /**
   * Delay (ms) before hiding the room list once the hero calendar / loading
   * state engages. Must match the calendar's CSS entrance transition so the
   * rooms don't flash underneath.
   */
  HIDE_DELAY_MS: 500,
} as const);
