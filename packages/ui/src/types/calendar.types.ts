/**
 * @file calendar.types.ts — Shared types for the Calendar components.
 */

export interface CalendarInvalidState {
  dayStrs: string[];
  isFading: boolean;
  animationKey?: number;
}
