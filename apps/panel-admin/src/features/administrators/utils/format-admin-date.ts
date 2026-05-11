/** Formats an ISO timestamp to a compact "month year" label. Example: "ene. 2024" */
export function formatMemberSince(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-CR", {
    month: "short",
    year:  "numeric",
  });
}
