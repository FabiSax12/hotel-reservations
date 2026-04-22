/**
 * @file DateSection.tsx — Reusable date field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";

interface DateSectionProps {
  label: string;
  placeholder: string;
  displayValue: string;
  sizing: { label: string; value: string };
  sectionClass: string;
  onActivate: () => void;
  hasError?: boolean;
  isShaking?: boolean;
}

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
