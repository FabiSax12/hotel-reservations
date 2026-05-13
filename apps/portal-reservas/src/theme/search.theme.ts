// ─── Portal Reservas – Search Feature Styles ─────────────────────────────────

export const HERO_SEARCH_STYLES = {
  section: (hasLocation: boolean) =>
    `relative w-full flex flex-col items-center px-6 pb-8 transition-all duration-700 ease-in-out ${
      hasLocation ? "pt-[15vh] min-h-[40vh]" : "h-screen pt-[24vh]"
    } animate-in fade-in duration-500`,
  contentWrapper: "w-full max-w-[1150px] mx-auto flex flex-col items-center text-center z-10",
  titleBlock: "w-full flex flex-col items-center min-h-0 pointer-events-none",
  heading:
    "text-6xl md:text-8xl font-serif font-normal text-stone-50 leading-[0.9] mb-6 pt-4 pointer-events-auto",
  subtitle: "text-xl md:text-2xl text-stone-300 font-light max-w-3xl pointer-events-auto",
  searchWrapper: "w-full flex justify-center relative z-20",
  searchBarWidth: "w-full max-w-[1150px]",
  scrollIndicator: {
    container: (heroCalendarActive: boolean) =>
      `relative mt-24 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300 ease-in-out ${
        heroCalendarActive ? "opacity-0" : "opacity-100 animate-in fade-in duration-1000"
      }`,
    badge:
      "px-5 py-2 rounded-full bg-emerald-950/30 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-sm mb-4",
    iconWrapper: "flex flex-col items-center text-white/70",
    mouseIcon: "w-6 h-6 mb-1",
    arrowsWrapper: "flex flex-col items-center gap-0.5",
    arrowIcon: "w-4 h-4 animate-scroll-arrow",
  },
} as const;
