/**
 * @file ErrorTooltip.tsx — Component for displaying search validation errors.
 */

import React from "react";
import { SEARCH_BAR_STYLES } from "../theme/search-bar.theme";
import type { ErrorTooltipProps } from "../domain/types";

export function ErrorTooltip({ message }: ErrorTooltipProps) {
  const errorIcon = SEARCH_BAR_STYLES.icons.error;

  return (
    <div className={SEARCH_BAR_STYLES.errorTooltipWrapper}>
      <div className={SEARCH_BAR_STYLES.errorTooltipPill}>
        <svg
          className={SEARCH_BAR_STYLES.errorTooltipIcon}
          fill="none"
          viewBox={errorIcon.viewBox}
          stroke="currentColor"
          strokeWidth={errorIcon.strokeWidth}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={errorIcon.path} />
        </svg>
        <span className={SEARCH_BAR_STYLES.errorTooltipText}>{message}</span>
      </div>
    </div>
  );
}
