export const UPLOAD_DROPZONE_STYLES = {
  zone: (isDisabled: boolean) =>
    `w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all ${
      isDisabled
        ? "border-slate-200 bg-slate-50/50 opacity-50 cursor-not-allowed"
        : "border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/40 cursor-pointer"
    }`,
  icon: "text-4xl text-slate-400",
  label: "text-slate-700 font-semibold text-sm",
  hint: "text-slate-500 text-xs",
  input: "hidden",
} as const;
