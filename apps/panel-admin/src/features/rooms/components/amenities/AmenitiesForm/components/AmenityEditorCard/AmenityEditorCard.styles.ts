export const AMENITY_EDITOR_CARD_STYLES = {
  customInputCard: "relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-emerald-500 bg-white shadow-lg col-span-1 sm:col-span-2 min-h-[140px] transition-all",
  customInput: "w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-xs rounded-xl px-2.5 py-2.5 text-slate-800 placeholder-slate-400 font-medium outline-none text-center",
  customActionWrapper: "flex gap-2 w-full justify-center mt-1",
  customSaveBtn: "bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-all active:scale-90",
  customCancelBtn: "bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-lg transition-all active:scale-90",
  
  // Icon Picker Grid
  iconPickerGrid: "grid grid-cols-4 sm:grid-cols-8 gap-2 w-full mt-2 justify-items-center",
  iconPickerBtn: (isSelected: boolean) => `
    p-2 rounded-xl flex items-center justify-center border-2 transition-all duration-200 cursor-pointer w-9 h-9
    ${isSelected 
      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 scale-105" 
      : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    }
  `,
};
