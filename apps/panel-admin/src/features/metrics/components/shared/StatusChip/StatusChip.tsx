"use client";

import { STATUS_DOT_COLORS } from "../../../constants/metrics.constants";
import { STATUS_CHIP_STYLES as STYLES } from "./StatusChip.styles";
import type { StatusChipProps } from "./StatusChip.interface";

export function StatusChip({ status, label, count, pct }: StatusChipProps) {
  const dotColor = STATUS_DOT_COLORS[status];

  return (
    <div className={STYLES.card}>
      <div className={STYLES.header}>
        <span className={`${STYLES.dot} ${dotColor}`} aria-hidden="true" />
        <span className={STYLES.label}>{label}</span>
      </div>
      <div className={STYLES.row}>
        <span className={STYLES.count}>{count.toLocaleString()}</span>
        <span className={STYLES.pct}>{pct.toFixed(1)}%</span>
      </div>
    </div>
  );
}
