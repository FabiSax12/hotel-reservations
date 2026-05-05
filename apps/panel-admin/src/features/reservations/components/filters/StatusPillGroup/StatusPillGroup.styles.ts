export const STATUS_PILL_GROUP_STYLES = {
  leftSection:  "flex flex-wrap items-center gap-2",
  pill:         "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border border-gray-200 shadow-sm px-3 py-1.5 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:shadow-md",
  pillActive:   "border-emerald-900 bg-emerald-900 text-white font-semibold shadow-sm hover:shadow-md",
  pillInactive: "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md",
  pillCount:    "text-[0.8em] tabular-nums opacity-60",
} as const;
