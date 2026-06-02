"use client";

import { ProgressBar } from "@heroui/react";
import { STATUS_COLORS } from "../../../constants/metricsConstants";
import { PROPORTIONAL_BAR_STYLES as STYLES, segmentWidthStyle } from "./ProportionalBar.styles";
import type { ProportionalBarProps } from "./ProportionalBar.interface";

export function ProportionalBar({ segments, ariaLabel }: ProportionalBarProps) {
  return (
    <div role="presentation" aria-hidden="true">
      <ProgressBar value={100} aria-label={ariaLabel}>
        <ProgressBar.Track className={STYLES.wrapper}>
          {segments.map((seg) => (
            <span
              key={seg.status}
              className={`${STYLES.segment} ${STATUS_COLORS[seg.status].tailwind}`}
              style={segmentWidthStyle(seg.pct)}
            />
          ))}
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  );
}
