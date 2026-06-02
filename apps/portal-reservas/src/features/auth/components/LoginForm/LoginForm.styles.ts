export const AUTH_BACKGROUND_IMAGE = "url('/images/auth-bg.png')" as const;

export const LOGIN_FORM_STYLES = {
  header: "mb-10",
  passwordHeader: "flex items-center justify-between",
  actionsWrapper: "flex flex-col gap-4 pt-2",
  inputIcon: "text-neutral-400 hover:text-gold-400 transition-colors pointer-events-none",
  googleIcon: "w-5 h-5",
  fieldWrapper: "flex flex-col gap-2",
  passwordToggleBtn: "min-w-8 h-8 focus:outline-none",
  passwordSuffix: "flex items-center pr-1",
  eyeIcon: "size-4 text-stone-400",
} as const;

export const LOGIN_THEME_STYLES = {
  main: "relative flex min-h-screen items-center justify-center px-4 overflow-hidden",
  background: "absolute inset-0 z-0",
  bgImage: "absolute inset-0 bg-cover bg-center scale-105",
  bgOverlay: "absolute inset-0 bg-forest-950/85 backdrop-blur-md",
  bgGradient: "absolute inset-0 bg-gradient-to-b from-forest-950/90 via-transparent to-transparent",
  card: "relative z-10 w-full max-w-md rounded-2xl bg-forest-900/40 backdrop-blur-xl border border-forest-800/60 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] transition-all duration-500",
  title: "text-3xl font-black text-stone-50 tracking-tight mb-2",
  subtitle: "text-stone-400 text-sm mb-8 font-medium",
  form: "flex flex-col gap-6",
  label: "text-[11px] font-black uppercase tracking-widest text-gold-500/80 ml-1",
  input:
    "w-full bg-forest-950/50 border border-forest-800 rounded-xl px-4 py-3 text-[15px] font-bold text-stone-50 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all duration-200",
  submitBtn:
    "w-full py-4 bg-gold-600 hover:bg-gold-500 text-forest-950 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-gold-900/10 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2",
  googleBtn:
    "w-full py-3.5 bg-forest-800/50 border border-forest-700 rounded-xl font-bold text-[15px] text-stone-300 shadow-sm hover:bg-forest-800 hover:shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3",
  link: "text-center text-xs font-bold text-gold-500 hover:text-gold-400 transition-colors uppercase tracking-widest",
  dividerWrapper: "relative my-4",
  dividerLine: "absolute inset-0 flex items-center",
  dividerStroke: "w-full border-t border-forest-800",
  dividerTextWrapper:
    "relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]",
  dividerText: "bg-transparent px-4 text-stone-500",
  error:
    "rounded-xl bg-red-900/30 border border-red-800/50 px-4 py-3 text-xs font-bold text-red-400 animate-in fade-in zoom-in duration-300",
} as const;
