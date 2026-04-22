export const GALLERY = Object.freeze({
  SECTION: "relative bg-forest-950 py-24 lg:py-36",
  CONTAINER: "max-w-[1440px] mx-auto px-6 lg:px-16",
  HEADER: "text-center max-w-2xl mx-auto mb-16 lg:mb-24 flex flex-col items-center gap-4",
  EYEBROW: "text-xs tracking-[0.35em] uppercase text-gold-400 font-sans",
  HEADLINE: "font-serif text-[2.5rem] lg:text-[4rem] leading-[1.05] text-stone-50 font-normal",
  SUBHEADLINE: "text-stone-400 text-base lg:text-lg leading-relaxed font-light",
  STAGE: "relative h-[420px] lg:h-[480px] w-full",
  CARD_TITLE: "font-serif text-stone-50 text-xl leading-tight",
  CARD_SUBTITLE: "font-sans text-stone-300/70 text-[11px] tracking-[0.2em] uppercase mt-1.5",
  CONTROLS: "mt-10 flex items-center justify-center gap-2.5",
  DOT_ACTIVE: "w-5 h-[3px] rounded-full bg-gold-500 transition-all duration-400",
  DOT_INACTIVE: "w-[3px] h-[3px] rounded-full bg-forest-600 hover:bg-forest-500 transition-all duration-300",
} as const);
