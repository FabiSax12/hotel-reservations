export const GALLERY_STYLES = {
  container:
    "w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl",
  header: "mb-6",
  title: "text-2xl font-bold text-white mb-1",
  subtitle: "text-white/70 text-sm",
  hintBox:
    "flex items-start gap-2 bg-white/10 border border-white/20 rounded-lg p-3 mb-6 text-white/70 text-sm",
  hintIcon: "shrink-0 mt-0.5",
  error: "text-red-400 text-sm mb-4",
  actions: "flex justify-end gap-3",
  cancelBtn:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl px-6 py-2 text-sm transition-colors",
  submitBtn:
    "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
} as const;
