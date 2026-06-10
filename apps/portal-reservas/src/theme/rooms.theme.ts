// ─── Portal Reservas – Rooms Feature Styles ──────────────────────────────────
// All Tailwind class strings for the rooms feature (RoomList, RoomCard, and
// all sub-components). Zero inline Tailwind in JSX.

export const ROOM_LIST_STYLES = {
  section:
    "relative w-full max-w-5xl mx-auto px-6 sm:px-10 pb-20 pt-12 mt-8 mb-24 bg-forest-950/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-forest-800/40 animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-both",
  header:
    "flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 pb-6 border-b border-forest-800/40",
  badge: "text-gold-500 font-bold tracking-widest uppercase mb-2 text-xs",
  heading: "text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight",
  countBadge: "md:mt-0 text-sm text-stone-400 font-medium",
  countValue: "font-semibold text-stone-50",
  searchingText: "animate-pulse",
  grid: "flex flex-col gap-8",
} as const;

export const ROOM_CARD_STYLES = {
  // ─── Card Shell ─────────────────────────────────────────────────────────────
  // Fixed height on desktop for consistent card dimensions across rooms and packages
  card: (isUnavailable: boolean) =>
    `group relative flex flex-col lg:flex-row lg:h-[420px] bg-forest-900 rounded-[2rem] border border-forest-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${
      isUnavailable ? "opacity-50" : "opacity-100"
    }`,
  cardHoverGlow:
    "pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent shadow-none transition-[border-color,box-shadow] duration-500 group-hover:border-gold-500/30 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
  // ─── Detail Trigger (US-DM-05) ──────────────────────────────────────────────
  // Transparent button covering the card; sits above passive content (title,
  // image, chips) but below the raised CTA so the CTA stays clickable.
  triggerOverlay:
    "absolute inset-0 z-[1] cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500/60",
  // Applied to interactive regions (CTA / calendar) so they stay above the overlay.
  triggerRaised: "relative z-[2]",
  // Highlight on the card whose detail panel is currently open.
  cardActive: "ring-2 ring-gold-500/50 ring-offset-2 ring-offset-forest-950",
  skeletonCard:
    "relative flex flex-col lg:flex-row bg-forest-900 rounded-[2rem] border border-forest-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-in fade-in duration-500",
  skeletonImagePanel: "bg-forest-800/80 animate-pulse",
  skeletonChipsWrapper: "flex gap-2",
  skeletonLabel: "w-24 h-3 bg-forest-800/80 animate-pulse rounded-md mb-2",
  skeletonTitle: "w-56 h-8 bg-forest-800/80 animate-pulse rounded-lg mt-1",
  skeletonChip: "w-16 h-6 bg-forest-800/80 animate-pulse rounded-lg",
  skeletonDescWrapper: "my-6",
  skeletonDescLine1: "w-full h-4 bg-forest-800/50 animate-pulse rounded-md mb-2",
  skeletonDescLine2: "w-[90%] h-4 bg-forest-800/50 animate-pulse rounded-md mb-2",
  skeletonDescLine3: "w-[70%] h-4 bg-forest-800/50 animate-pulse rounded-md",
  skeletonPriceLabel: "w-32 h-3 bg-forest-800/80 animate-pulse rounded-md mb-1.5",
  skeletonPriceAmount: "w-40 h-10 bg-forest-800/80 animate-pulse rounded-lg mt-1",
  skeletonCTABtn: "w-44 h-14 bg-forest-800/80 animate-pulse rounded-xl",

  // ─── Image Panel ────────────────────────────────────────────────────────────
  // Fixed width on desktop, fills parent height
  imageWrapper:
    "relative w-full lg:w-[380px] h-[260px] lg:h-full overflow-hidden flex-shrink-0 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]",
  image:
    "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]",
  // Shown when a room has no room_images rows yet (US-DM-07 / US-KA-06 uploads).
  imagePlaceholder: "absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-900",
  urgencyBadge:
    "absolute top-4 left-4 bg-red-900/90 backdrop-blur-sm text-stone-50 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1.5 animate-in slide-in-from-top-2",
  urgencyIcon: "w-3.5 h-3.5 flex-shrink-0 text-red-400",
  inventoryBadge:
    "absolute top-4 left-4 bg-forest-950/80 backdrop-blur-sm text-stone-200 px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5",
  capacityBadge:
    "absolute top-4 right-4 bg-forest-950/80 backdrop-blur-sm text-stone-200 px-2.5 py-1.5 rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5",
  capacityBadgeIcon: "w-3.5 h-3.5 text-gold-500",
  expandBtn:
    "absolute bottom-4 right-4 w-10 h-10 rounded-full bg-forest-950/80 backdrop-blur-sm text-stone-50 flex items-center justify-center shadow-sm hover:bg-forest-950 hover:shadow-md hover:text-gold-500 transition-all duration-200 active:scale-95 border border-forest-800",
  expandBtnIcon: (isExpanded: boolean) =>
    `w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180 scale-95" : "rotate-0"}`,

  // ─── Body ───────────────────────────────────────────────────────────────────
  // Fills parent height with overflow hidden for consistent card dimensions
  body: "flex flex-col flex-1 h-full overflow-hidden p-7 lg:pr-9",
  bodyHeader: "flex flex-wrap justify-between items-start gap-3 mb-3",

  // ─── Header Row ─────────────────────────────────────────────────────────────
  locationLabel: "text-gold-500 font-extrabold uppercase tracking-widest text-xs mb-1",
  title:
    "text-2xl font-serif font-normal text-stone-50 leading-tight group-hover:text-gold-400 transition-colors",
  chipRow: "flex flex-wrap items-center gap-2 mt-2",
  capacityChip:
    "flex items-center gap-1 px-2.5 py-1 bg-forest-800/50 text-stone-300 rounded-lg text-xs font-bold border border-forest-700",
  inventoryChip: (isScarce: boolean) =>
    `flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${
      isScarce
        ? "bg-red-900/30 text-red-400 border-red-900/50"
        : "bg-forest-800/30 text-stone-400 border-forest-800"
    }`,
  chipIcon: "w-3.5 h-3.5 text-gold-500",

  // ─── Amenity Chips ─────────────────────────────────────────────────────────
  amenityChipRow: "flex flex-wrap items-center gap-2 mt-3",
  amenityChip:
    "flex items-center gap-1.5 px-2.5 py-1 bg-forest-800/50 text-stone-300 rounded-lg text-xs font-medium border border-forest-700/50",
  amenityChipIcon: "w-3.5 h-3.5 text-gold-500/70",
  amenityChipMore:
    "flex items-center gap-1.5 px-2.5 py-1 bg-forest-800/30 text-gold-500 rounded-lg text-xs font-bold border border-gold-500/30 hover:bg-forest-800/50 hover:border-gold-500/50 transition-colors cursor-pointer",

  // ─── Meta Row ───────────────────────────────────────────────────────────────
  adminTipQuote: "relative my-4 pl-5 pr-2",
  adminTipQuoteIcon: "absolute top-0 left-0 w-5 h-4 text-gold-600 flex-shrink-0",
  adminTipQuoteText: "text-sm italic text-stone-300 leading-relaxed font-medium",
  description: "text-sm text-stone-400 leading-relaxed max-w-[65ch] line-clamp-3",

  // ─── Price Tier ─────────────────────────────────────────────────────────────
  priceTier:
    "mt-auto flex w-full flex-col sm:flex-row items-end sm:items-center justify-between pt-6 gap-4",
  priceBlock: "flex flex-col",
  priceLabel: "text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5",
  priceRow: "flex items-baseline gap-1.5",
  priceAmount: "text-4xl font-black text-stone-50 tracking-tighter",
  priceCurrency: "text-sm font-bold text-stone-400",
  availRow: "text-xs font-medium text-gold-500 mt-1.5 flex items-center gap-1.5",
  availDot: "w-1.5 h-1.5 rounded-full bg-gold-400",

  // ─── CTA Buttons ────────────────────────────────────────────────────────────
  ctaWrapper: "ml-auto flex flex-col items-end gap-2 min-w-[180px] self-end",
  ctaWrapperRelative: "ml-auto flex flex-col items-end gap-2 min-w-[180px] self-end relative",
  ctaBtnCalendarIcon: "w-4 h-4 flex-shrink-0",
  ctaBtnArrowIcon: "w-4 h-4 flex-shrink-0",
  ctaSpinnerCircle: "opacity-25",
  ctaSpinnerPath: "opacity-75",
  reserveBtn:
    "flex items-center justify-center gap-2 h-14 bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-base px-8 rounded-xl shadow-[0_8px_20px_rgba(202,138,4,0.3)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  reserveBtnLoader: "animate-spin w-4 h-4 text-forest-950",
  checkDatesBtn:
    "flex items-center justify-center gap-2 h-14 bg-transparent hover:bg-forest-800 text-stone-50 font-bold text-base px-8 rounded-xl border-2 border-forest-700 hover:border-gold-500 transition-all duration-200 active:scale-[0.98]",
  seeFreeDatesBtn:
    "text-sm font-medium text-gold-500 hover:text-gold-400 underline-offset-2 hover:underline transition-colors py-2",
  unavailableLabel: "text-xs font-bold text-red-500 uppercase tracking-wider",

  // ─── Room Availability Calendar ─────────────────────────────────────────────
  availCalWrapper:
    "absolute z-[9999] bottom-full mb-3 right-0 bg-forest-950 rounded-[1.6rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-forest-800 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-3 duration-200 w-[680px] max-w-[95vw] overflow-hidden",
  availCalWrapperFixed:
    "fixed z-[9999] bg-forest-950 rounded-[1.6rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-forest-800 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-3 duration-200 w-[680px] max-w-[95vw] overflow-hidden",
  availCalInner: "w-full",
  availCalHeader: "flex items-center justify-between mb-4",
  availCalTitle: "text-sm font-bold text-stone-50 uppercase tracking-wider",
  availCalClose:
    "w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-200 hover:bg-forest-800 transition-colors",
  availCalGrid: "grid grid-cols-7 gap-0.5",
  availCalDayHeader: "text-center text-[10px] font-bold text-stone-400 uppercase py-1",
  availCalDay: (isAvailable: boolean, isSelected: boolean, isPast: boolean) =>
    [
      "h-9 w-full rounded-lg text-xs font-medium flex items-center justify-center transition-all duration-150",
      isPast
        ? "text-stone-600 cursor-not-allowed"
        : isSelected
          ? "bg-gold-500 text-forest-950 font-bold shadow-sm"
          : isAvailable
            ? "bg-forest-900 text-stone-200 hover:bg-forest-800 cursor-pointer font-semibold border border-transparent hover:border-gold-500/30"
            : "text-stone-500 opacity-40 cursor-not-allowed",
    ].join(" "),
  availCalDot: "w-1 h-1 rounded-full bg-gold-500 mx-auto -mt-0.5",
  availCalMonthNav: "flex items-center justify-between mb-4",
  availCalMonthLabel: "text-sm font-bold text-stone-200",
  availCalNavBtn:
    "w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-200 hover:bg-forest-800 transition-colors",
  availCalLegend: "flex gap-4 mt-4 pt-3 border-t border-forest-800",
  availCalLegendItem: "flex items-center gap-1.5 text-[10px] text-stone-400",
  availCalLegendDot: (type: "available" | "booked") =>
    `w-3 h-3 rounded-sm ${type === "available" ? "bg-forest-800 border border-forest-600" : "bg-forest-900"}`,

  // ─── Dialogs ────────────────────────────────────────────────────────────────
  dialogGrid: "grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
  dialogGridOpen: "grid-rows-[1fr]",
  dialogGridClosed: "grid-rows-[0fr]",
  dialogInner: "overflow-hidden",
  dialogContent: "mt-4 pt-6 pb-2 border-t border-forest-800 bg-forest-900/50 rounded-2xl px-5 py-5",
  dialogHeader: "flex items-center justify-between mb-4",
  dialogTitle: "text-sm font-bold text-stone-50 mb-4 uppercase tracking-wider",
  dialogCloseBtn: "text-stone-400 hover:text-stone-200 transition-colors",
  dialogCloseBtnIcon: "w-4 h-4",
  dialogEmptyMsg: "text-sm text-stone-400 text-center py-4",
  dialogMonthList: "space-y-4 max-h-56 overflow-y-auto pr-1",
  dialogMonthLabel: "text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 capitalize",
  dialogDatesWrapper: "flex flex-wrap gap-2",
  dialogDateBadge:
    "px-2.5 py-1 bg-forest-800 text-gold-400 rounded-lg text-xs font-medium border border-forest-700 capitalize",
  dialogActions: "mt-4 flex justify-end gap-3",
  dialogConfirmBtn:
    "h-11 px-6 bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-sm rounded-xl transition-colors active:scale-[0.98]",
  dialogCancelBtn:
    "h-11 px-5 bg-transparent hover:bg-forest-800 text-stone-300 font-bold text-sm rounded-xl border border-forest-700 transition-colors",
  guestRow: "flex items-center justify-between py-3 border-b border-forest-800/50 last:border-0",
  guestLabel: "text-sm font-medium text-stone-50",
  guestSub: "text-xs text-stone-400 mt-0.5",
  guestStepper: "flex items-center gap-3",
  guestStepBtn:
    "w-8 h-8 rounded-full bg-forest-800 border border-forest-700 hover:border-gold-500 hover:text-gold-500 text-stone-300 font-bold flex items-center justify-center transition-colors text-sm disabled:opacity-40 disabled:hover:border-forest-700 disabled:cursor-not-allowed",
  guestCount: "w-6 text-center font-black text-stone-50 text-sm",
} as const;

