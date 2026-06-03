export const PROPORTIONAL_BAR_STYLES = {
  wrapper: "flex h-3 w-full overflow-hidden rounded-full",
  segment: "h-full transition-all duration-500",
} as const;

export function segmentWidthStyle(pct: number): { width: string } {
  return { width: `${pct}%` };
}
