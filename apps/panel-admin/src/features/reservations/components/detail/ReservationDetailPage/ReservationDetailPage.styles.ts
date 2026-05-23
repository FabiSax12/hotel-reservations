export const RESERVATION_DETAIL_PAGE_STYLES = {
  page: "min-h-screen bg-[#f6f5ef] p-4 sm:p-8 space-y-4",

  // Header — matches ReservationsPageHeader card style
  headerCard: "rounded-xl bg-white border border-gray-200 shadow-sm p-6",
  headerLayout: "flex flex-wrap items-start justify-between gap-4",
  headerLeft: "flex-1 min-w-0 flex flex-col",
  backLink:
    "inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors w-fit mb-3 cursor-pointer",
  backIcon: "size-3.5",
  title:
    "text-3xl font-semibold font-serif text-gray-900 leading-tight flex items-center gap-3 flex-wrap",
  codeChip:
    "self-start inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-sm font-mono font-semibold text-emerald-800",
  subtitle: "mt-2",

  // Detail cards grid
  cardsGrid: "grid grid-cols-1 md:grid-cols-3 gap-4",

  // Status footer wrapper
  footerWrapper: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden",
} as const;
