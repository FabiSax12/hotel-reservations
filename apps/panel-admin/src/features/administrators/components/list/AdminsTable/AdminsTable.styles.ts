// Column widths — shared between floating header and card rows
export const COL_EMAIL  = "flex-1 min-w-0"        as const;
export const COL_STATUS = "w-36 shrink-0"          as const;
export const COL_DATE   = "w-44 shrink-0"          as const;

export const ADMINS_TABLE_STYLES = {
  wrapper:     "flex flex-col gap-1",
  colHeader:   "text-[10px] font-bold uppercase tracking-widest text-white/55",
  headerRow:   "flex items-center px-5 pb-1",
  cardList:    "flex flex-col gap-2",
} as const;
