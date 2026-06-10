export const GALLERY_STYLES = {
  container: "w-full max-w-4xl mx-auto pb-20",
  header: "mb-16 text-center drop-shadow-2xl",
  title: "text-6xl font-black tracking-tighter text-white font-instrument-sans leading-tight",
  subtitle: "text-lg font-medium text-white/80 mt-2",

  formCard:
    "bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 border border-white shadow-[0_20px_60px_-15px_rgba(0,128,100,0.06)] transition-all flex flex-col gap-6",

  hintBox:
    "p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-slate-700 flex gap-3 text-sm font-medium leading-relaxed",
  hintIcon: "w-5 h-5 text-emerald-600 shrink-0 mt-0.5",

  error: "text-rose-600 text-sm font-bold text-center mt-2",

  actions: "flex justify-center items-center gap-6 mt-8",
  submitBtn: "!bg-emerald-600 !text-white font-black uppercase tracking-wide text-xs",
  cancelBtn: "!bg-white !text-rose-600 !border-2 !border-rose-200 font-black uppercase tracking-wide text-xs hover:!bg-rose-50",
} as const;
