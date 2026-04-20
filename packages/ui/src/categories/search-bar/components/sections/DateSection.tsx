/**
 * @file DateSection.tsx — Reusable date field within the search bar.
 *
 * Used twice: once for Check-In ("Llegada") and once for Check-Out ("Salida").
 * Both instances are identical in structure; the parent passes different
 * `label`, `placeholder`, and `displayValue` props to differentiate them.
 *
 * Clicking the section activates either "checkIn" or "checkOut" in the
 * parent, which opens the CalendarPopover.
 *
 * ## Error state
 * When `hasError` is true, a soft red ring is applied to draw attention.
 * When `isShaking` is true, a brief CSS shake animation plays — triggered
 * once on validation failure and cleared by the parent after 400 ms.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";

interface DateSectionProps {
  /** Field label (e.g. "Llegada" or "Salida"). */
  label: string;
  /** Placeholder text shown when no date is selected (e.g. "Fechas"). */
  placeholder: string;
  /** Formatted date string to display, or "" if no date is selected. */
  displayValue: string;
  /** Sizing tokens from the search bar's current variant. */
  sizing: { label: string; value: string };
  /** Pre-computed CSS class string (includes active/inactive state styling). */
  sectionClass: string;
  /** Callback to activate this section (open the calendar). */
  onActivate: () => void;
  /** When true, applies a soft red glow to signal a validation error. */
  hasError?: boolean;
  /** When true, plays a brief shake animation (cleared by parent after 400 ms). */
  isShaking?: boolean;
}

export function DateSection({
  label, placeholder, displayValue, sizing, sectionClass, onActivate,
  hasError = false, isShaking = false,
}: DateSectionProps) {
  const errorClass = hasError ? S.sectionError : "";
  const shakeClass = isShaking ? S.sectionShake : "";

  return (
    <div onClick={onActivate} className={`${sectionClass} ${errorClass} ${shakeClass}`}>
      <div className={`${sizing.label} ${S.fieldLabel}`}>{label}</div>
      <div className={`${S.fieldValueDate} ${sizing.value}`}>
        {displayValue || placeholder}
      </div>
    </div>
  );
}
