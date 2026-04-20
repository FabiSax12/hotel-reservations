// ─── @hotel/ui – Stepper & GuestsPopover Styles ──────────────────────────────

export const STEPPER_STYLES = {
  row:          "flex items-center justify-between py-6 border-b border-neutral-100 last:border-0",
  titleText:    "text-lg font-bold text-neutral-900",
  subtitleText: "text-neutral-500 font-medium",
  controls:     "flex items-center gap-4",
  btnBase:      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]",
  btnEnabled:   "border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900",
  btnDisabled:  "border-neutral-200 text-neutral-300 cursor-not-allowed",
  count:        "w-6 text-center text-xl font-bold text-neutral-900",
  icon:         "w-5 h-5 font-bold",
} as const;

export const GUESTS_POPOVER_STYLES = {
  panel: (isHero: boolean, hasCalendarExpanded: boolean) =>
    `absolute left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 animate-in fade-in duration-300 cursor-default text-left ${(isHero && hasCalendarExpanded) ? "top-[100%] mt-6 origin-top slide-in-from-top-4" : "top-[100%] mt-4 origin-top slide-in-from-top-4"}`,
} as const;
