import type { ReservationStatus } from "../domain/metrics.types";

export type ProgressColor = "success" | "warning" | "accent" | "default" | "danger";

export const ACTIVE_STATUSES = Object.freeze(["approved", "completed"] as const satisfies ReservationStatus[]);

export const STATUS_COLORS = Object.freeze({
  pending:   { tailwind: "bg-amber-400",   hex: "#fbbf24" },
  approved:  { tailwind: "bg-emerald-500", hex: "#10b981" },
  cancelled: { tailwind: "bg-rose-400",    hex: "#fb7185" },
  completed: { tailwind: "bg-blue-500",    hex: "#3b82f6" },
} as const satisfies Record<ReservationStatus, { tailwind: string; hex: string }>);

export const STATUS_DOT_COLORS = Object.freeze({
  pending:   "bg-amber-400",
  approved:  "bg-emerald-500",
  cancelled: "bg-rose-400",
  completed: "bg-blue-500",
} as const satisfies Record<ReservationStatus, string>);

export const OCCUPANCY_THRESHOLDS = Object.freeze({
  LOW:    30,
  MEDIUM: 60,
  HIGH:   80,
} as const);

export const OCCUPANCY_COLORS = Object.freeze({
  LOW:    "success"  as ProgressColor,
  MEDIUM: "warning"  as ProgressColor,
  HIGH:   "accent"   as ProgressColor,
  FULL:   "accent"   as ProgressColor,
} as const);

export const MONTH_NAMES_ES = Object.freeze([
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
] as const);

export const MONTH_NAMES_EN = Object.freeze([
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const);

export const STATUS_ORDER: ReservationStatus[] = ["pending", "approved", "cancelled", "completed"];

export const MAX_WEEKLY_BARS  = 7;
export const DAYS_TO_SUNDAY   = 6;
export const MS_PER_DAY       = 86_400_000;

export const PERCENTAGE_SCALE   = 100;
export const PCT_DECIMAL_PLACES = 1;
export const ROOMS_SEPARATOR    = " / ";

export const CURRENCY_LOCALE          = "en-US";
export const CURRENCY_CODE            = "USD";
export const CURRENCY_FRACTION_DIGITS = 0;

export const ISO_DATE_LENGTH     = 10;
export const DAYS_IN_WEEK        = 7;
export const JANUARY_MONTH_IDX   = 0;
export const FIRST_DAY_OF_MONTH  = 1;
export const ISO_WEEK_START      = 1;
export const THURSDAY_ISO_DAY    = 3;
export const MONDAY_JS_OFFSET    = 6;
export const ISO_WEEK1_JAN_DAY   = 4;
export const LAST_DAY_PREV_MONTH = 0;
