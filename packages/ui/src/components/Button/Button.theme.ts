/**
 * @file Button.theme.ts — Generic button styles.
 */

export const BUTTON_STYLES = {
  base: "relative flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:outline-none font-bold",

  variants: {
    primary:
      "bg-gold-600 hover:bg-gold-500 text-forest-950 shadow-[0_8px_20px_rgba(202,138,4,0.3)] hover:shadow-[0_12px_28px_rgba(202,138,4,0.35)]",
    secondary: "bg-forest-800 hover:bg-forest-700 text-stone-50",
    ghost: "bg-transparent hover:bg-forest-800/50 text-stone-300",
    outline: "bg-transparent border-2 border-forest-800 hover:border-gold-500 text-stone-200 hover:text-gold-500",
  },

  sizes: {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl h-16",
  },

  spinner: "animate-spin mr-2",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
  iconLeft: "mr-2",
  iconRight: "ml-2",

  icons: {
    spinner: {
      viewBox: "0 0 24 24",
      circle: { cx: "12", cy: "12", r: "10", strokeWidth: "4" },
      path: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
    },
  },
} as const;
