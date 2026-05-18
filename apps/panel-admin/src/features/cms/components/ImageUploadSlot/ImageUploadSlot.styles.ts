export const IMAGE_UPLOAD_SLOT_STYLES = {
  wrapper: "flex flex-col gap-2",
  label: "text-xs font-semibold uppercase tracking-widest text-slate-500",
  dropzone:
    "relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer group transition-all hover:border-emerald-400 hover:bg-emerald-50/40",
  dropzoneHasImage: "border-transparent",
  image: "absolute inset-0 w-full h-full object-cover",
  overlay:
    "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3",
  placeholder: "flex flex-col items-center gap-2 text-slate-400",
  placeholderIcon: "w-8 h-8",
  placeholderHint: "text-xs text-center px-4",
  overlayBtn:
    "px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-800 hover:bg-emerald-50 transition-colors",
  overlayBtnRemove:
    "px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors",
  uploading: "absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm",
  spinner: "w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin",
  error: "text-xs text-rose-500 mt-1",
  hiddenInput: "sr-only",
} as const;
