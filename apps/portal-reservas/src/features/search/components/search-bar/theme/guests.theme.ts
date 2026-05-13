// ─── portal-reservas – GuestsPopover Styles (local copy) ────────────────────
export const GUESTS_POPOVER_STYLES = {
  panel: (isHero: boolean, hasCalendarExpanded: boolean) =>
    `absolute left-1/2 -translate-x-1/2 w-[450px] bg-forest-900 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-forest-800 p-8 z-50 animate-in fade-in duration-300 cursor-default text-left ${isHero && hasCalendarExpanded ? "top-[100%] mt-6 origin-top slide-in-from-top-4" : "top-[100%] mt-4 origin-top slide-in-from-top-4"}`,
  rowWrapper: "flex items-center justify-between py-5 border-b border-forest-800/50 last:border-0",
  labelBlock: "flex flex-col",
  title: "text-base font-bold text-stone-50",
  subtitle: "text-sm text-stone-400 font-medium",
  controlsWrapper: "flex items-center gap-4",
  stepperBtn:
    "w-10 h-10 rounded-full border-2 border-forest-700 flex items-center justify-center text-stone-300 hover:border-gold-500 hover:text-gold-500 transition-colors disabled:opacity-30 disabled:hover:border-forest-700 disabled:hover:text-stone-300 disabled:cursor-not-allowed outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]",
  stepperValue: "w-6 text-center text-lg font-bold text-stone-50",
  stepperIcon: "w-4 h-4 font-bold",
} as const;
