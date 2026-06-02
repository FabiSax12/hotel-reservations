// ─── Portal Reservas – Room Detail Panel Styles (US-DM-05) ───────────────────
// All Tailwind class strings for the right-docked room detail side panel and
// its sub-components. Built from the same token vocabulary as the rest of the
// rooms feature (forest / stone / gold, ease-out-expo motion, card radii) so
// the panel reads as a native extension of the portal chrome.
//
// Zero inline Tailwind in JSX. State-dependent styles are functions returning
// template literals (mirroring the search-bar / rooms theme convention).

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

export const ROOM_DETAIL_STYLES = {
  // ─── Trigger (whole card opens the panel) ─────────────────────────────────
  // Transparent overlay button covering the card surface. Sits above the
  // passive content (title, image, chips) but below the raised CTA region.
  triggerOverlay:
    "absolute inset-0 z-[1] cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500/60",
  // Applied to interactive card regions (CTA / calendar) so they stay clickable.
  triggerRaised: "relative z-[2]",

  // ─── Scrim (mobile only) ──────────────────────────────────────────────────
  scrim: (isShown: boolean) =>
    `fixed inset-0 z-[55] bg-forest-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${EASE} motion-reduce:transition-none ${
      isShown ? "opacity-100" : "opacity-0"
    }`,

  // ─── Panel Shell ──────────────────────────────────────────────────────────
  // Full-screen sheet on mobile; right-docked column under the header on desktop.
  panel: (isShown: boolean) =>
    `fixed right-0 top-0 bottom-0 z-[60] lg:top-24 lg:z-40 flex flex-col w-full lg:w-[28rem] xl:w-[32rem] bg-forest-950/95 backdrop-blur-xl border-l border-forest-800/60 shadow-[-30px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ${EASE} motion-reduce:transition-none ${
      isShown ? "translate-x-0" : "translate-x-full"
    }`,

  // Push applied to the rooms content so results reflow left when the panel opens.
  pushWrapper: (isOpen: boolean) =>
    `transition-[padding] duration-300 ${EASE} motion-reduce:transition-none ${
      isOpen ? "lg:pr-[28rem] xl:pr-[32rem]" : ""
    }`,

  // ─── Header Zone ──────────────────────────────────────────────────────────
  header:
    "flex items-start gap-4 flex-shrink-0 px-6 sm:px-7 pt-6 pb-5 border-b border-forest-800/60",
  headerText: "flex-1 min-w-0 pt-0.5",
  eyebrow:
    "flex items-center gap-2 text-gold-500 font-extrabold uppercase tracking-widest text-xs mb-2",
  eyebrowDot: "w-1.5 h-1.5 rounded-full bg-gold-500",
  title:
    "text-2xl sm:text-[1.75rem] font-serif font-normal text-stone-50 leading-tight tracking-tight text-balance",
  subtitle: "mt-1.5 text-sm text-stone-400 font-medium",
  closeBtn:
    "flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-full border border-forest-700 bg-forest-900 text-stone-400 transition-colors hover:bg-forest-800 hover:text-gold-500 hover:border-gold-500/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
  closeIcon: "w-5 h-5",

  // ─── Body Zone ────────────────────────────────────────────────────────────
  body: "flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 sm:px-7 py-6",
  bodyStack: "flex flex-col gap-7",

  // ─── Package Banner (sticky room count) ───────────────────────────────────
  packageBanner:
    "sticky top-0 z-10 -mx-6 sm:-mx-7 -mt-6 mb-1 px-6 sm:px-7 py-3 bg-forest-950/90 backdrop-blur-md border-b border-forest-800/50 flex items-center gap-2.5",
  packageBannerIcon: "w-4 h-4 text-gold-500 flex-shrink-0",
  packageBannerText: "text-sm font-semibold text-stone-200",
  packageBannerCount: "text-gold-400 font-bold",

  // ─── Room Section ─────────────────────────────────────────────────────────
  section: "flex flex-col gap-6",
  // Divider before each room beyond the first inside a package.
  sectionDivided: "flex flex-col gap-6 border-t border-forest-800/50 pt-7",
  sectionIndex:
    "flex items-center gap-2 text-gold-500/90 font-bold uppercase tracking-widest text-[11px]",
  sectionIndexDot: "w-1 h-1 rounded-full bg-gold-500/70",
  sectionRoomTitle:
    "text-xl font-serif font-normal text-stone-50 leading-tight tracking-tight",

  // ─── Media: Carousel ──────────────────────────────────────────────────────
  media: "flex flex-col gap-3",
  carouselViewport:
    "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-forest-900 border border-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950",
  carouselTrack: `flex h-full w-full transition-transform duration-500 ${EASE} motion-reduce:transition-none`,
  carouselSlide: "relative h-full w-full flex-shrink-0",
  carouselImg: "object-cover",
  carouselArrow: (side: "left" | "right") =>
    `absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-forest-950/75 backdrop-blur-sm border border-forest-800/70 text-stone-100 shadow-lg transition-all duration-200 hover:bg-forest-950 hover:text-gold-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${
      side === "left" ? "left-3" : "right-3"
    }`,
  carouselArrowIcon: "w-5 h-5",
  carouselCounter:
    "absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-forest-950/65 backdrop-blur-sm text-[11px] font-bold text-stone-100 tabular-nums",
  carouselDots:
    "absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-forest-950/55 backdrop-blur-sm",
  carouselDot: (isActive: boolean) =>
    `h-1.5 rounded-full transition-all duration-300 ${EASE} ${
      isActive ? "w-5 bg-gold-400" : "w-1.5 bg-stone-400/70 hover:bg-stone-200"
    }`,

  // ─── Media: Gallery (thumbnails) ──────────────────────────────────────────
  gallery: "flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide",
  galleryThumb: (isActive: boolean) =>
    `relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${
      isActive
        ? "border-gold-500 opacity-100"
        : "border-forest-800 opacity-60 hover:opacity-100 hover:border-forest-600"
    }`,
  galleryThumbImg: "object-cover",

  // ─── Key Info ─────────────────────────────────────────────────────────────
  keyInfo: "flex flex-col gap-5",
  chipGrid: "flex flex-wrap gap-2",
  chip: "flex items-center gap-1.5 px-3 py-1.5 bg-forest-900 text-stone-200 rounded-xl text-xs font-semibold border border-forest-800",
  chipScarce:
    "flex items-center gap-1.5 px-3 py-1.5 bg-red-900/25 text-red-300 rounded-xl text-xs font-semibold border border-red-900/50",
  chipIcon: "w-3.5 h-3.5 text-gold-500 flex-shrink-0",
  chipScarceIcon: "w-3.5 h-3.5 text-red-400 flex-shrink-0",
  bedsRow: "flex items-center gap-2 text-sm font-medium text-stone-300",
  bedsIcon: "w-4 h-4 text-gold-500/80 flex-shrink-0",

  // Editorial admin-tip pull quote (mirrors the room card's treatment).
  adminTip: "relative pl-5 pr-1",
  adminTipIcon: "absolute top-0.5 left-0 w-4 h-3.5 text-gold-600 flex-shrink-0",
  adminTipText: "text-sm italic text-stone-300 leading-relaxed font-medium",

  sectionLabel: "text-xs font-bold text-stone-400 uppercase tracking-widest mb-3",
  description: "text-sm text-stone-300 leading-relaxed",

  // ─── Amenities ────────────────────────────────────────────────────────────
  amenityList: "flex flex-col",
  amenityRow: "flex items-start gap-3 py-3 border-b border-forest-800/40 last:border-0 last:pb-0",
  amenityIconWrap:
    "flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-xl bg-forest-900 border border-forest-800 text-gold-500",
  amenityIconSvg: "w-4 h-4",
  amenityDot: "w-1.5 h-1.5 rounded-full bg-gold-500/70",
  amenityBody: "flex-1 min-w-0",
  amenityName: "text-sm font-semibold text-stone-100",
  amenityDesc: "mt-0.5 text-xs text-stone-400 leading-relaxed",

  // ─── Footer (price + CTA) ─────────────────────────────────────────────────
  footer:
    "flex-shrink-0 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-t border-forest-800/60 px-6 sm:px-7 py-5",
  priceBlock: "flex flex-col min-w-0",
  priceLabel: "text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1",
  priceRow: "flex items-baseline gap-1.5",
  priceAmount: "text-3xl font-black text-stone-50 tracking-tighter",
  priceCurrency: "text-sm font-bold text-stone-400",
  pricePlaceholder: "text-sm text-stone-500 font-medium",
  ctaWrap: "relative w-full sm:w-auto flex flex-col items-stretch sm:items-end gap-1.5",
  reserveBtn:
    "flex items-center justify-center gap-2 h-14 w-full sm:w-auto bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-base px-8 rounded-xl shadow-[0_8px_20px_rgba(202,138,4,0.3)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  reserveBtnLoader: "animate-spin w-4 h-4 text-forest-950",
  checkDatesBtn:
    "flex items-center justify-center gap-2 h-14 w-full sm:w-auto bg-transparent hover:bg-forest-800 text-stone-50 font-bold text-base px-8 rounded-xl border-2 border-forest-700 hover:border-gold-500 transition-all duration-200 active:scale-[0.98]",
  ctaIcon: "w-4 h-4 flex-shrink-0",
  unavailableLabel: "text-xs font-bold text-red-400 uppercase tracking-wider text-center sm:text-right",
  seeFreeDatesBtn:
    "text-sm font-medium text-gold-500 hover:text-gold-400 underline-offset-2 hover:underline transition-colors py-1",
} as const;
