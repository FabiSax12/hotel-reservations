// ─── portal-reservas – GuestsPopover Styles (local copy) ────────────────────
export const GUESTS_POPOVER_STYLES = {
  panel: (isHero: boolean, hasCalendarExpanded: boolean) =>
    `absolute left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-neutral-200 p-8 z-50 animate-in fade-in duration-300 cursor-default text-left ${(isHero && hasCalendarExpanded) ? "top-[100%] mt-6 origin-top slide-in-from-top-4" : "top-[100%] mt-4 origin-top slide-in-from-top-4"}`,
} as const;
