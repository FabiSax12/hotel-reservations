export const CHECK_IN_CHECK_OUT_STYLES = {
  // Global layout matching AmenitiesForm and RoomInfoForm
  container: "w-full max-w-4xl mx-auto pb-20",
  header: "mb-16 text-center drop-shadow-2xl",
  title: "text-6xl font-black tracking-tighter text-white font-instrument-sans leading-tight",
  subtitle: "text-lg font-medium text-white/80 mt-2",

  // Inner form card
  formCard:
    "bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 border border-white shadow-[0_20px_60px_-15px_rgba(0,128,100,0.06)] transition-all flex flex-col gap-8",

  // Form group / layout
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
  section: "flex flex-col gap-4",
  sectionHeader: "flex items-center gap-3 border-b border-emerald-100 pb-3",
  sectionIconWrapper: "p-2 rounded-xl bg-emerald-500/10 text-emerald-700",
  sectionTitle: "text-xl font-bold text-slate-800",
  sectionDescription: "text-sm text-slate-500 font-medium",

  // Dropdown/Select overrides & styling
  selectInput: "w-full",

  // Custom items list / badges
  listWrapper:
    "flex flex-wrap gap-2 mt-2 min-h-[48px] p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50",
  noSelectedText: "text-sm text-slate-400 italic",
  timeBadge:
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 transition-all hover:bg-emerald-100",
  timeBadgeIcon: "text-emerald-600",

  // Loading/Hint states
  loadingContainer: "flex flex-col items-center justify-center min-h-[400px] gap-4",
  loadingText: "text-white animate-pulse font-semibold",
  hintBox:
    "p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-slate-700 flex gap-3 text-sm font-medium leading-relaxed mt-4",
  hintIcon: "text-emerald-600 shrink-0 mt-0.5",
  errorText: "text-rose-600 text-sm font-bold text-center mt-2",

  // Actions matching RoomInfoForm and AmenitiesForm
  actions: "flex justify-center items-center gap-6 mt-8",
  submitButton:
    "bg-emerald-600 text-white font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95 disabled:opacity-50 disabled:hover:scale-100",
  cancelButton:
    "bg-white text-rose-600 font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full border-2 border-rose-100 transition-all hover:bg-rose-50 hover:border-rose-200 active:scale-95",
};
