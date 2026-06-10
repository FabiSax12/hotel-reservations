/**
 * @file availability.ts — Pure availability math for room calendars (US-DM-07).
 *
 * The `rooms` table has no inventory column, so the rooms service assumes a
 * single unit per room. Under that assumption a room is bookable on any day not
 * already occupied by one of its active reservations. These helpers turn a set
 * of reserved date ranges into the list of free check-in days the calendar
 * offers. Pure and deterministic — unit-tested in `availability.test.ts`.
 */

/** A reserved night range read from `reservations` (check-out is exclusive). */
export interface ReservedRange {
  /** ISO check-in date (YYYY-MM-DD), inclusive. */
  checkIn: string;
  /** ISO check-out date (YYYY-MM-DD), exclusive. */
  checkOut: string;
}

/** Adds `days` to an ISO `YYYY-MM-DD` date and returns a new ISO date. */
export function addIsoDays(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Returns the ISO check-in days within `[start, start + windowDays)` that are
 * NOT occupied by any of `reserved` (inventory of 1). ISO `YYYY-MM-DD` strings
 * compare correctly with `<`, so the night sweep stays string-only.
 */
export function computeAvailableDates(
  reserved: readonly ReservedRange[],
  startIso: string,
  windowDays: number,
): string[] {
  const blocked = new Set<string>();
  for (const range of reserved) {
    for (let day = range.checkIn; day < range.checkOut; day = addIsoDays(day, 1)) {
      blocked.add(day);
    }
  }

  const available: string[] = [];
  for (let offset = 0; offset < windowDays; offset++) {
    const iso = addIsoDays(startIso, offset);
    if (!blocked.has(iso)) available.push(iso);
  }
  return available;
}
