export const PAGE = Object.freeze({
  WRAPPER: "min-h-screen bg-[#f6f5ef] p-4 sm:p-8 space-y-4",
  HEADER: "mb-6",
  TITLE: "text-2xl font-semibold text-gray-900",
  DESCRIPTION: "mt-1 text-sm text-gray-500",
} as const);

export const CARD = Object.freeze({
  BASE: "rounded-xl bg-white border border-gray-200 shadow-sm",
  BODY: "rounded-xl bg-white border border-gray-200 shadow-sm p-6",
  BODY_SM: "rounded-xl bg-white border border-gray-200 shadow-sm p-4",
  OVERFLOW: "rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden",
} as const);

export const PAGE_HEADER = Object.freeze({
  LAYOUT: "flex flex-wrap items-start justify-between gap-4",
  LEFT: "flex-1 min-w-0",
  TITLE: "text-4xl font-semibold text-gray-900 leading-tight",
  TITLE_ACCENT: "font-serif italic text-emerald-900",
  SUBTITLE: "mt-1 text-sm text-gray-500",
  SUBTITLE_BOLD: "font-semibold text-emerald-700",
} as const);

export const STAT_CARD = Object.freeze({
  ROW: "flex flex-wrap gap-3 self-start",
  WRAPPER: "min-w-[110px] rounded-xl border border-[#e9e8e1] bg-[#f6f5ef] px-4 py-3",
  LABEL: "text-[10px] font-bold uppercase tracking-widest text-gray-400",
  VALUE: "mt-1 text-2xl font-bold text-gray-900",
  NOTE: "mt-0.5 text-xs text-emerald-700",
} as const);

export const EMPTY_STATE = Object.freeze({
  WRAPPER: "flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center",
  ICON: "mb-4 h-12 w-12 text-gray-300",
  TITLE: "text-base font-semibold text-gray-700",
  DESCRIPTION: "mt-1 text-sm text-gray-400",
} as const);

export const FILTERS = Object.freeze({
  WRAPPER: "",
  BAR: "flex flex-wrap items-center gap-2",
  SPACER: "flex-1",
  RIGHT: "flex flex-wrap items-center gap-2",
  PILL: "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
  PILL_ON: "border-emerald-900 bg-emerald-900 text-white",
  PILL_OFF: "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
  PILL_DOT: "h-2 w-2 flex-shrink-0 rounded-full",
  PILL_COUNT: "opacity-60",
  DATE_PANEL: "flex flex-col gap-3 p-3 sm:flex-row",
  RESULTS: "mt-2 text-sm text-gray-500",
  RESULTS_COUNT: "font-semibold text-gray-900",
} as const);

export const CELL = Object.freeze({
  GUEST_WRAPPER: "flex items-center gap-3",
  GUEST_TEXT_WRAPPER: "min-w-0",
  TEXT_PRIMARY: "text-sm font-medium text-gray-900 whitespace-nowrap",
  TEXT_SECONDARY: "text-xs text-gray-500 whitespace-nowrap",
  TEXT_DEFAULT: "text-sm text-gray-700 whitespace-nowrap",
  TEXT_AMOUNT: "text-sm font-semibold text-gray-900 whitespace-nowrap",
  CODE_BADGE: "font-mono text-xs text-gray-700 bg-gray-100 rounded px-2 py-0.5",
} as const);
