export const ADMINS_STAT_CARD_STYLES = {
  card:           "min-w-[110px] rounded-xl border px-4 py-3 transition-colors",
  cardDefault:    "border-[#e9e8e1] bg-[#f6f5ef]",
  cardSuccess:    "border-emerald-200 bg-emerald-50/60",
  cardDanger:     "border-red-200 bg-red-50/50",

  label:          "text-[10px] font-bold uppercase tracking-widest text-gray-400",

  value:          "mt-1 text-2xl font-bold tabular-nums",
  valueDefault:   "text-gray-900",
  valueSuccess:   "text-emerald-700",
  valueDanger:    "text-red-600",

  caption:        "mt-0.5 text-xs text-gray-500",
} as const;
