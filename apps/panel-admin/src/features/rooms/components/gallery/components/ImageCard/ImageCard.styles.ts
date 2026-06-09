export const IMAGE_CARD_STYLES = {
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
