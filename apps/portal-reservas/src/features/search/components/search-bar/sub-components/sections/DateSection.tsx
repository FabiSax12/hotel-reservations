/**
 * @file DateSection.tsx — Reusable date field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES } from "../../theme/search-bar.theme";
import type { DateSectionProps } from "../../domain/types";

export function DateSection({
  label,
  placeholder,
  displayValue,
  sizing,
  sectionClass,
  onActivate,
  hasError = false,
  isShaking = false,
}: DateSectionProps) {
  const errorClass = hasError ? SEARCH_BAR_STYLES.sectionError : "";
  const shakeClass = isShaking ? SEARCH_BAR_STYLES.sectionShake : "";

  return (
    <div onClick={onActivate} className={`${sectionClass} ${errorClass} ${shakeClass}`}>
      <div className={`${sizing.label} ${SEARCH_BAR_STYLES.fieldLabel}`}>{label}</div>
      <div className={`${SEARCH_BAR_STYLES.fieldValueDate} ${sizing.value}`}>{displayValue || placeholder}</div>
    </div>
  );
}
