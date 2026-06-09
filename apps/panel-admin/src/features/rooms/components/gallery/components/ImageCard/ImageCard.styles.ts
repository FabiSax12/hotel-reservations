export const IMAGE_CARD_STYLES = {
  wrapper: (isUploading: boolean, isDragging: boolean) =>
    `relative aspect-square rounded-xl overflow-hidden border-2 transition-all select-none ${
      isUploading
        ? "border-slate-300 bg-slate-100 cursor-default"
        : isDragging
          ? "border-emerald-400 ring-2 ring-emerald-200 opacity-75 scale-95 cursor-grabbing"
          : "border-slate-300 bg-white hover:border-emerald-400 hover:ring-1 hover:ring-emerald-200 cursor-grab"
    }`,
  image: "object-cover",
  spinner: "absolute inset-0 flex items-center justify-center bg-black/30",
  spinnerInner: "w-6 h-6 border-2 border-emerald-600 border-t-emerald-200 rounded-full animate-spin",
  removeBtn:
    "absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold z-10 transition-colors shadow-md",
  principalBadge:
    "absolute bottom-2 left-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-md",
} as const;
