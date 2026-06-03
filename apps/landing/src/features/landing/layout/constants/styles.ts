export const LAYOUT = Object.freeze({
  NAV_WRAPPER: "fixed top-0 left-0 right-0 z-50",
  NAV_BACKDROP: "absolute inset-0 bg-forest-950",
  NAV_BORDER: "absolute bottom-0 left-0 right-0 h-px bg-stone-100",
  NAV_INNER:
    "relative max-w-[1440px] mx-auto px-6 lg:px-16 h-[72px] flex items-center justify-between",
  NAV_LOGO:
    "font-serif text-xl tracking-[0.35em] uppercase text-stone-50 hover:text-gold-400 transition-colors duration-300",
  NAV_LINKS: "hidden lg:flex items-center gap-10",
  NAV_LINK:
    "text-xs tracking-[0.25em] uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300",
  NAV_CTA:
    "hidden lg:inline-flex items-center px-6 py-3 border border-gold-500/60 text-gold-400 text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:bg-gold-500 hover:text-forest-950 hover:border-gold-500",
  FOOTER_WRAPPER: "bg-forest-950 border-t border-forest-900",
  FOOTER_INNER: "max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-20",
  FOOTER_TOP: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12",
  FOOTER_BRAND: "flex flex-col gap-3",
  FOOTER_HOTEL_NAME: "font-serif text-2xl tracking-[0.35em] uppercase text-stone-50",
  FOOTER_TAGLINE: "text-xs tracking-[0.25em] uppercase text-stone-500",
  FOOTER_LINKS: "flex flex-wrap gap-8",
  FOOTER_LINK:
    "text-xs tracking-[0.25em] uppercase text-stone-500 hover:text-stone-300 transition-colors duration-300",
  FOOTER_BOOK:
    "text-xs tracking-[0.25em] uppercase text-gold-500 hover:text-gold-400 transition-colors duration-300 border-b border-gold-500/40 pb-0.5",
  FOOTER_BOTTOM:
    "mt-12 pt-8 border-t border-forest-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
  FOOTER_COPYRIGHT: "text-xs text-stone-700 tracking-wide",
  FOOTER_LOCATION_ROW: "flex items-center gap-2",
  FOOTER_LOCATION_DOT: "w-1.5 h-1.5 rounded-full bg-gold-500 opacity-60",
  FOOTER_LOCATION_TEXT: "text-xs text-stone-700 tracking-wide",
  FOOTER_MIDDLE:
    "mt-12 pt-8 border-t border-forest-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8",
  FOOTER_CONTACT: "flex flex-col gap-3",
  FOOTER_CONTACT_LINK:
    "flex items-center gap-2.5 text-xs text-stone-500 hover:text-stone-300 tracking-wide transition-colors duration-300",
  FOOTER_CONTACT_ICON: "w-3.5 h-3.5 text-gold-500/60 shrink-0",
  FOOTER_SOCIAL: "flex items-center gap-4",
  FOOTER_SOCIAL_LINK:
    "w-8 h-8 flex items-center justify-center text-stone-600 hover:text-gold-400 transition-colors duration-300",
  FOOTER_SOCIAL_ICON: "w-4 h-4",
  FOOTER_LEGAL: "flex flex-wrap items-center gap-6",
  FOOTER_LEGAL_LINK:
    "text-xs text-stone-700 hover:text-stone-400 tracking-wide transition-colors duration-300",
  FOOTER_LEGAL_SEPARATOR: "w-px h-3 bg-stone-800",
  MARQUEE_WRAPPER: "overflow-hidden bg-forest-950 border-y border-forest-900 py-4 select-none",
  MARQUEE_TRACK: "flex gap-10 whitespace-nowrap w-max",
  MARQUEE_SEPARATOR: "text-gold-600 text-xs shrink-0",
  MARQUEE_ITEM:
    "text-xs tracking-[0.3em] uppercase text-stone-600 font-sans shrink-0 hover:text-gold-500 transition-colors duration-300",
  SCROLL_PROGRESS: "fixed top-0 left-0 right-0 h-[2px] bg-gold-500 origin-left z-[100]",
  LOCALE_SWITCHER: "hidden lg:flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase",
  LOCALE_ACTIVE: "text-gold-400",
  LOCALE_INACTIVE:
    "text-stone-500 hover:text-stone-300 transition-colors duration-300 cursor-pointer",
  LOCALE_SEP: "text-stone-700",
} as const);
