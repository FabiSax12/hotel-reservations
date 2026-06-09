export const GALLERY_STYLES = {
  container:
    "w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl",
  header: "mb-6",
  title: "text-2xl font-bold text-white mb-1",
  subtitle: "text-white/70 text-sm",
  hintBox:
    "flex items-start gap-2 bg-white/10 border border-white/20 rounded-lg p-3 mb-6 text-white/70 text-sm",
  hintIcon: "shrink-0 mt-0.5",
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6",
  error: "text-red-400 text-sm mb-4",
  actions: "flex justify-end gap-3",
  cancelBtn:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl px-6 py-2 text-sm transition-colors",
  submitBtn:
    "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
} as const;

export const DROPZONE_STYLES = {
  zone: (isDisabled: boolean) =>
    `w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 mb-6 transition-colors ${
      isDisabled
        ? "border-white/10 opacity-40 cursor-not-allowed"
        : "border-white/30 hover:border-emerald-400 hover:bg-white/5 cursor-pointer"
    }`,
  icon: "text-4xl text-white/40",
  label: "text-white font-medium text-sm",
  hint: "text-white/50 text-xs",
  input: "hidden",
} as const;

export const CARD_STYLES = {
  wrapper: (isUploading: boolean, isDragging: boolean) =>
    `relative aspect-square rounded-xl overflow-hidden border-2 transition-all select-none ${
      isUploading
        ? "border-white/20 cursor-default"
        : isDragging
          ? "border-emerald-400 opacity-50 scale-95 cursor-grabbing"
          : "border-white/20 hover:border-white/40 cursor-grab"
    }`,
  image: "object-cover",
  spinner: "absolute inset-0 flex items-center justify-center bg-black/50",
  spinnerInner: "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin",
  removeBtn:
    "absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10 transition-colors",
  principalBadge:
    "absolute bottom-1.5 left-1.5 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10",
} as const;
