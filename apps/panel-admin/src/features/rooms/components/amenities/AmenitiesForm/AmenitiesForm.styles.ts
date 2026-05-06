import { THEME_COLORS } from "@/features/rooms/constants/info.constants";

export const AMENITIES_FORM_STYLES = {
  container: "flex flex-col gap-6 w-full max-w-3xl mx-auto p-6 md:p-8",
  header: "flex flex-col gap-1.5",
  title: "text-2xl md:text-3xl font-bold text-emerald-950 tracking-tight",
  subtitle: "text-emerald-900/70 text-base md:text-lg",
  grid: "grid grid-cols-2 sm:grid-cols-3 gap-4",
  card: (isSelected: boolean) => `
    relative flex flex-col items-center justify-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer group
    ${isSelected 
      ? "bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-900/10 scale-[1.02] text-white" 
      : "bg-white/40 backdrop-blur-md border-slate-200/50 hover:border-emerald-500/30 hover:bg-white/60 hover:shadow-sm"
    }
  `,
  iconWrapper: (isSelected: boolean) => `
    p-3 rounded-xl transition-colors duration-300
    ${isSelected ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-700 group-hover:bg-emerald-500/20"}
  `,
  amenityName: (isSelected: boolean) => `
    font-semibold text-center text-sm transition-colors duration-300
    ${isSelected ? "text-white" : "text-emerald-950/80 group-hover:text-emerald-950"}
  `,
  checkIcon: "absolute top-3 right-3 text-white/90",
  actions: "flex justify-end gap-4 mt-6 pt-6 border-t border-emerald-900/10",
  submitButton: "bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-95",
  cancelButton: "px-8 h-12 rounded-xl font-semibold text-slate-700 hover:text-slate-900 hover:bg-white/60 transition-all hover:scale-[1.02] active:scale-95",
  errorText: "text-rose-600 text-sm font-medium mt-2",
  hintBox: "bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 p-4 rounded-xl flex gap-3 items-start",
  hintText: "text-amber-950/80 text-sm leading-relaxed",
  hintIcon: "text-amber-600 shrink-0",
  searchWrapper: "relative w-full max-w-sm",
  searchInput: "w-full pl-10 pr-4 h-11 rounded-xl border border-emerald-500/10 bg-white/40 focus:bg-white/60 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-800 placeholder-slate-400",
  searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700/60",
  loadingContainer: "flex flex-col items-center justify-center min-h-[400px] gap-4",
  loadingText: "text-emerald-800 animate-pulse font-semibold",
  emptyContainer: "flex flex-col items-center justify-center py-20 bg-white/30 backdrop-blur-md rounded-3xl border border-dashed border-slate-200/50 w-full",
  emptyIcon: "text-emerald-700/30 mb-4",
  emptyText: "text-emerald-950/60 font-semibold",
};
