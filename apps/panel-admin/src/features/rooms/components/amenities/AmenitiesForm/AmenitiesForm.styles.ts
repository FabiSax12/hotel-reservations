import { THEME_COLORS } from "@/features/rooms/constants/info.constants";

export const AMENITIES_FORM_STYLES = {
  // Global layout matching RoomInfoForm
  container: "w-full max-w-4xl mx-auto pb-20",
  header: "mb-16 text-center drop-shadow-2xl",
  title: "text-6xl font-black tracking-tighter text-white font-instrument-sans leading-tight",
  subtitle: "hidden",

  // Inner form card
  formCard: "bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 border border-white shadow-[0_20px_60px_-15px_rgba(0,128,100,0.06)] transition-all flex flex-col gap-6",

  // Search
  searchWrapper: "relative w-full",
  searchInput: "w-full pl-11 pr-4 h-14 rounded-2xl border-2 border-white/60 bg-white/40 focus:bg-white/80 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 placeholder-slate-500 font-medium",
  searchIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700/60",

  // Grid
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4",
  
  // Custom Amenity Trigger
  customTriggerCard: "relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-emerald-900/15 bg-white/40 hover:bg-white/70 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group min-h-[120px]",
  customTriggerIconWrapper: "p-3 rounded-xl bg-emerald-500/5 text-emerald-700/60 group-hover:bg-emerald-500/10 group-hover:text-emerald-700 transition-colors duration-300",
  customTriggerText: "font-semibold text-center text-xs text-emerald-950/60 group-hover:text-emerald-950/90 transition-colors duration-300",

  // States
  loadingContainer: "flex flex-col items-center justify-center min-h-[400px] gap-4",
  loadingText: "text-white animate-pulse font-semibold",
  errorText: "text-rose-600 text-sm font-bold text-center mt-2",

  // Actions matching RoomInfoForm
  actions: "flex justify-center items-center gap-6 mt-8",
  submitButton: "bg-emerald-600 text-white font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95 disabled:opacity-50 disabled:hover:scale-100",
  cancelButton: "bg-white text-rose-600 font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full border-2 border-rose-100 transition-all hover:bg-rose-50 hover:border-rose-200 active:scale-95",
};

