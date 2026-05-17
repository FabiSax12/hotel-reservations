// ─── Portal Reservas – App-Level Pages (error, loading) Styles ─────────────
// All Tailwind class strings for route-level error and loading boundaries.

export const ERROR_PAGE_STYLES = {
  main: "min-h-screen flex items-center justify-center bg-forest-950",
  contentWrapper: "flex flex-col items-center gap-6 text-center max-w-md px-6",
  iconCircle:
    "w-14 h-14 rounded-full bg-red-900/30 border border-red-800/50 flex items-center justify-center",
  icon: "w-7 h-7 text-red-400",
  title: "text-2xl font-serif text-stone-50",
  message: "text-stone-400 text-sm",
  retryBtn:
    "px-6 py-3 bg-gold-600 hover:bg-gold-500 text-forest-950 font-bold rounded-xl transition-colors",
  icons: {
    error: {
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      path: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    },
  },
} as const;

export const LOADING_PAGE_STYLES = {
  main: "min-h-screen flex items-center justify-center bg-forest-950",
  contentWrapper: "flex flex-col items-center gap-4",
  spinner: "w-10 h-10 border-4 border-forest-800 border-t-gold-500 rounded-full animate-spin",
  text: "text-stone-400 text-sm font-medium tracking-wide uppercase",
} as const;
