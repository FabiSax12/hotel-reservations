/**
 * @file DateSection.tsx — Reusable date field within the search bar.
 */

"use client";

import type { DateSectionProps } from "../../domain/types";
import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";

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
  const errorClass = hasError ? S.sectionError : "";
  const shakeClass = isShaking ? S.sectionShake : "";

  return (
    <div onClick={onActivate} className={`${sectionClass} ${errorClass} ${shakeClass}`}>
      <div className={`${sizing.label} ${S.fieldLabel}`}>{label}</div>
      <div className={`${S.fieldValueDate} ${sizing.value}`}>{displayValue || placeholder}</div>
    </div>
  );
}
