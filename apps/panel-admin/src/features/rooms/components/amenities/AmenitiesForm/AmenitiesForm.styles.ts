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

  // Grid and items
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4",
  card: (isSelected: boolean) => `
    relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
    ${isSelected 
      ? "bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-900/10 scale-[1.02] text-white" 
      : "bg-white/60 backdrop-blur-md border-white/50 hover:border-emerald-500/40 hover:bg-white/80 hover:shadow-sm text-emerald-950/80"
    }
  `,
  iconWrapper: (isSelected: boolean) => `
    p-3 rounded-xl transition-colors duration-300
    ${isSelected ? "bg-white/20 text-white" : "bg-emerald-50/80 text-emerald-700 group-hover:bg-emerald-500/10"}
  `,
  amenityName: (isSelected: boolean) => `
    font-semibold text-center text-sm transition-colors duration-300
    ${isSelected ? "text-white" : "group-hover:text-emerald-950"}
  `,
  checkIcon: "absolute top-2.5 left-2.5 text-white/90 z-10",
  
  // States
  loadingContainer: "flex flex-col items-center justify-center min-h-[400px] gap-4",
  loadingText: "text-white animate-pulse font-semibold",
  emptyContainer: "flex flex-col items-center justify-center py-16 bg-white/30 backdrop-blur-md rounded-2xl border-2 border-dashed border-emerald-900/10 w-full mt-4",
  emptyIcon: "text-emerald-700/30 mb-4",
  emptyText: "text-emerald-950/60 font-semibold",
  errorText: "text-rose-600 text-sm font-bold text-center mt-2",

  // Actions matching RoomInfoForm
  actions: "flex justify-center items-center gap-6 mt-8",
  submitButton: "bg-emerald-600 text-white font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95 disabled:opacity-50 disabled:hover:scale-100",
  cancelButton: "bg-white text-rose-600 font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full border-2 border-rose-100 transition-all hover:bg-rose-50 hover:border-rose-200 active:scale-95",

  // Custom Amenity Card Styles
  customInputCard: "relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-emerald-500 bg-white shadow-lg col-span-1 sm:col-span-2 min-h-[140px] transition-all",
  customInput: "w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-xs rounded-xl px-2.5 py-2.5 text-slate-800 placeholder-slate-400 font-medium outline-none text-center",
  customActionWrapper: "flex gap-2 w-full justify-center mt-1",
  customSaveBtn: "bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-all active:scale-90",
  customCancelBtn: "bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-lg transition-all active:scale-90",
  customTriggerCard: "relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-emerald-900/15 bg-white/40 hover:bg-white/70 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group min-h-[120px]",
  customTriggerIconWrapper: "p-3 rounded-xl bg-emerald-500/5 text-emerald-700/60 group-hover:bg-emerald-500/10 group-hover:text-emerald-700 transition-colors duration-300",
  customTriggerText: "font-semibold text-center text-xs text-emerald-950/60 group-hover:text-emerald-950/90 transition-colors duration-300",

  // Icon Picker Grid
  iconPickerGrid: "grid grid-cols-4 sm:grid-cols-8 gap-2 w-full mt-2 justify-items-center",
  iconPickerBtn: (isSelected: boolean) => `
    p-2 rounded-xl flex items-center justify-center border-2 transition-all duration-200 cursor-pointer w-9 h-9
    ${isSelected 
      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 scale-105" 
      : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    }
  `,

  // Hover actions positioned in the bottom-left corner
  customCardActions: "absolute bottom-2.5 left-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10",
  customCardActionBtn: (type: "edit" | "delete") => `
    p-1 rounded-lg transition-all active:scale-90 hover:scale-110 shadow-sm border w-6.5 h-6.5 flex items-center justify-center
    ${type === "edit" 
      ? "bg-white text-emerald-600 hover:bg-emerald-50 border-slate-100" 
      : "bg-white text-rose-600 hover:bg-rose-50 border-slate-100"
    }
  `,

  // 3D Card Flip Animation System
  flipWrapper: "relative w-full min-h-[120px] [perspective:1000px] group",
  flipInner: (isFlipped: boolean) => `
    relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 min-h-[120px] flex
    ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
  `,
  flipFront: (isSelected: boolean) => `
    w-full h-full [backface-visibility:hidden] relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer min-h-[120px]
    ${isSelected 
      ? "bg-emerald-600 border-emerald-500 shadow-lg shadow-emerald-900/10 scale-[1.02] text-white" 
      : "bg-white/60 backdrop-blur-md border-white/50 hover:border-emerald-500/40 hover:bg-white/80 hover:shadow-sm text-emerald-950/80"
    }
  `,
  flipBack: (isSelected: boolean) => `
    w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0 rounded-2xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[120px] cursor-pointer
    ${isSelected 
      ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/10 scale-[1.02]" 
      : "bg-white border-2 border-slate-100 text-emerald-950/80 hover:bg-white/90"
    }
  `,
  descText: "text-[11px] leading-relaxed font-semibold px-2 text-center",
  infoTriggerBtn: (isSelected: boolean) => `
    absolute top-2.5 right-2.5 p-1 rounded-lg transition-all hover:scale-110 active:scale-95 z-30
    ${isSelected 
      ? "text-emerald-100 hover:text-white hover:bg-white/10" 
      : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
    }
  `,
};
