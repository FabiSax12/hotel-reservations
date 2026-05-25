export const ROOM_INFO_FORM_STYLES = {
  container: "w-full max-w-5xl mx-auto",
  headerWrapper: "mb-16 text-center drop-shadow-2xl",
  title: "text-6xl font-black tracking-tighter text-white font-instrument-sans leading-tight",
  subtitle: "hidden",
  form: "flex flex-col gap-8",
  card: "bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white shadow-[0_20px_60px_-15px_rgba(0,128,100,0.06)] transition-all hover:shadow-[0_30px_80px_-15px_rgba(0,128,100,0.1)]",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6",
  actions: "flex justify-center items-center gap-6 mt-8",
  submitButton:
    "bg-emerald-600 text-white font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.4)] active:scale-95",
  cancelButton:
    "bg-white text-rose-600 font-black uppercase tracking-[0.15em] text-[13px] px-12 py-5 rounded-full border-2 border-rose-100 transition-all hover:bg-rose-50 hover:border-rose-200 active:scale-95",
  roomBasicInfo: "grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch",
} as const;
