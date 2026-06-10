// ─── Portal Reservas – Checkout / Confirmation Styles (US-DM-06) ─────────────
// Tailwind class strings for the reservation confirmation + payment flow.
// Same token vocabulary as the rest of the portal (forest / stone / gold,
// serif display type, ease-out-expo motion) but at page scale: a wide, calm
// single column with more breathing room and larger type than the side panel.
//
// Zero inline Tailwind in JSX. State-dependent styles are functions.

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

export const CHECKOUT_STYLES = {
  // ─── Page shell ───────────────────────────────────────────────────────────
  page: "relative min-h-screen bg-forest-950 text-stone-200",
  pageGlow:
    "pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(202,138,4,0.10),transparent_70%)]",
  container: "relative mx-auto w-full max-w-3xl px-5 sm:px-6 pb-28 pt-2",

  // ─── Header ───────────────────────────────────────────────────────────────
  header: "sticky top-0 z-30 border-b border-forest-800/60 bg-forest-950/85 backdrop-blur-xl",
  headerInner: "mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5 sm:px-6",
  backLink:
    "inline-flex items-center gap-2 text-sm font-semibold text-stone-300 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 rounded-lg px-1 py-1",
  backIcon: "w-4 h-4",
  stepLabel: "text-[11px] font-bold uppercase tracking-widest text-gold-500",

  // ─── Intro ────────────────────────────────────────────────────────────────
  intro: "flex flex-col gap-4 pt-10 pb-2",
  packageBadge:
    "inline-flex items-center gap-2 self-start rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400",
  packageBadgeIcon: "w-3.5 h-3.5",
  title:
    "text-4xl sm:text-5xl font-serif font-normal text-stone-50 leading-[1.05] tracking-tight text-balance",
  subtitle: "max-w-xl text-base text-stone-400 leading-relaxed",

  // ─── Section scaffolding ──────────────────────────────────────────────────
  section: "mt-12 flex flex-col gap-5",
  sectionEyebrow:
    "flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold-500/90",
  sectionEyebrowDot: "w-1 h-1 rounded-full bg-gold-500/70",
  sectionTitle: "text-2xl font-serif font-normal text-stone-50 leading-tight",

  // ─── Stay meta grid ───────────────────────────────────────────────────────
  stayGrid: "grid grid-cols-2 gap-3 sm:grid-cols-4",
  stayCard: "flex flex-col gap-2 rounded-2xl border border-forest-800 bg-forest-900/60 p-4",
  stayIconWrap:
    "flex h-9 w-9 items-center justify-center rounded-xl bg-forest-950/60 text-gold-500",
  stayIcon: "w-4.5 h-4.5",
  stayLabel: "text-[11px] font-bold uppercase tracking-wider text-stone-500",
  stayValue: "text-base font-semibold text-stone-100 leading-snug",
  staySub: "text-xs text-stone-400",

  // ─── Room cards (expanded) ────────────────────────────────────────────────
  roomList: "flex flex-col gap-6",
  roomCard: "overflow-hidden rounded-3xl border border-forest-800 bg-forest-900/50",
  roomMedia: "relative aspect-[16/10] w-full sm:aspect-[2/1]",
  roomImg: "object-cover",
  // Shown when a room has no room_images rows yet (US-DM-07 / US-KA-06 uploads).
  roomImgPlaceholder: "absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-900",
  roomMediaScrim:
    "pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent",
  roomPosition:
    "absolute left-4 top-4 rounded-full bg-forest-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-400 backdrop-blur-sm",
  roomBody: "flex flex-col gap-6 p-6 sm:p-8",
  roomHead: "flex flex-col gap-2",
  roomType: "text-[11px] font-bold uppercase tracking-widest text-gold-500",
  roomTitle:
    "text-2xl sm:text-3xl font-serif font-normal text-stone-50 leading-tight tracking-tight",
  roomLocation: "flex items-center gap-1.5 text-sm font-medium text-stone-400",
  roomLocationIcon: "w-4 h-4 text-gold-500/80 flex-shrink-0",

  // Fact grid (capacity, area, beds, check-in / check-out time)
  factGrid: "grid grid-cols-2 gap-3 sm:grid-cols-3",
  factItem:
    "flex items-center gap-2.5 rounded-xl border border-forest-800 bg-forest-950/40 px-3.5 py-3",
  factIcon: "w-4.5 h-4.5 text-gold-500 flex-shrink-0",
  factText: "flex flex-col min-w-0",
  factLabel: "text-[10px] font-bold uppercase tracking-wider text-stone-500",
  factValue: "text-sm font-semibold text-stone-100 truncate",

  // About + amenities
  blockLabel: "text-xs font-bold uppercase tracking-widest text-stone-400 mb-3",
  about: "text-sm text-stone-300 leading-relaxed",
  amenityGrid: "grid grid-cols-1 gap-2.5 sm:grid-cols-2",
  amenityItem: "flex items-center gap-2.5 text-sm font-medium text-stone-200",
  amenityIcon: "w-4 h-4 text-gold-500 flex-shrink-0",

  // ─── Guest form ───────────────────────────────────────────────────────────
  formCard:
    "mt-6 flex flex-col gap-6 rounded-3xl border border-forest-800 bg-forest-900/50 p-6 sm:p-8",
  formHead: "flex flex-col gap-1.5",
  formTitle: "text-2xl font-serif font-normal text-stone-50",
  formSubtitle: "text-sm text-stone-400",
  formGrid: "grid grid-cols-1 gap-5 sm:grid-cols-2",
  fieldFull: "sm:col-span-2",

  field: "flex flex-col gap-1.5",
  fieldLabel: "text-sm font-semibold text-stone-200",
  fieldRequired: "text-gold-500",
  fieldControl: (hasError: boolean) =>
    `w-full rounded-xl border bg-forest-950/60 px-4 py-3 text-stone-100 placeholder:text-stone-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
      hasError ? "border-red-500/60" : "border-forest-700 focus:border-gold-500/50"
    }`,
  fieldTextarea: (hasError: boolean) =>
    `min-h-[104px] w-full resize-y rounded-xl border bg-forest-950/60 px-4 py-3 text-stone-100 placeholder:text-stone-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
      hasError ? "border-red-500/60" : "border-forest-700 focus:border-gold-500/50"
    }`,
  fieldError: "text-xs font-medium text-red-400",

  // Terms
  terms: "flex flex-col gap-3 sm:col-span-2",
  termsRow: "flex items-start gap-3",
  termsCheckbox:
    "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-forest-600 bg-forest-950 accent-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
  termsLabel: "text-sm text-stone-300 leading-relaxed",
  termsToggle:
    "self-start text-xs font-semibold text-gold-400 underline-offset-2 transition-colors hover:text-gold-300 hover:underline",
  termsBody:
    "rounded-xl border border-forest-800 bg-forest-950/50 p-4 text-xs leading-relaxed text-stone-400",

  // ─── Payment card ─────────────────────────────────────────────────────────
  payCard:
    "mt-8 flex flex-col gap-6 rounded-3xl border border-gold-500/20 bg-gradient-to-b from-forest-900 to-forest-900/30 p-6 sm:p-8",
  summaryTitle: "text-xs font-bold uppercase tracking-widest text-stone-400",
  priceList: "flex flex-col gap-3.5",
  priceLine: "flex items-start justify-between gap-4",
  priceLineLabel: "flex flex-col min-w-0",
  priceLineTitle: "text-sm font-semibold text-stone-100 truncate",
  priceLineSub: "text-xs text-stone-500 tabular-nums",
  priceLineAmount: "text-sm font-semibold text-stone-100 tabular-nums whitespace-nowrap",
  totalRow: "flex items-baseline justify-between gap-4 border-t border-forest-800 pt-5",
  totalLabel: "text-sm font-bold uppercase tracking-wider text-stone-300",
  totalAmount: "text-3xl font-black tracking-tight text-stone-50 tabular-nums",
  taxesNote: "text-xs text-stone-500",
  payBtn: `flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gold-600 px-8 text-base font-bold text-forest-950 shadow-[0_10px_30px_rgba(202,138,4,0.3)] transition-all duration-200 ${EASE} hover:bg-gold-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60`,
  payBtnIcon: "w-5 h-5 flex-shrink-0",
  payBtnSpinner: "animate-spin w-4 h-4 flex-shrink-0",
  secureNote: "flex items-center justify-center gap-2 text-xs text-stone-500",
  secureIcon: "w-3.5 h-3.5 text-gold-500/70 flex-shrink-0",
  payError:
    "flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm font-medium text-red-300",

  // ─── Success ──────────────────────────────────────────────────────────────
  successPage:
    "relative flex min-h-screen items-center justify-center bg-forest-950 px-5 py-16 text-stone-200",
  successCard:
    "flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-forest-800 bg-forest-900/50 p-8 text-center sm:p-10",
  successIconWrap:
    "flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400",
  successIcon: "w-8 h-8",
  successTitle: "text-3xl font-serif font-normal text-stone-50",
  successSubtitle: "text-base text-stone-400 leading-relaxed text-balance",
  successCodeBox:
    "flex w-full flex-col items-center gap-1 rounded-2xl border border-forest-800 bg-forest-950/60 py-5",
  successCodeLabel: "text-[11px] font-bold uppercase tracking-widest text-stone-500",
  successCode: "text-2xl font-black tracking-[0.25em] text-gold-400 tabular-nums",
  successBackBtn:
    "inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-forest-700 px-6 font-bold text-stone-100 transition-colors hover:border-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50",
  successBackIcon: "w-4 h-4",
} as const;
