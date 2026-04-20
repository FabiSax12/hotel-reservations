// ─── @hotel/ui – CalendarPopover Styles ──────────────────────────────────────

export const CALENDAR_STYLES = {
  wrapper: (isHero: boolean) =>
    isHero
      ? "w-full max-w-[1150px] bg-white rounded-[3rem] shadow-[0_32px_80px_rgba(4,120,87,0.15)] relative z-10"
      : "w-[650px] absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 z-50 animate-in fade-in slide-in-from-top-4 duration-300",

  padding: (isHero: boolean) => isHero ? "p-8 gap-10" : "p-8 gap-8",

  monthCol:     "flex-1",
  monthHeader:  "flex items-center justify-between mb-6",
  navBtn:       "p-1.5 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-600",
  monthTitle: (isHero: boolean) =>
    `${isHero ? "text-2xl" : "text-lg"} font-bold text-neutral-900`,

  daysHeader: (isHero: boolean) =>
    `grid grid-cols-7 text-center font-bold ${isHero ? "gap-y-4 gap-x-2 mb-4 text-sm uppercase tracking-widest text-neutral-500" : "gap-y-4 gap-x-1 mb-2 text-xs text-neutral-400"}`,

  daysGrid: (isHero: boolean) =>
    `grid grid-cols-7 text-center ${isHero ? "gap-y-2 gap-x-2" : "gap-y-1 gap-x-1"}`,

  dayBtn: (isHero: boolean, isPast: boolean, isStart: boolean, isEnd: boolean, isSelected: boolean, isToday: boolean, isHovered: boolean) =>
    [
      "group relative flex items-center justify-center w-full",
      isHero ? "h-14 text-xl" : "aspect-square text-base",
      "font-bold transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]",
      isPast ? "opacity-30 cursor-not-allowed pointer-events-none text-neutral-300" : "",
      isSelected && !isStart && !isEnd ? "text-emerald-950 font-extrabold" : (!isPast ? "text-neutral-800" : ""),
      isStart || isEnd ? "text-white z-10" : "",
      isToday && !isSelected ? "underline decoration-emerald-500 decoration-4 underline-offset-4" : "",
      isHovered ? "!z-50" : "",
    ].filter(Boolean).join(" "),

  rangeHighlightStart: "absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-[85%] bg-emerald-100 z-0 pointer-events-none",
  rangeHighlightEnd:   "absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-[85%] bg-emerald-100 z-0 pointer-events-none",
  rangeHighlightMid:   "absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full h-[85%] bg-emerald-100 z-0 pointer-events-none",
  hoverRing:           "absolute h-[85%] aspect-square rounded-full border-2 border-transparent group-hover:border-neutral-900 transition-colors pointer-events-none",
  selectedStart:       "absolute h-[85%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 group-hover:scale-105",
  selectedEnd:         "absolute h-[85%] aspect-square bg-emerald-700 rounded-full z-10 shadow-md transition-transform active:scale-95 ring-2 ring-emerald-700 ring-offset-2 group-hover:scale-105",

  invalidDot: (isFading: boolean) =>
    `absolute h-[85%] aspect-square bg-red-500 rounded-full z-20 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all ease-in-out ${isFading ? "opacity-0 scale-90 duration-300" : "opacity-90 scale-100 animate-in zoom-in-75 duration-200"}`,

  tooltip: (isHero: boolean) =>
    `absolute ${isHero ? "-top-12 text-xs px-4 py-2" : "-top-9 text-[10px] px-3 py-1.5"} bg-emerald-950 text-white uppercase font-black tracking-widest rounded-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl whitespace-nowrap pointer-events-none`,
  tooltipArrow: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-950 rotate-45 rounded-sm",

  dayNumber: (isInvalid: boolean) => `relative z-30 ${isInvalid ? "text-white" : ""}`,
} as const;
