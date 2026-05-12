// ─── portal-reservas – DestinationPopover Styles (local copy) ────────────

export const DESTINATION_POPOVER_STYLES = {
  panel: (positionClasses: string) =>
    `absolute left-0 w-[400px] bg-forest-900 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-forest-800 p-6 z-50 animate-in fade-in duration-300 cursor-default text-left ${positionClasses} origin-top slide-in-from-top-4`,
  panelTitle: "text-sm font-bold text-stone-50 mb-4 uppercase tracking-wider",
  list: "flex flex-col gap-2",
  regionBtn: (isSelected: boolean, isHovered: boolean) =>
    `flex items-center gap-4 p-3 rounded-2xl transition text-left group ${isSelected ? "bg-forest-800 scale-[0.98]" : isHovered ? "bg-forest-800/50" : "hover:bg-forest-800/50"}`,
  regionIcon: (isSelected: boolean, isHovered: boolean) =>
    `w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors shadow-sm ${isSelected ? "bg-gold-500/20" : isHovered ? "bg-forest-800" : "bg-forest-900 group-hover:bg-forest-800"}`,
  regionName: (isSelected: boolean) =>
    `text-lg font-bold transition-colors ${isSelected ? "text-gold-500" : "text-stone-50"}`,
  regionDesc: "text-sm text-stone-400",
  regionArrow: (isActive: boolean) =>
    `w-5 h-5 transition-transform ${isActive ? "text-gold-500 translate-x-1" : "text-stone-500 group-hover:text-gold-400 group-hover:translate-x-1"}`,
  /** Flex-grow wrapper around the region name + description text */
  regionTextWrapper: "flex-1",
  previewPanel: (isHero: boolean, positionClasses: string) =>
    `absolute left-[416px] ${isHero ? "right-0" : "w-[650px] right-auto"} bg-forest-900 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-forest-800 overflow-hidden z-50 animate-in fade-in slide-in-from-left-2 duration-200 ease-out flex flex-row text-left ${positionClasses}`,
  previewImageCol: "w-[45%] relative shrink-0 bg-forest-800 flex flex-col",
  previewImageBg: "absolute inset-0 bg-cover bg-center",
  previewImageGrad:
    "absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-900/20 to-transparent",
  previewPriceBlock: "absolute bottom-5 left-5 right-5 text-stone-50 z-10",
  previewFromLabel: "text-[10px] font-black uppercase tracking-widest mb-0.5 text-gold-500",
  previewPrice: "text-2xl font-black text-stone-50",
  previewPriceUnit: "text-xs font-medium text-stone-300 opacity-80",
  previewInfoCol: "w-[55%] p-6 md:p-8 flex flex-col justify-center bg-forest-900 relative z-20",
  previewTitle: "text-[26px] font-black font-serif text-stone-50 mb-5 tracking-tight leading-none",
  previewHighlights: "flex flex-col gap-3",
  previewHighlightItem: "flex items-center gap-3 text-sm font-bold text-stone-300",
  previewHighlightDot:
    "w-6 h-6 rounded-full bg-forest-800 flex items-center justify-center flex-shrink-0 shadow-sm border border-forest-700",
  previewHighlightIcon: "w-3.5 h-3.5 text-gold-500 font-bold",
  /** Inline text of a single highlight bullet */
  highlightText: "leading-snug",
  popover:
    "absolute top-[100%] mt-4 left-0 w-[420px] bg-forest-900 rounded-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-forest-800 z-50 p-3 animate-in fade-in slide-in-from-top-4 duration-300",
  regionLabel:
    "px-4 pt-4 pb-2 text-xs font-bold text-stone-400 uppercase tracking-widest",
  grid: "grid grid-cols-2 gap-2 mt-1",
  itemWrapper:
    "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-forest-800",
  itemWrapperSelected: "bg-forest-800",
  iconWrapper:
    "w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center flex-shrink-0 text-stone-300 transition-colors",
  iconWrapperSelected: "bg-gold-500 text-forest-950",
  itemText: "text-sm font-bold text-stone-300 transition-colors",
  itemTextSelected: "text-stone-50",

  icons: {
    arrow: {
      viewBox: "0 0 24 24",
      strokeWidth: 3,
      path: "M9 5l7 7-7 7",
    },
    mapPin: {
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      path: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
    },
    check: {
      viewBox: "0 0 24 24",
      strokeWidth: 3,
      path: "M5 13l4 4L19 7",
    },
  },

  layout: {
    previewHeight: "260px",
    previewWidth: "650px",
    panelWidth: "400px",
    previewOffset: "416px",
  },
} as const;

export const getDestinationPositionClass = (isHero: boolean, hasCalendarExpanded: boolean) =>
  isHero && hasCalendarExpanded ? "top-[100%] mt-6" : "top-[100%] mt-4";
