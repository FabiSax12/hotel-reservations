export const ADMINS_TABLE_STYLES = {
  root:    "w-full bg-transparent shadow-none rounded-none",
  scroll:  "overflow-x-auto w-full",
  content: "w-full min-w-full border-collapse",
  thead:   "border-b border-gray-200 !bg-transparent",
  th:
    "px-4 py-3 text-left text-[10px] font-bold uppercase " +
    "tracking-widest text-gray-400 whitespace-nowrap !bg-transparent",

  // Table.Row — `group` enables child cells to react to hover
  row:        "group border-b border-gray-100 transition-colors hover:bg-emerald-100/70",
  rowSession: "group border-b border-emerald-100 !bg-emerald-50 hover:!bg-emerald-100/70 transition-colors",

  // Table.Cell — subtle expand on hover: py-4 → py-[18px]
  cell:
    "px-4 py-4 whitespace-nowrap align-middle " +
    "group-hover:py-[18px] transition-[padding] duration-200",
} as const;
