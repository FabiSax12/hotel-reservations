/** Formats an ISO date string (YYYY-MM-DD) for table cells. Example: "12 ene." */
export function formatTableDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "short",
  });
}

/** Formats an ISO date string (YYYY-MM-DD) for detail views. Example: "20 may" */
export function formatDetailDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day)
    .toLocaleDateString("es-CR", { day: "numeric", month: "short" })
    .replace(/\.$/, "");
}

/** Returns today's date in YYYY-MM-DD format. */
export function getTodayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}
