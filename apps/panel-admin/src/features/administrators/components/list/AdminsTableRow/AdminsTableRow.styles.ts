export const ADMINS_TABLE_ROW_STYLES = {
  // Base card row
  row:
    "flex items-center px-5 py-3.5 rounded-xl bg-white/95 shadow-sm " +
    "hover:scale-[1.015] hover:shadow-xl hover:bg-white " +
    "transition-all duration-200 cursor-default select-none",

  // Session user — emerald tint
  rowSession:
    "flex items-center px-5 py-3.5 rounded-xl bg-emerald-50 border border-emerald-100 shadow-sm " +
    "hover:scale-[1.015] hover:shadow-xl hover:bg-emerald-50/90 " +
    "transition-all duration-200 cursor-default select-none",

  // Email column content
  emailCol:   "flex-1 min-w-0 flex items-center gap-3",
  emailInner: "flex items-center gap-2 min-w-0",
  emailText:  "text-sm font-medium text-gray-900 truncate",

  // Status column
  statusCol: "w-36 shrink-0",

  // Date column — tabular-nums for clean alignment
  dateCol:  "w-44 shrink-0",
  dateText: "text-sm tabular-nums text-gray-500",
} as const;
