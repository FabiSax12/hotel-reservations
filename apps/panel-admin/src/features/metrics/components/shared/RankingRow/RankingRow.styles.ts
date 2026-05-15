export const RANKING_ROW_STYLES = {
  row:         "flex items-center gap-4 py-3",
  rankBadge:   "size-7 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 tabular-nums",
  info:        "flex-1 min-w-0",
  nameRow:     "flex items-center justify-between mb-1",
  name:        "text-sm font-medium text-gray-800 truncate",
  countRevRow: "flex items-center justify-between",
  count:       "text-xs text-gray-400 tabular-nums",
  revenue:     "text-xs font-semibold tabular-nums text-gray-600",
  bar:         "h-1.5 w-full overflow-hidden rounded-full bg-gray-100 mt-1",
  barFill:     "h-full rounded-full bg-emerald-500 transition-all duration-500",
} as const;
