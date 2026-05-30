/**
 * @file ErrorTooltip.tsx — Component for displaying search validation errors.
 */

import React from "react";
import type { ErrorTooltipProps } from "../domain/types";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";

export function ErrorTooltip({ message }: ErrorTooltipProps) {
  const { icons } = S;

  return (
    <div className={S.errorTooltipWrapper}>
      <div className={S.errorTooltipPill}>
        <svg
          className={S.errorTooltipIcon}
          fill="none"
          viewBox={icons.error.viewBox}
          stroke="currentColor"
          strokeWidth={icons.error.strokeWidth}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icons.error.path} />
        </svg>
        <span className={S.errorTooltipText}>{message}</span>
      </div>
    </div>
  );
}
