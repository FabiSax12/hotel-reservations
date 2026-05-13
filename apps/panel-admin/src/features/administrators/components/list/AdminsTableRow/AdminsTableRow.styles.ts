export const ADMINS_TABLE_ROW_STYLES = {
  // group on <tr> enables group-hover on children
  row: "group border-b border-gray-100 transition-colors hover:bg-emerald-100/70",
  rowSession: "group border-b border-emerald-100 transition-colors",

  // Normal cells — subtle expand on hover
  cell:
    "px-4 py-4 whitespace-nowrap align-middle " +
    "group-hover:py-[18px] transition-[padding] duration-200",

  // Session-user cells — same expand + persistent emerald tint
  cellSession:
    "px-4 py-4 whitespace-nowrap align-middle bg-emerald-50 " +
    "group-hover:py-[18px] group-hover:bg-emerald-50/80 transition-[padding,background-color] duration-200",

  // Email cell content
  emailCell: "flex items-center gap-3",
  emailBlock: "flex min-w-0 flex-col gap-0.5",
  emailRow: "flex items-center gap-2",
  emailText: "text-sm font-medium text-gray-900 truncate",

  // Date
  dateText: "text-sm tabular-nums text-gray-600",
} as const;
