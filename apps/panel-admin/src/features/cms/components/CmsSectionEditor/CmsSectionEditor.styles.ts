export const CMS_SECTION_EDITOR_STYLES = {
  wrapper: "flex flex-col gap-6",
  localeTabs: "flex gap-2",
  localeTab:
    "px-4 py-1.5 rounded-full text-sm font-semibold transition-all border border-transparent text-slate-500 hover:text-slate-800",
  localeTabActive: "bg-emerald-600 text-white border-emerald-600 hover:text-white",
  bodyLabel: "text-sm font-semibold text-slate-700",
  fields: "flex flex-col gap-5",
  grid: "grid grid-cols-1 sm:grid-cols-3 gap-4",
  fieldGroup: "flex flex-col gap-1.5",
  label: "text-sm font-semibold text-slate-700",
  input:
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400",
  textarea:
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400 resize-none min-h-[100px]",
} as const;
