// ─── Reservation Date Formatting Utilities ───────────────────────────────────

/** Formats an ISO date string (YYYY-MM-DD) for table cells. Example: "12 ene." */
export function formatTableDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "short",
  });
}

/** Formats an ISO date string for the date range picker display. Removes trailing period. */
export function formatPickerDate(isoStr: string): string {
  if (!isoStr) return "";
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "short" })
    .format(new Date(y, m - 1, d))
    .replace(".", "");
}
