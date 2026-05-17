/**
 * @file date-range.utils.ts — Pure date range utilities for the rooms feature.
 *
 * Shared between RoomRangeCalendar and useRoomAvailability.
 */

/**
 * Returns an array of ISO date strings (YYYY-MM-DD) for each night
 * between `start` (inclusive) and `end` (exclusive).
 */
export function getDatesBetween(start: string, end: string): string[] {
  const result: string[] = [];
  const cursor = new Date(`${start}T00:00:00`);
  const target = new Date(`${end}T00:00:00`);
  while (cursor < target) {
    result.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

/**
 * Returns the subset of dates between `start` and `end` that are NOT
 * in the provided `availableDateSet`.
 */
export function getBlockedDatesBetween(
  start: string,
  end: string,
  availableDateSet: Set<string>,
): string[] {
  const stayNights = getDatesBetween(start, end);
  return stayNights.filter((isoDay) => !availableDateSet.has(isoDay));
}
