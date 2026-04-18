/**
 * @file DateSection.tsx — Reusable date field within the search bar.
 *
 * Used twice: once for Check-In ("Llegada") and once for Check-Out ("Salida").
 * Both instances are identical in structure; the parent passes different
 * `label`, `placeholder`, and `displayValue` props to differentiate them.
 *
 * Clicking the section activates either "checkIn" or "checkOut" in the
 * parent, which opens the CalendarPopover.
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
}

export function DateSection({ label, placeholder, displayValue, sizing, sectionClass, onActivate }: DateSectionProps) {
  return (
    <div onClick={onActivate} className={sectionClass}>
      <div className={`${sizing.label} ${S.fieldLabel}`}>{label}</div>
      <div className={`${S.fieldValueDate} ${sizing.value}`}>
        {displayValue || placeholder}
      </div>
    </div>
  );
}
