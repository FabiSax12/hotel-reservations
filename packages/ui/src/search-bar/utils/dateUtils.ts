/**
 * @file dateUtils.ts — Pure date helper functions for the calendar.
 */

/**
 * Converts an ISO date string (e.g. "2026-10-15") to a Unix timestamp in ms.
 *
 * Appends "T00:00:00" before parsing to avoid timezone-related off-by-one
 * errors that occur when `new Date("2026-10-15")` is interpreted as UTC
 * midnight rather than local midnight.
 *
 * @param isoStr - An ISO-formatted date string, or an empty string.
 * @returns The timestamp in milliseconds, or `0` if the input is empty.
 */
export const parseDateHelper = (isoStr: string) => {
  if (!isoStr) return 0;
  return new Date(isoStr + "T00:00:00").getTime();
};
