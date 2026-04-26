export const RESERVATIONS_TABLE_STYLES = {
  columnHeader: "text-[10px] font-bold uppercase tracking-widest text-gray-400",
} as const;

export const TABLE_CELL_STYLES = {
  guestRow:       "flex items-center gap-3",
  guestTextBlock: "min-w-0",
  textPrimary:    "text-sm font-medium text-gray-900 whitespace-nowrap",
  textSecondary:  "text-xs text-gray-500 whitespace-nowrap",
  textDefault:    "text-sm text-gray-700 whitespace-nowrap",
  textAmount:     "text-sm font-semibold text-gray-900 whitespace-nowrap",
  codeBadge:      "font-mono text-xs text-gray-700 bg-gray-100 rounded px-2 py-0.5",
} as const;
