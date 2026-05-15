"use client";

import { STATUS_DOT_COLORS } from "../../../constants/metrics.constants";
import { STATUS_CHIP_STYLES as S } from "./StatusChip.styles";
import type { StatusChipProps } from "./StatusChip.interface";

export function StatusChip({ status, label, count, pct }: StatusChipProps) {
  const dotColor = STATUS_DOT_COLORS[status];

  return (
    <div className={S.card}>
      <div className={S.header}>
        <span className={`${S.dot} ${dotColor}`} aria-hidden="true" />
        <span className={S.label}>{label}</span>
      </div>
      <div className={S.row}>
        <span className={S.count}>{count.toLocaleString()}</span>
        <span className={S.pct}>{pct.toFixed(1)}%</span>
      </div>
    </div>
  );
}
