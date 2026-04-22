/**
 * @file Button.theme.ts — Generic button styles.
 */

export const BUTTON_STYLES = {
  base: "relative flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:outline-none font-bold",
  
  variants: {
    primary:   "bg-emerald-950 hover:bg-emerald-900 text-white shadow-[0_8px_20px_rgba(2,44,34,0.3)] hover:shadow-[0_12px_28px_rgba(2,44,34,0.35)]",
    secondary: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900",
    ghost:     "bg-transparent hover:bg-neutral-100 text-neutral-600",
    outline:   "bg-transparent border-2 border-neutral-200 hover:border-neutral-900 text-neutral-900",
  },

  sizes: {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl h-16",
  },

  spinner: "animate-spin mr-2",
} as const;
