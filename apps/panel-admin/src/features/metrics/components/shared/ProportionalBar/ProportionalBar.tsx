"use client";

import { ProgressBar } from "@heroui/react";
import { STATUS_COLORS } from "../../../constants/metrics.constants";
import type { ProportionalBarProps } from "./ProportionalBar.interface";

export function ProportionalBar({ segments, ariaLabel }: ProportionalBarProps) {
  return (
    <div role="presentation" aria-hidden="true">
      <ProgressBar value={100} aria-label={ariaLabel}>
        <ProgressBar.Track className="h-3 flex overflow-hidden rounded-full">
          {segments.map((seg) => (
            <span
              key={seg.status}
              className={`h-full transition-all duration-500 ${STATUS_COLORS[seg.status].tailwind}`}
              style={{ width: `${seg.pct}%` }}
            />
          ))}
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  );
}
