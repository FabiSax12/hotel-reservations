export const CHART_TOOLTIP_STYLES = {
  wrapper: "pointer-events-none absolute z-50 rounded-lg border border-(--border) bg-(--background) px-3 py-2 shadow-md",
  title:   "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400",
  row:     "flex items-center gap-2 text-xs",
  dot:     "size-2 rounded-full shrink-0",
  label:   "text-(--muted)",
  value:   "ml-auto font-semibold text-(--foreground)",
  divider: "my-1.5 border-t border-(--border)",
  total:   "flex items-center justify-between text-xs font-semibold text-(--foreground)",
} as const;