// ─── Package Card Styles (US-DM-04) ─────────────────────────────────────────
// Horizontal layout matching RoomCard: image panel on left, body on right.

export const PACKAGE_CARD_STYLES = {
  // ─── Card Shell ─────────────────────────────────────────────────────────────
  // Same horizontal layout and fixed height as RoomCard
  // Top corners only — bottom corners are handled by the expand button
  card: (isUnavailable: boolean) =>
    `group relative flex flex-col lg:flex-row lg:h-[420px] bg-forest-900 rounded-t-[2rem] border border-b-0 border-forest-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${
      isUnavailable ? "opacity-50" : "opacity-100"
    }`,
  cardHoverGlow:
    "pointer-events-none absolute inset-0 rounded-t-[2rem] border border-transparent shadow-none transition-[border-color,box-shadow] duration-500 group-hover:border-gold-500/30 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
  // Highlight on the package card whose detail panel is currently open (US-DM-05).
  cardActive: "ring-2 ring-gold-500/50 ring-offset-2 ring-offset-forest-950",

  // ─── Image Panel ────────────────────────────────────────────────────────────
  // Same dimensions as RoomCard image panel, fills parent height
  imageWrapper:
    "relative w-full lg:w-[380px] h-[260px] lg:h-full overflow-hidden flex-shrink-0 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-tl-[2rem]",

  // Collage grid layouts for multiple rooms
  imageGrid2: "grid grid-cols-2 gap-[2px] h-full",
  imageGrid3: "grid grid-cols-2 grid-rows-2 gap-[2px] h-full",
  imageGrid4: "grid grid-cols-2 grid-rows-2 gap-[2px] h-full",
  imageSingle: "relative w-full h-full",
  imageCell: "relative overflow-hidden",
  image:
    "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]",
  // Shown when a room has no room_images rows yet (US-DM-07 / US-KA-06 uploads).
  imagePlaceholder: "absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-900",

  /** Room count overlay badge at bottom-right of image. */
  roomCountBadge:
    "absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-forest-950/80 backdrop-blur-sm text-stone-50 rounded-xl text-xs font-bold border border-forest-800/60",

  // ─── Body ───────────────────────────────────────────────────────────────────
  // Same body structure as RoomCard, fills parent height with overflow hidden
  body: "flex flex-col flex-1 h-full overflow-hidden p-7 lg:pr-9",
  bodyHeader: "flex flex-wrap justify-between items-start gap-3 mb-3",

  // ─── Header Row ─────────────────────────────────────────────────────────────
  // Package label replaces room title
  packageLabel: "text-gold-500 font-extrabold uppercase tracking-widest text-xs mb-1",
  title:
    "text-2xl font-serif font-normal text-stone-50 leading-tight group-hover:text-gold-400 transition-colors",
  chipRow: "flex flex-wrap items-center gap-2 mt-2",
  capacityChip:
    "flex items-center gap-1 px-2.5 py-1 bg-forest-800/50 text-stone-300 rounded-lg text-xs font-bold border border-forest-700",
  chipIcon: "w-3.5 h-3.5 text-gold-500",

  // ─── Meta Row ───────────────────────────────────────────────────────────────
  // Room tree replaces admin tip — vertical list with bed counts and amenities
  roomTree: "my-4 flex flex-col gap-2 overflow-hidden",
  roomTreeItem: "flex flex-col gap-1 py-1.5 border-b border-forest-800/40 last:border-0 last:pb-0",
  roomTreeHeader: "flex items-center justify-between gap-2",
  roomTreeTitle: "text-sm font-medium text-stone-200 truncate",
  roomTreePrice: "text-xs font-bold text-stone-400 flex-shrink-0",
  roomTreeBedRow: "flex items-center gap-1.5 text-xs text-stone-400",
  roomTreeBedIcon: "w-3.5 h-3.5 text-gold-600/70 flex-shrink-0",
  roomTreeAmenityRow: "flex flex-wrap items-center gap-2 mt-0.5",
  roomTreeAmenityTag: "flex items-center gap-1",
  roomTreeAmenityIcon: "w-3.5 h-3.5 text-gold-500/70",
  roomTreeAmenityText: "text-xs text-stone-400",
  roomTreeOverflow: "text-xs text-stone-500 italic py-1",
  roomTreeCountPrefix: "text-gold-500 font-bold",

  // ─── Price Tier ─────────────────────────────────────────────────────────────
  // Same price tier structure as RoomCard
  priceTier:
    "mt-auto flex w-full flex-col sm:flex-row items-end sm:items-center justify-between pt-6 gap-4",
  priceBlock: "flex flex-col",
  priceLabel: "text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5",
  priceRow: "flex items-baseline gap-1.5",
  priceAmount: "text-4xl font-black text-stone-50 tracking-tighter",
  priceCurrency: "text-sm font-bold text-stone-400",

  // ─── CTA Buttons ────────────────────────────────────────────────────────────
  // Same CTA structure as RoomCard
  ctaWrapper: "ml-auto flex flex-col items-end gap-2 min-w-[180px] self-end",
  ctaWrapperRelative: "ml-auto flex flex-col items-end gap-2 min-w-[180px] self-end relative",
  ctaBtnCalendarIcon: "w-4 h-4 flex-shrink-0",
  ctaBtnArrowIcon: "w-4 h-4 flex-shrink-0",
  ctaSpinnerCircle: "opacity-25",
  ctaSpinnerPath: "opacity-75",
  reserveBtn:
    "flex items-center justify-center gap-2 h-14 bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold text-base px-8 rounded-xl shadow-[0_8px_20px_rgba(202,138,4,0.3)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  reserveBtnLoader: "animate-spin w-4 h-4 text-forest-950",
  checkDatesBtn:
    "flex items-center justify-center gap-2 h-14 bg-transparent hover:bg-forest-800 text-stone-50 font-bold text-base px-8 rounded-xl border-2 border-forest-700 hover:border-gold-500 transition-all duration-200 active:scale-[0.98]",
  seeFreeDatesBtn:
    "text-sm font-medium text-gold-500 hover:text-gold-400 underline-offset-2 hover:underline transition-colors py-2",
  unavailableLabel: "text-xs font-bold text-red-500 uppercase tracking-wider",

  // ─── Expand/Collapse ────────────────────────────────────────────────────────
  // Expand toggle below the card — seamless continuation with rounded bottom
  expandBtn:
    "w-full flex items-center justify-center gap-2 py-3 bg-forest-900 hover:bg-forest-800/80 rounded-b-[2rem] border border-t-0 border-forest-800 text-sm font-medium text-stone-300 hover:text-stone-100 transition-colors cursor-pointer",
  expandIcon: (isExpanded: boolean) =>
    `text-xs transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,

  expansionGrid: (isExpanded: boolean) =>
    `grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    }`,
  expansionInner: "overflow-hidden",
  expansionContent: "px-7 pb-7 pt-2",
  expansionTitle: "text-xs font-bold text-stone-400 uppercase tracking-wider mb-4",
  expansionGridInner: "flex flex-col gap-6",
} as const;

// ─── Room Filters Bar Styles (US-DM-03) ──────────────────────────────────────
// Sort dropdown + expandable filter panel rendered above the card grid.
// Only mounted post-search (hasSearched === true).

export const ROOM_FILTERS_BAR_STYLES = {
  bar: "flex flex-col gap-3 mb-6 rounded-2xl border border-forest-800/60 bg-forest-900/50 p-4 sm:p-5",
  topRow: "flex flex-wrap items-center justify-between gap-3",
  topRowLeft: "flex items-center gap-3 flex-wrap",
  toggleBtn: (isOpen: boolean) =>
    `inline-flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-semibold transition-colors ${
      isOpen
        ? "bg-forest-800 border-gold-500/50 text-gold-400"
        : "bg-forest-900 border-forest-700 text-stone-200 hover:border-gold-500/40 hover:text-stone-50"
    }`,
  toggleIcon: (isOpen: boolean) =>
    `w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`,
  activeBadge:
    "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-xs font-bold text-gold-400 uppercase tracking-wider",
  resetBtn:
    "inline-flex items-center h-10 px-3 text-sm font-medium text-stone-300 hover:text-gold-400 transition-colors underline-offset-2 hover:underline disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline",
  sortWrapper: "flex items-center gap-2",
  sortLabel: "text-xs font-bold text-stone-400 uppercase tracking-wider hidden sm:inline",
  sortSelect:
    "h-10 px-3 rounded-xl bg-forest-900 border border-forest-700 text-sm font-semibold text-stone-100 hover:border-gold-500/40 focus:border-gold-500 focus:outline-none transition-colors cursor-pointer",
  panelGrid: (isOpen: boolean) =>
    `grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    }`,
  panelInner: "overflow-hidden",
  panelContent: "pt-5 mt-1 border-t border-forest-800/70 flex flex-col gap-6",
  groupBlock: "flex flex-col gap-2.5",
  groupTitle: "text-xs font-bold text-stone-400 uppercase tracking-wider",
  chipsRow: "flex flex-wrap gap-2",
  chip: (isSelected: boolean) =>
    `inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold border transition-colors active:scale-[0.97] ${
      isSelected
        ? "bg-gold-500/20 border-gold-500/60 text-gold-300"
        : "bg-forest-800/50 border-forest-700 text-stone-300 hover:border-gold-500/30 hover:text-stone-100"
    }`,
  rangeRow: "flex flex-col sm:flex-row items-stretch sm:items-end gap-3",
  rangeInputBlock: "flex flex-col gap-1.5 flex-1 min-w-[140px]",
  rangeInputLabel: "text-xs font-medium text-stone-400",
  rangeInput:
    "h-10 px-3 rounded-xl bg-forest-900 border border-forest-700 text-sm font-semibold text-stone-100 hover:border-gold-500/40 focus:border-gold-500 focus:outline-none transition-colors",
  rangeBounds: "text-xs text-stone-500",
  emptyState:
    "rounded-2xl border border-dashed border-forest-700 bg-forest-900/40 px-6 py-10 text-center",
  emptyTitle: "text-lg font-semibold text-stone-100",
  emptyHint: "mt-2 text-sm text-stone-400",
} as const;

// ─── Room Card Featured Badge (US-DM-03) ────────────────────────────────────
export const ROOM_CARD_FEATURED_BADGE_STYLES = {
  badge:
    "inline-flex items-center gap-1.5 h-6 px-2.5 rounded-lg bg-gold-500/20 border border-gold-500/40 text-[10px] font-bold uppercase tracking-wider text-gold-300",
  dot: "w-1.5 h-1.5 rounded-full bg-gold-400",
} as const;
