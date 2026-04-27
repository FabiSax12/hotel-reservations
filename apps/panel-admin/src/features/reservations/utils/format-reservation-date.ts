// ─── Reservation Date Formatting Utilities ───────────────────────────────────

/** Formats an ISO date string (YYYY-MM-DD) for table cells. Example: "12 ene." */
export function formatTableDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "short",
  });
}
