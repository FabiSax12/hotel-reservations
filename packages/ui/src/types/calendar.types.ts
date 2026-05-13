/**
 * @file calendar.types.ts — Shared types for the Calendar components.
 */

export interface CalendarInvalidState {
  dayStrs: string[];
  isFading: boolean;
  animationKey?: number;
}

// ─── Calendar Component Props ───────────────────────────────────────────────

export interface CalendarDayProps {
  d: number;
  dayStr: string;
  isPast: boolean;
  isStart: boolean;
  isEnd: boolean;
  hasRange: boolean;
  isSelected: boolean;
  isToday: boolean;
  isHovered: boolean;
  isInvalid: boolean;
  isFading: boolean;
  invalidAnimationKey?: number;
  isHero: boolean;
  hideTooltips?: boolean;
  onPickDate: (dayStr: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  startLabel?: string;
  endLabel?: string;
  isAvailable?: boolean;
}

export interface CalendarMonthProps {
  monthIndexLocal: 0 | 1;
  absoluteMonthOffset: number;
  currentMonthOffset: number;
  today: Date;
  inVal: number;
  outVal: number;
  invalidState: CalendarInvalidState | null;
  hoveredDay: string | null;
  isHero: boolean;
  hideTooltips?: boolean;
  onPickDate: (dayStr: string) => void;
  onHoverDay: (dayStr: string | null) => void;
  onPrev: () => void;
  onNext: () => void;
  startLabel?: string;
  endLabel?: string;
  availableDates?: string[];
}

export interface CalendarPopoverProps {
  checkIn: string;
  checkOut: string;
  invalidState: CalendarInvalidState | null;
  hideTooltips?: boolean;
  onPickDate: (dayStr: string) => void;
  variant?: "hero" | "compact";
  startLabel?: string;
  endLabel?: string;
  availableDates?: string[];
  bottomContent?: React.ReactNode;
  className?: string;
  isInline?: boolean;
}

export interface MonthHeaderProps {
  monthIndexLocal: 0 | 1;
  currentMonthOffset: number;
  maxMonths: number;
  monthHeader: string;
  isHero: boolean;
  onPrev: () => void;
  onNext: () => void;
}
