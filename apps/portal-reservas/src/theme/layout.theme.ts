// ─── Portal Reservas – Layout Feature Styles ─────────────────────────────────
// All Tailwind class strings for Background and Header, kept out of JSX.

export const BACKGROUND_STYLES = {
  wrapper:  "fixed inset-0 z-[-1] overflow-hidden pointer-events-none",
  image:    "absolute -inset-[2%] bg-cover bg-center",
  wash:     "absolute inset-0 bg-white/50 backdrop-blur-sm",
  gradient: "absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent",
} as const;

export const HEADER_STYLES = {
  root:    "fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40",
  inner:   "w-full max-w-[1500px] mx-auto px-6 h-24 flex items-center justify-between",
  brand:   "text-emerald-950 text-2xl font-serif font-black tracking-tighter cursor-pointer hover:opacity-80 transition",
  brandHighlight: "text-emerald-600",
  nav:     "flex items-center gap-6 text-sm font-bold text-neutral-600",
  helpBtn: "hover:text-emerald-900 transition-colors",
  myReservationsBtn: "flex items-center gap-3 pl-6 border-l-2 border-neutral-200",
  myReservationsLabel: "text-right hidden md:block",
  myReservationsText: "text-neutral-900 leading-none mb-0.5",
  avatarWrapper: "w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100",
  avatarIcon: "w-5 h-5 text-emerald-800",
  stickySearchBar: "w-full bg-white pb-6 pt-2 shadow-[0_12px_40px_rgba(0,0_0,0.06)] border-t border-neutral-100 animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center px-6",
  loginBtn: "px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-all active:scale-95",
} as const;
