// ─── Portal Reservas – Layout Feature Styles ─────────────────────────────────
// All Tailwind class strings for Background, Header, root layout, and pages.

export const ROOT_LAYOUT_STYLES = {
  body: "min-h-screen bg-forest-950 text-stone-50 antialiased",
  grainOverlay: "grain-overlay",
} as const;

export const PAGE_STYLES = {
  main: "min-h-screen relative overflow-x-hidden selection:bg-gold-500/30 selection:text-stone-50",
  roomsWrapper: (hasSearched: boolean, heroCalendarActive: boolean) =>
    `transition-opacity duration-500 ease-in-out ${hasSearched ? "pt-48" : ""} ${heroCalendarActive ? "opacity-0 pointer-events-none" : "opacity-100"}`,
} as const;

export const BACKGROUND_STYLES = {
  wrapper: "fixed inset-0 z-[-1] overflow-hidden pointer-events-none",
  image: "absolute -inset-[2%] bg-cover bg-center",
  wash: "absolute inset-0 bg-forest-950/85 backdrop-blur-md",
  gradient: "absolute inset-0 bg-gradient-to-b from-forest-950/90 via-transparent to-transparent",
  config: {
    imageUrl:
      "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop')",
    blur: "blur(8px)",
  },
} as const;

export const HEADER_STYLES = {
  root: "fixed top-0 inset-x-0 z-50 bg-forest-950/90 backdrop-blur-xl border-b border-forest-800/60",
  inner: "w-full max-w-[1500px] mx-auto px-6 h-24 flex items-center justify-between",
  nav: "flex items-center gap-6 text-sm font-bold text-stone-300",
  helpBtn: "hover:text-gold-400 transition-colors",
  myReservationsBtn: "flex items-center gap-3 pl-6 border-l-2 border-forest-800",
  myReservationsLabel: "text-right hidden md:block",
  myReservationsText: "text-stone-100 leading-none mb-0.5",
  avatarWrapper:
    "w-10 h-10 rounded-full bg-forest-900 flex items-center justify-center border border-forest-700",
  avatarIcon: "w-5 h-5 text-gold-500",
  icons: {
    avatar: {
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
  },
  stickySearchBar:
    "w-full bg-forest-950/95 pb-6 pt-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] border-t border-forest-800 animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center px-6 backdrop-blur-xl",
  compactSearchContainer: "w-full max-w-5xl",
} as const;
