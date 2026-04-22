/**
 * @file DestinationSection.tsx — "Sede" field within the search bar.
 */

"use client";

import { SEARCH_BAR_STYLES as S } from "../../theme/search-bar.theme";
import { SEARCH_BAR_UI_CONSTANTS } from "../../constants/ui";

const C = SEARCH_BAR_UI_CONSTANTS.DESTINATION;

interface DestinationSectionProps {
  isActive: boolean;
  destination: string;
  sizing: { label: string; value: string };
  sectionClass: string;
  onActivate: () => void;
  hasError?: boolean;
  isShaking?: boolean;
}

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
