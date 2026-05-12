/**
 * @file DestinationSection.tsx — "Sede" field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { useI18n } from "@/locales";
import type { DestinationSectionProps } from "../../domain/types";

export function DestinationSection({
  isActive,
  destination,
  sizing,
  sectionClass,
  onActivate,
  hasError = false,
  isShaking = false,
}: DestinationSectionProps) {
  const errorClass = hasError ? S.sectionError : "";
  const shakeClass = isShaking ? S.sectionShake : "";
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.DESTINATION;

  return (
    <div onClick={onActivate} className={`${sectionClass} ${errorClass} ${shakeClass}`}>
      <div className={`${sizing.label} ${S.fieldLabel}`}>{C.LABEL}</div>
      <div className={S.fieldValueWrapper}>
        <div className={`${S.fieldValue(!!destination)} ${sizing.value}`}>
          {destination || C.PLACEHOLDER}
        </div>
      </div>
    </div>
  );
}
