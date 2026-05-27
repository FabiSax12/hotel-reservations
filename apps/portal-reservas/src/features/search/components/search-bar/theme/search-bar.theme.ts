// ─── portal-reservas – ModernSearchBar Styles (local copy) ─────────────────

export const SEARCH_BAR_STYLES = {
  container: "relative z-50 w-full flex flex-col items-center",

  heroCalendarFloat:
    "absolute top-full mt-6 left-0 right-0 w-full z-10 flex flex-col items-center pointer-events-none",
  heroCalendarInner: "w-full flex flex-col items-center",

  bar: (isHero: boolean) =>
    `relative flex items-stretch rounded-full border border-forest-800 shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-visible transition-colors z-50 w-full bg-forest-900${isHero ? " shadow-2xl" : ""}`,

  expandTab:
    "absolute -bottom-[26px] left-[42%] -translate-x-[50%] bg-forest-900 px-6 py-1.5 rounded-b-xl border-b border-l border-r border-forest-800 shadow-[0_6px_16px_rgba(0,0,0,0.3)] flex items-center justify-center hover:bg-forest-800 transition-colors cursor-pointer group -z-10",
  expandTabIcon:
    "w-5 h-5 text-gold-500 transition-transform duration-300 ease-out group-hover:translate-y-1 group-active:translate-y-2 group-active:scale-95",

  divider: "self-center w-[1px] h-10 bg-forest-800/80",
  dividerRelative: "self-center w-[1px] h-10 bg-forest-800/80 relative",

  sectionBase: "relative flex flex-col justify-center rounded-full cursor-pointer transition",
  sectionActive: "bg-forest-800 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]",
  sectionInactive: "hover:bg-forest-800/50",
  sectionFaded: "opacity-30",
  sectionError: "ring-2 ring-red-400/60 bg-red-900/40",
  sectionShake: "animate-search-bar-shake",

  sectionDestination: "flex-[1.2] pl-10 pr-6 flex-shrink-0",
  sectionDate: "flex-1",
  sectionGuests: "flex-[1.2] flex-shrink-0",

  sizing: {
    hero: {
      padding: "px-10 py-5",
      label: "text-sm",
      value: "text-xl",
      searchBtnPad: "px-8 py-4",
      searchBtnIcon: "w-6 h-6",
    },
    compact: {
      padding: "px-6 py-2",
      label: "text-[11px]",
      value: "text-[15px]",
      searchBtnPad: "px-6 py-2",
      searchBtnIcon: "w-5 h-5",
    },
  },

  fieldLabel: "font-extrabold tracking-widest text-stone-400 uppercase mb-0.5 pointer-events-none",
  fieldValueWrapper: "flex items-center gap-2",
  fieldValue: (hasValue: boolean) =>
    `w-full bg-transparent border-none outline-none focus:outline-none font-bold mt-0.5 truncate pointer-events-none ${hasValue ? "text-stone-50" : "text-stone-500"}`,
  fieldValueDate: "text-stone-50 font-bold truncate mt-0.5 pointer-events-none",
  fieldValueGuests: "text-stone-50 font-bold truncate mt-0.5 pointer-events-none",

  searchBtnWrapper: "flex-shrink-0 pr-4 md:pr-5 flex items-center z-10",
  searchBtn: (sizePad: string) =>
    `flex items-center justify-center bg-gold-600 hover:bg-gold-500 text-forest-950 rounded-full transition-all duration-300 font-bold shadow-[0_4px_15px_rgba(202,138,4,0.3)] hover:shadow-lg active:scale-95 ${sizePad} gap-2 whitespace-nowrap`,
  searchBtnSpinner: "animate-spin",
  searchBtnSpinnerCircle: "opacity-25",
  searchBtnSpinnerPath: "opacity-75",
  searchBtnLabel: "md:block mr-1",

  icons: {
    calendar: {
      viewBox: "0 0 24 24",
      strokeWidth: 2.5,
      path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    expand: {
      viewBox: "0 0 24 24",
      strokeWidth: 2.5,
      path: "M19 9l-7 7-7-7",
    },
    search: {
      viewBox: "0 0 24 24",
      strokeWidth: 2.5,
      path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    error: {
      viewBox: "0 0 24 24",
      strokeWidth: 2.5,
      path: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    },
    spinner: {
      viewBox: "0 0 24 24",
      circle: { cx: "12", cy: "12", r: "10", strokeWidth: "4" },
      path: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
    },
  },

  transitions: {
    heroCalendar: (hasOpened: boolean, isDimmed: boolean) => ({
      transition: `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity ${isDimmed ? "200ms ease-out" : "800ms ease 100ms"}`,
      transform: hasOpened ? "translateY(0)" : "translateY(-40px)",
      opacity: hasOpened ? (isDimmed ? 0.3 : 1) : 0,
      pointerEvents: (hasOpened && !isDimmed ? "auto" : "none") as "auto" | "none",
    }),
    expandTab: (hasOpened: boolean) => ({
      transition: "opacity 300ms ease, transform 300ms ease",
      opacity: hasOpened ? 0 : 1,
      transform: hasOpened ? "translateY(-10px)" : "translateY(0)",
      pointerEvents: (hasOpened ? "none" : "auto") as "auto" | "none",
    }),
  },

  errorTooltipWrapper:
    "absolute top-full mt-3 left-0 right-0 flex justify-center pointer-events-none z-40",
  errorTooltipPill:
    "flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 border border-gold-500/50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] " +
    "animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto",
  errorTooltipIcon: "w-4 h-4 text-gold-500 flex-shrink-0",
  errorTooltipText: "text-sm font-medium text-stone-200 whitespace-nowrap",
} as const;
