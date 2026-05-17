export const PAGE_HEADER_STYLES = {
  layout:            "flex flex-wrap items-start justify-between gap-4",
  leftColumn:        "flex-1 min-w-0",
  title:             "text-4xl font-semibold font-serif text-gray-900 leading-tight",
  titleAccent:       "font-serif italic text-emerald-900",
  subtitle:          "mt-1 text-sm text-gray-500",
  subtitleHighlight: "font-semibold text-emerald-700",
} as const;

export const STAT_CARD_STYLES = {
  row:   "flex flex-wrap gap-3 self-start",
  card:  "min-w-[110px] rounded-xl border border-[#e9e8e1] bg-[#f6f5ef] px-4 py-3",
  label: "text-[10px] font-bold uppercase tracking-widest text-gray-400",
  value: "mt-1 text-2xl font-bold text-gray-900",
  note:  "mt-0.5 text-xs text-emerald-700",
} as const;
