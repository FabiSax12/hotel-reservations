/**
 * @file calendar.utils.ts — Pure calendar computation helpers.
 */

const SUNDAY_EPOCH = new Date(1970, 0, 4);

/**
 * Generates abbreviated day-of-week headers for the calendar grid.
 * Uses Intl.DateTimeFormat with the given locale.
 */
export function getDayHeaders(locale: string): string[] {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(SUNDAY_EPOCH.getTime() + i * 86400000);
    return new Intl.DateTimeFormat(locale, { weekday: "short" })
      .format(d)
      .slice(0, 2)
      .toUpperCase();
  });
}

/**
 * Formats a month header string (e.g. "Octubre 2026").
 */
export function getMonthHeader(
  year: number,
  month: number,
  locale: string,
  showYear: boolean,
): string {
  const targetDate = new Date(year, month, 1);
  const monthStr = new Intl.DateTimeFormat(locale, { month: "long" }).format(targetDate);
  const capitalized = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
  return showYear ? `${capitalized} ${year}` : capitalized;
}

/**
 * Returns the number of days in a given month.
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}