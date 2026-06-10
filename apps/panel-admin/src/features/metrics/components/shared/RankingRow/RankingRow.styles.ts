export const RANKING_ROW_STYLES = {
  row:           "flex items-center gap-4 py-3",
  rankBadgeBase: "size-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold tabular-nums",
  rankBadge: {
    1: "bg-amber-100 text-amber-600 ring-1 ring-amber-400",
    2: "bg-gray-100 text-gray-500 ring-1 ring-gray-300",
    3: "bg-orange-100 text-orange-700 ring-1 ring-orange-400",
  } as Record<number, string>,
  rankBadgeDefault: "bg-gray-100 text-gray-400",
  info:          "flex-1 min-w-0",
  nameRow:       "flex items-center justify-between mb-1",
  name:          "text-sm font-medium text-gray-800 truncate",
  countRevRow:   "flex items-center justify-between mt-1",
  count:         "text-xs text-gray-400 tabular-nums",
  revenue:       "text-xs font-semibold tabular-nums text-gray-600",
} as const;
