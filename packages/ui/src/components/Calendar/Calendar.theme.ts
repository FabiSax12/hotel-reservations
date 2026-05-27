/**
 * @file Calendar.theme.ts — Component-specific styles for the Calendar.
 */

export const CALENDAR_STYLES = Object.freeze({
  wrapper: (isHero: boolean) =>
    isHero
      ? "w-full max-w-[1150px] bg-forest-900 rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.4)] relative z-10"
      : "w-[650px] absolute top-[100%] mt-4 left-1/2 -translate-x-1/2 bg-forest-900 rounded-[2.1rem] shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-forest-800 z-50 animate-in fade-in slide-in-from-top-4 duration-300",
  inlineWrapper: (isHero: boolean) =>
    isHero
      ? "w-full max-w-[1150px] bg-forest-900 rounded-[2.25rem] border border-forest-800/70"
      : "w-full min-w-[640px] bg-forest-900 rounded-[2rem] border border-forest-800 shadow-[0_18px_45px_rgba(0,0,0,0.4)]",

  frame: (isHero: boolean) => `flex ${isHero ? "items-start" : "items-start"}`,
  padding: (isHero: boolean) => (isHero ? "p-8 gap-10" : "p-4 gap-4"),
  customWrapper: "w-full",
  bottomContentWrapper: "w-full mt-4 pt-4 border-t border-neutral-100",

  monthCol: (isHero: boolean) => (isHero ? "flex-1 min-w-0" : "w-[302px] flex-none"),
  monthHeader: (isHero: boolean) =>
    isHero ? "flex items-center justify-between mb-6" : "flex items-center justify-between mb-4",
  navBtn:
    "p-1.5 rounded-full hover:bg-forest-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-stone-300",
  /** Invisible spacer that occupies the same space as a navBtn on the opposite side */
  navSpacer: "w-8",
  monthTitle: (isHero: boolean) => `${isHero ? "text-2xl" : "text-xl"} font-bold text-stone-50`,

  daysHeader: (isHero: boolean) =>
    `grid grid-cols-7 text-center font-bold ${isHero ? "gap-y-4 gap-x-2 mb-4 text-sm uppercase tracking-widest text-stone-400" : "gap-y-2 gap-x-1 mb-2 text-[11px] uppercase tracking-widest text-stone-400"}`,

  daysGrid: (isHero: boolean) =>
    `grid grid-cols-7 text-center ${isHero ? "gap-y-2" : "gap-y-1 auto-rows-[2.5rem]"}`,

  dayBtn: (
    isHero: boolean,
    isPast: boolean,
    isStart: boolean,
    isEnd: boolean,
    hasRange: boolean,
    isSelected: boolean,
    isToday: boolean,
    isHovered: boolean,
  ) =>
    [
      "group relative flex items-center justify-center w-full mx-auto px-0.5",
      isHero ? "h-14 text-xl" : "h-10 text-base",
      "font-bold transition-colors duration-150 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]",
      isPast ? "opacity-30 cursor-not-allowed pointer-events-none text-stone-600" : "",
      hasRange && isSelected && !isStart && !isEnd
        ? "text-forest-950 font-extrabold bg-gold-500/20"
        : !isPast
          ? "text-stone-200"
          : "",
      hasRange && (isStart || isEnd) ? "text-forest-950 z-10" : "",
      isToday && !isSelected ? "underline decoration-gold-500 decoration-4 underline-offset-4" : "",
      isHovered ? "!z-50" : "",
      hasRange && isStart && !isEnd
        ? "bg-[linear-gradient(to_right,transparent_50%,rgba(202,138,4,0.2)_50%)]"
        : "",
      hasRange && isEnd && !isStart
        ? "bg-[linear-gradient(to_left,transparent_50%,rgba(202,138,4,0.2)_50%)]"
        : "",
    ]
      .filter(Boolean)
      .join(" "),

  hoverRing:
    "absolute h-[85%] aspect-square rounded-full bg-transparent group-hover:bg-forest-800/80 transition-colors pointer-events-none",
  selectedStart: (isActive: boolean) =>
    `absolute h-[85%] aspect-square rounded-full z-10 shadow-sm transition-[background-color,box-shadow] duration-150 ring-2 ring-offset-1 ${isActive ? "bg-gold-500 ring-gold-500 ring-offset-forest-900" : "bg-transparent ring-transparent ring-offset-transparent"}`,
  selectedEnd: (isActive: boolean) =>
    `absolute h-[85%] aspect-square rounded-full z-10 shadow-sm transition-[background-color,box-shadow] duration-150 ring-2 ring-offset-1 ${isActive ? "bg-gold-500 ring-gold-500 ring-offset-forest-900" : "bg-transparent ring-transparent ring-offset-transparent"}`,

  invalidDot: (isFading: boolean) =>
    `absolute h-[85%] aspect-square bg-red-900/50 border border-red-500/50 rounded-full z-20 shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all ease-in-out ${isFading ? "opacity-0 duration-300" : "opacity-100 animate-search-bar-shake duration-300"}`,

  tooltip: (isHero: boolean) =>
    `absolute ${isHero ? "-top-12 text-xs px-4 py-2" : "-top-9 text-[10px] px-3 py-1.5"} bg-gold-600 text-forest-950 uppercase font-black tracking-widest rounded-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xl whitespace-nowrap pointer-events-none`,
  tooltipArrow:
    "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gold-600 rotate-45 rounded-sm",

  dayNumber: (isInvalid: boolean) => `relative z-30 ${isInvalid ? "text-white" : ""}`,

  icons: {
    prev: {
      viewBox: "0 0 24 24",
      strokeWidth: 2.5,
      path: "m15 18-6-6 6-6",
    },
    next: {
      viewBox: "0 0 24 24",
      strokeWidth: 2.5,
      path: "m9 18 6-6-6-6",
    },
  },

  layout: {
    heroMaxWidth: "1150px",
    compactWidth: "650px",
  },
} as const);
