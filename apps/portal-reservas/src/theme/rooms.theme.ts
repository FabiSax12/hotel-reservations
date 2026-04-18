// ─── Portal Reservas – Rooms Feature Styles ──────────────────────────────────

export const ROOM_LIST_STYLES = {
  section:          "relative w-full max-w-5xl mx-auto px-6 py-16 mt-[180px] animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-both",
  header:           "flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-emerald-900/10",
  badge:            "text-emerald-600 font-bold tracking-widest uppercase mb-2",
  heading:          "text-4xl font-black text-emerald-950 tracking-tight",
  countBadge:       "mt-6 md:mt-0 px-4 py-2 bg-neutral-100 rounded-lg text-neutral-600 font-bold flex items-center gap-2",
  countDot:         "w-2 h-2 rounded-full bg-emerald-500 animate-pulse",
  grid:             "flex flex-col gap-10",
} as const;

export const ROOM_CARD_STYLES = {
  card:             "group flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden border-2 border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(4,120,87,0.12)] hover:border-emerald-200 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both",
  imageWrapper:     "relative w-full lg:w-[400px] h-[300px] lg:h-auto overflow-hidden flex-shrink-0",
  image:            "absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105",
  urgencyBadge:     "absolute top-4 left-4 bg-[#7a1313] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2",
  urgencyIcon:      "w-4 h-4",
  body:             "flex flex-col flex-1 p-8 lg:pr-10",
  bodyHeader:       "flex flex-wrap justify-between items-start gap-4 mb-4",
  locationLabel:    "text-emerald-700 font-extrabold uppercase tracking-widest text-xs mb-2",
  title:            "text-3xl font-black text-neutral-900 leading-none group-hover:text-emerald-800 transition-colors",
  metaRow:          "flex items-center gap-4 mb-6",
  typeChip:         "px-3 py-1 bg-neutral-100 text-neutral-700 font-bold text-sm rounded-lg border border-neutral-200",
  sqftLabel:        "text-neutral-500 font-medium flex items-center gap-1",
  sqftIcon:         "w-5 h-5 text-neutral-400",
  description:      "text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-medium",
  priceTier:        "mt-auto flex flex-col sm:flex-row items-end sm:items-center justify-between border-t-2 border-neutral-100 pt-8 gap-6",
  priceBlock:       "flex flex-col",
  priceLabel:       "text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1",
  priceRow:         "flex items-baseline gap-2",
  priceAmount:      "text-5xl font-black text-emerald-950 tracking-tighter",
  priceCurrency:    "text-lg font-bold text-neutral-500",
  availRow:         "text-sm font-medium text-emerald-700 mt-2 flex items-center gap-1",
  availDot:         "w-2 h-2 rounded-full bg-emerald-500 opacity-60",
  selectBtn:        "w-full sm:w-auto h-16 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-lg px-8 rounded-xl shadow-[0_8px_20px_rgba(2,44,34,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2",
  selectBtnIcon:    "w-5 h-5",
} as const;
