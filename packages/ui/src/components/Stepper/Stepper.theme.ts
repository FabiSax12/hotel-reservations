/**
 * @file Stepper.theme.ts — Component-specific styles for the Stepper.
 */

export const STEPPER_STYLES = {
  row: "flex items-center justify-between py-6 border-b border-forest-800 last:border-0",
  titleText: "text-lg font-bold text-stone-50",
  subtitleText: "text-stone-400 font-medium",
  controls: "flex items-center gap-4",
  btnBase:
    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]",
  btnEnabled: "border-forest-700 text-stone-300 hover:border-gold-500 hover:text-gold-500",
  btnDisabled: "border-forest-800 text-forest-700 cursor-not-allowed",
  count: "w-6 text-center text-xl font-bold text-stone-50",
  icon: "w-5 h-5 font-bold",

  icons: {
    minus: {
      viewBox: "0 0 24 24",
      strokeWidth: 3,
      path: "M20 12H4",
    },
    plus: {
      viewBox: "0 0 24 24",
      strokeWidth: 3,
      path: "M12 4v16m8-8H4",
    },
  },
} as const;
