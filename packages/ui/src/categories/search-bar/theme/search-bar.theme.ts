// ─── @hotel/ui – ModernSearchBar Styles ──────────────────────────────────────

export const SEARCH_BAR_STYLES = {
  container:  "relative z-50 w-full flex flex-col items-center",

  // Hero floating-calendar wrapper
  heroCalendarFloat: "absolute top-full mt-6 left-0 right-0 w-full z-10 flex flex-col items-center pointer-events-none",
  heroCalendarInner: "w-full flex flex-col items-center",

  // Main pill bar
  bar: (isHero: boolean) =>
    `relative flex items-stretch rounded-full border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-visible transition-colors z-50 w-full bg-white${isHero ? " shadow-2xl" : ""}`,

  // Hero expand tab (the little chevron at the bottom of the bar)
  expandTab: "absolute -bottom-[26px] left-[42%] -translate-x-[50%] bg-white px-6 py-1.5 rounded-b-xl border-b border-l border-r border-neutral-200/50 shadow-[0_6px_16px_rgba(0,0,0,0.03)] flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer group -z-10",
  expandTabIcon: "w-5 h-5 text-emerald-600 transition-transform duration-300 ease-out group-hover:translate-y-1 group-active:translate-y-2 group-active:scale-95",

  // Dividers
  divider:         "self-center w-[1px] h-10 bg-neutral-300/80",
  dividerRelative: "self-center w-[1px] h-10 bg-neutral-300/80 relative",

  // Generic section wrapper and state variants
  sectionBase:   "relative flex flex-col justify-center rounded-full cursor-pointer transition",
  sectionActive: "bg-white shadow-lg",
  sectionInactive: "hover:bg-black/5",
  sectionFaded:  "opacity-30",
  /**
   * Error ring applied to a section when validation fails — soft red
   * so it feels helpful, not alarming.
   */
  sectionError:  "ring-2 ring-red-400/60 bg-red-50/40",
  /** CSS class that triggers the shake animation (see globals.css keyframe). */
  sectionShake:  "animate-search-bar-shake",

  // Per-section layout variants
  sectionDestination: "flex-[1.2] pl-10 pr-6 flex-shrink-0",
  sectionDate:        "flex-1",
  sectionGuests:      "flex-[1.2] flex-shrink-0",

  // Sizing tokens, indexed by size variant
  sizing: {
    hero: {
      padding:       "px-10 py-5",
      label:         "text-sm",
      value:         "text-xl",
      searchBtnPad:  "px-8 py-4",
      searchBtnIcon: "w-6 h-6",
    },
    compact: {
      padding:       "px-6 py-2",
      label:         "text-[11px]",
      value:         "text-[15px]",
      searchBtnPad:  "px-6 py-2",
      searchBtnIcon: "w-5 h-5",
    },
  },

  // Field label and value
  fieldLabel: "font-extrabold tracking-widest text-neutral-800 uppercase mb-0.5 pointer-events-none",
  fieldValueWrapper: "flex items-center gap-2",
  fieldValue: (hasValue: boolean) =>
    `w-full bg-transparent border-none outline-none focus:outline-none font-bold mt-0.5 truncate pointer-events-none ${hasValue ? "text-emerald-950" : "text-neutral-400"}`,
  fieldValueDate: "text-emerald-950 font-bold truncate mt-0.5 pointer-events-none",
  fieldValueGuests: "text-emerald-950 font-bold truncate mt-0.5 pointer-events-none",

  // Search button
  searchBtnWrapper: "flex-shrink-0 pr-4 md:pr-5 flex items-center z-10",
  searchBtn: (sizePad: string) =>
    `flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white rounded-full transition-all duration-300 font-bold shadow-md hover:shadow-lg active:scale-95 ${sizePad} gap-2 whitespace-nowrap`,
  searchBtnSpinner: "animate-spin",
  searchBtnLabel: "md:block mr-1",

  // ─── Validation error tooltip ───────────────────────────────────────

  /**
   * Outer wrapper: positions the error pill below the bar.
   * `pointer-events-none` so it never blocks click-through to the bar.
   */
  errorTooltipWrapper: "absolute top-full mt-3 left-0 right-0 flex justify-center pointer-events-none z-40",

  /**
   * The pill itself: slides in from above with a soft entrance.
   * Red-50 bg + red-200 border keeps it soft and helpful.
   */
  errorTooltipPill:
    "flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 border border-red-200 shadow-md " +
    "animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto",

  /** Warning icon inside the pill. */
  errorTooltipIcon: "w-4 h-4 text-amber-500 flex-shrink-0",

  /** Error message text. */
  errorTooltipText: "text-sm font-medium text-red-700 whitespace-nowrap",
} as const;
