// ─── Portal Reservas – Rooms Feature Styles ──────────────────────────────────
// All Tailwind class strings for the rooms feature (RoomList, RoomCard, and
// all sub-components). Zero inline Tailwind in JSX.

export const ROOM_LIST_STYLES = {
  section:
    "relative w-full max-w-5xl mx-auto px-6 sm:px-10 pb-20 pt-12 mt-8 mb-24 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-both",
  header:
    "flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-emerald-900/10",
  badge: "text-emerald-700 font-bold tracking-widest uppercase mb-2 text-xs",
  heading: "text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight",
  countBadge:
    "mt-6 md:mt-0 px-4 py-2 bg-emerald-50/80 rounded-xl text-emerald-800 font-bold flex items-center gap-2 text-sm border border-emerald-100",
  countDot: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0",
  grid: "flex flex-col gap-8",
} as const;

export const ROOM_CARD_STYLES = {
  // ─── Card Shell ─────────────────────────────────────────────────────────────
  card: (isUnavailable: boolean) =>
    `group relative flex flex-col lg:flex-row bg-white rounded-[2rem] border border-neutral-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${
      isUnavailable ? "opacity-50" : "opacity-100"
    }`,

  // ─── Image Panel ────────────────────────────────────────────────────────────
  imageWrapper: "relative w-full lg:w-[380px] h-[260px] lg:h-auto overflow-hidden flex-shrink-0 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]",
  image: "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]",
  urgencyBadge:
    "absolute top-4 left-4 bg-[#7a1313] text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1.5 animate-in slide-in-from-top-2",
  urgencyIcon: "w-3.5 h-3.5 flex-shrink-0",
  adminTipBadgeRemoved: "", // adminTip moved to card body pull-quote (RoomCardMeta)
  expandBtn:
    "absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-emerald-950 flex items-center justify-center shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 active:scale-95",
  expandBtnIcon: (isExpanded: boolean) =>
    `w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`,

  // ─── Body ───────────────────────────────────────────────────────────────────
  body: "flex flex-col flex-1 p-7 lg:pr-9",
  bodyHeader: "flex flex-wrap justify-between items-start gap-3 mb-3",

  // ─── Header Row ─────────────────────────────────────────────────────────────
  locationLabel: "text-emerald-700 font-extrabold uppercase tracking-widest text-xs mb-1",
  title: "text-2xl font-black text-neutral-900 leading-tight group-hover:text-emerald-800 transition-colors",
  chipRow: "flex flex-wrap items-center gap-2 mt-2",
  capacityChip:
    "flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100",
  inventoryChip: (isScarce: boolean) =>
    `flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${
      isScarce
        ? "bg-red-50 text-red-700 border-red-100"
        : "bg-neutral-50 text-neutral-600 border-neutral-100"
    }`,
  chipIcon: "w-3.5 h-3.5",

  // ─── Meta Row ───────────────────────────────────────────────────────────────
  /** Editorial pull-quote for the admin's room tip. */
  adminTipQuote: "relative my-4 pl-5 pr-2",
  adminTipQuoteIcon: "absolute top-0 left-0 w-5 h-4 text-emerald-300 flex-shrink-0",
  adminTipQuoteText:
    "text-sm italic text-emerald-800/80 leading-relaxed font-medium",
  description: "text-sm text-neutral-500 leading-relaxed max-w-[65ch] line-clamp-3",

  // ─── Expansion Panel ────────────────────────────────────────────────────────
  expansionGrid: "grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
  expansionGridOpen: "grid-rows-[1fr]",
  expansionGridClosed: "grid-rows-[0fr]",
  expansionInner: "overflow-hidden",
  expansionContent: "pt-6 pb-2 border-t border-neutral-100 mt-4",
  galleryStrip: "flex gap-3 overflow-x-auto pb-2 scrollbar-hide",
  galleryImage: "w-36 h-24 rounded-xl object-cover flex-shrink-0 bg-neutral-100",
  galleryImg: "w-full h-full object-cover rounded-xl",
  fullDescription: "mt-4 text-sm text-neutral-600 leading-relaxed",
  amenitiesTitle: "mt-4 mb-2 text-xs font-bold text-neutral-500 uppercase tracking-widest",
  amenityList: "flex flex-wrap gap-2",
  amenityTag:
    "px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-100",

  // ─── Price Tier ─────────────────────────────────────────────────────────────
  priceTier: "mt-auto flex flex-col sm:flex-row items-end sm:items-center justify-between pt-6 gap-4",
  priceBlock: "flex flex-col",
  priceLabel: "text-xs font-bold text-neutral-400 uppercase tracking-wider mb-0.5",
  priceRow: "flex items-baseline gap-1.5",
  priceAmount: "text-4xl font-black text-emerald-950 tracking-tighter",
  priceCurrency: "text-sm font-bold text-neutral-400",
  availRow: "text-xs font-medium text-emerald-700 mt-1.5 flex items-center gap-1.5",
  availDot: "w-1.5 h-1.5 rounded-full bg-emerald-500",

  // ─── CTA Buttons ────────────────────────────────────────────────────────────
  ctaWrapper: "flex flex-col items-stretch sm:items-end gap-2 min-w-[180px]",
  reserveBtn:
    "flex items-center justify-center gap-2 h-14 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-base px-8 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  reserveBtnLoader: "animate-spin w-4 h-4 text-white",
  checkDatesBtn:
    "flex items-center justify-center gap-2 h-14 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-base px-8 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-200 active:scale-[0.98]",
  seeFreeDatesBtn:
    "text-sm font-medium text-emerald-700 hover:text-emerald-900 underline-offset-2 hover:underline transition-colors py-2",
  unavailableLabel: "text-xs font-bold text-red-600 uppercase tracking-wider",

  // ─── Room Availability Calendar (inline popover below CTA button) ────────────
  availCalWrapper:
    "absolute z-[9999] bottom-full mb-3 right-0 bg-white rounded-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-100 p-2 sm:p-5 animate-in fade-in slide-in-from-bottom-3 duration-200 w-[95vw] sm:w-[650px] max-w-full",
  availCalHeader: "flex items-center justify-between mb-4",
  availCalTitle: "text-sm font-bold text-emerald-950 uppercase tracking-wider",
  availCalClose:
    "w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors",
  availCalGrid: "grid grid-cols-7 gap-0.5",
  availCalDayHeader: "text-center text-[10px] font-bold text-neutral-400 uppercase py-1",
  availCalDay: (isAvailable: boolean, isSelected: boolean, isPast: boolean) =>
    [
      "h-9 w-full rounded-lg text-xs font-medium flex items-center justify-center transition-all duration-150",
      isPast ? "text-neutral-200 cursor-not-allowed" :
      isSelected ? "bg-emerald-950 text-white font-bold shadow-sm" :
      isAvailable
        ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer font-semibold"
        : "text-neutral-300 opacity-40 cursor-not-allowed",
    ].join(" "),
  availCalDot: "w-1 h-1 rounded-full bg-emerald-500 mx-auto -mt-0.5",
  availCalMonthNav: "flex items-center justify-between mb-4",
  availCalMonthLabel: "text-sm font-bold text-neutral-800",
  availCalNavBtn:
    "w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors",
  availCalLegend: "flex gap-4 mt-4 pt-3 border-t border-neutral-100",
  availCalLegendItem: "flex items-center gap-1.5 text-[10px] text-neutral-500",
  availCalLegendDot: (type: "available" | "booked") =>
    `w-3 h-3 rounded-sm ${type === "available" ? "bg-emerald-100 border border-emerald-300" : "bg-neutral-100"}`,
  dialogGrid: "grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
  dialogGridOpen: "grid-rows-[1fr]",
  dialogGridClosed: "grid-rows-[0fr]",
  dialogInner: "overflow-hidden",
  dialogContent:
    "mt-4 pt-6 pb-2 border-t border-neutral-100 bg-emerald-50/40 rounded-2xl px-5 py-5",
  dialogTitle: "text-sm font-bold text-emerald-950 mb-4 uppercase tracking-wider",
  dialogActions: "mt-4 flex justify-end gap-3",
  dialogConfirmBtn:
    "h-11 px-6 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-colors active:scale-[0.98]",
  dialogCancelBtn:
    "h-11 px-5 bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-sm rounded-xl border border-neutral-200 transition-colors",
  guestRow: "flex items-center justify-between py-3 border-b border-emerald-100/50 last:border-0",
  guestLabel: "text-sm font-medium text-emerald-950",
  guestSub: "text-xs text-neutral-400 mt-0.5",
  guestStepper: "flex items-center gap-3",
  guestStepBtn:
    "w-8 h-8 rounded-full bg-white border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50 text-neutral-700 font-bold flex items-center justify-center transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed",
  guestCount: "w-6 text-center font-black text-emerald-950 text-sm",
} as const;
