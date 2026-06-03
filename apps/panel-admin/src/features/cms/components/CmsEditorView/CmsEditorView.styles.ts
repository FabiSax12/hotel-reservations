export const CMS_EDITOR_VIEW_STYLES = {
  wrapper: "min-h-screen py-16 px-4 sm:px-8 bg-slate-50",
  inner: "max-w-3xl mx-auto flex flex-col gap-8",
  title: "text-3xl font-black tracking-tight text-slate-900",
  card: "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden",
  sectionTabs: "flex border-b border-slate-100 overflow-x-auto",
  sectionTab:
    "py-3 px-5 text-sm font-semibold text-slate-500 transition-all hover:text-slate-800 hover:bg-slate-50 whitespace-nowrap border-b-2 border-transparent",
  sectionTabActive: "text-emerald-700 border-emerald-600 bg-white hover:bg-white",
  body: "p-6",
} as const;
