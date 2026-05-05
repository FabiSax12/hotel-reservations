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
} as const;
