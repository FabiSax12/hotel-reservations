// ─── Portal Reservas – Search Feature Styles ─────────────────────────────────

export const HERO_SEARCH_STYLES = {
  section:
    "relative w-full h-screen flex flex-col items-center px-6 pt-[24vh] pb-8 animate-in fade-in duration-500",
  contentWrapper: "w-full max-w-[1150px] mx-auto flex flex-col items-center text-center z-10",
  titleBlock: "w-full flex flex-col items-center min-h-0 pointer-events-none",
  heading:
    "text-6xl md:text-8xl font-serif font-black text-emerald-950 tracking-tighter leading-[0.9] mb-6 pt-4 pointer-events-auto",
  subtitle: "text-xl md:text-2xl text-neutral-600 font-medium max-w-3xl pointer-events-auto",
  searchWrapper: "w-full flex justify-center relative z-20",
  searchBarWidth: "w-full max-w-[1150px]",
} as const;
