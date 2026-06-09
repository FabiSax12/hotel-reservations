export const UPLOAD_DROPZONE_STYLES = {
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
