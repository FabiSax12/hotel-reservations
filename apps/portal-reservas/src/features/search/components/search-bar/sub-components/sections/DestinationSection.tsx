/**
 * @file DestinationSection.tsx — "Sede" field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES } from "../../theme/search-bar.theme";
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
  const errorClass = hasError ? SEARCH_BAR_STYLES.sectionError : "";
  const shakeClass = isShaking ? SEARCH_BAR_STYLES.sectionShake : "";
  const { t } = useI18n();
  const C = t.SEARCH.SEARCH_BAR.DESTINATION;

  return (
    <div onClick={onActivate} className={`${sectionClass} ${errorClass} ${shakeClass}`}>
      <div className={`${sizing.label} ${SEARCH_BAR_STYLES.fieldLabel}`}>{C.LABEL}</div>
      <div className={SEARCH_BAR_STYLES.fieldValueWrapper}>
        <div className={`${SEARCH_BAR_STYLES.fieldValue(!!destination)} ${sizing.value}`}>
          {destination || C.PLACEHOLDER}
        </div>
      </div>
    </div>
  );
}
