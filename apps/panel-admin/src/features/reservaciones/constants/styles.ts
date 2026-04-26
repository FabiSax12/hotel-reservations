export const PAGE = Object.freeze({
  WRAPPER: "min-h-screen bg-gray-50 p-4 sm:p-8",
  HEADER: "mb-6",
  TITLE: "text-2xl font-semibold text-gray-900",
  DESCRIPTION: "mt-1 text-sm text-gray-500",
} as const);

export const EMPTY_STATE = Object.freeze({
  WRAPPER:
    "flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center",
  ICON: "mb-4 h-12 w-12 text-gray-300",
  TITLE: "text-base font-semibold text-gray-700",
  DESCRIPTION: "mt-1 text-sm text-gray-400",
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
