"use client";

import { STATUS_COLORS } from "../../../constants/metrics.constants";
import { PROPORTIONAL_BAR_STYLES as STYLES } from "./ProportionalBar.styles";
import type { ProportionalBarProps } from "./ProportionalBar.interface";

export function ProportionalBar({ segments }: ProportionalBarProps) {
  return (
    <div className={STYLES.wrapper} role="presentation" aria-hidden="true">
      {segments.map((seg) => (
        <span
          key={seg.status}
          className={`${STYLES.segment} ${STATUS_COLORS[seg.status].tailwind}`}
          style={{ width: `${seg.pct}%` }}
        />
      ))}
    </div>
  );
}
