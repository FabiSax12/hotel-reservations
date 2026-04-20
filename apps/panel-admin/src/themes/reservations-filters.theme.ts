// ─── Panel Admin – Reservations Filters Styles ───────────────────────────────

export const FILTER_BAR_STYLES = {
  wrapper:       "",
  bar:           "flex flex-wrap items-center gap-2",
  spacer:        "flex-1",
  rightSection:  "flex flex-wrap items-center gap-2",

  pill:          "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border border-gray-200 shadow-sm px-3 py-1.5 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:shadow-md",
  pillActive:    "border-emerald-900 bg-emerald-900 text-white font-semibold shadow-sm hover:shadow-md",
  pillInactive:  "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md",
  pillStatusDot: "h-2 w-2 flex-shrink-0 rounded-full",
  pillCount:     "text-[0.8em] tabular-nums opacity-60",

  datePanel:     "flex flex-col gap-3 p-3 sm:flex-row",

  resultsText:   "mt-2 text-sm text-gray-500",
  resultsCount:  "font-semibold text-gray-900 tabular-nums",
} as const;

// ─── Date Range Picker ────────────────────────────────────────────────────────

export const DATE_RANGE_PICKER_STYLES = {
  wrapper:          "relative",
  container:        "flex items-stretch rounded-full border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow",
  fieldBase:        "flex flex-col justify-center px-3 py-1.5 rounded-full cursor-pointer transition min-w-[110px]",
  fieldActive:      "bg-white shadow-sm",
  fieldInactive:    "hover:bg-gray-50",
  fieldFlex:        "flex-1",
  label:            "text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-0.5",
  valuePlaceholder: "text-sm font-medium text-gray-400",
  valueFilled:      "text-sm font-semibold text-gray-900",
} as const;
