import type { ReservationStatus } from "../../domain/reservation";

export const STATUS_PILL_STYLES = {
  pill:          "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border border-gray-200 shadow-sm px-3 py-1.5 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:shadow-md",
  pillActive:    "border-emerald-900 bg-emerald-900 text-white font-semibold shadow-sm hover:shadow-md",
  pillInactive:  "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md",
  pillStatusDot: "h-2 w-2 flex-shrink-0 rounded-full",
  pillCount:     "text-[0.8em] tabular-nums opacity-60",
} as const;

export const STATUS_DOT_COLOR: Record<ReservationStatus, string> = Object.freeze({
  pending:   "bg-amber-400",
  approved:  "bg-green-500",
  cancelled: "bg-red-500",
  completed: "bg-blue-500",
} as const);
