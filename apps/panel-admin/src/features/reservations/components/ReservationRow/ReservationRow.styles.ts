export const RESERVATION_ROW_STYLES = {
  row: "border-b border-gray-100 transition-colors hover:bg-gray-50/50",
  rowExpanded: "border-b-0",
  cell: "px-4 py-4 whitespace-nowrap",
  guestRow: "flex items-center gap-3",
  guestTextBlock: "min-w-0",
  textPrimary: "text-sm font-medium text-gray-900 whitespace-nowrap",
  textSecondary: "text-xs text-gray-500 whitespace-nowrap",
  textDefault: "text-sm text-gray-700 whitespace-nowrap",
  textAmount: "text-sm font-semibold text-gray-900 whitespace-nowrap",

  codeChip:
    "flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full pl-2.5 pr-1.5 py-0.5 w-fit",
  codeText: "font-mono text-xs text-emerald-800 font-medium",
  copyButton:
    "text-emerald-600 hover:text-emerald-800 transition-colors p-0.5 rounded-full hover:bg-emerald-100 cursor-pointer",
  copyIcon: "size-3",

  toggleButton:
    "rounded-full border shadow-sm px-3 py-1.5 text-sm font-medium tracking-wide transition-shadow whitespace-nowrap cursor-pointer",
  toggleButtonOn:
    "bg-emerald-900 text-white border-emerald-900 hover:shadow-md",
  toggleButtonOff: "bg-white text-gray-700 border-gray-200 hover:bg-gray-100",
  toggleIcon:      "size-3.5 shrink-0",
} as const;
