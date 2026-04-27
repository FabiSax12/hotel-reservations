/**
 * @file Stepper.theme.ts — Component-specific styles for the Stepper.
 */

export const STEPPER_STYLES = {
  row: "flex items-center justify-between py-6 border-b border-neutral-100 last:border-0",
  titleText: "text-lg font-bold text-neutral-900",
  subtitleText: "text-neutral-500 font-medium",
  controls: "flex items-center gap-4",
  btnBase:
    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]",
  btnEnabled: "border-neutral-400 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900",
  btnDisabled: "border-neutral-200 text-neutral-300 cursor-not-allowed",
  count: "w-6 text-center text-xl font-bold text-neutral-900",
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
