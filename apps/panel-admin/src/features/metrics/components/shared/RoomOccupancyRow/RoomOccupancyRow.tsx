"use client";

import { Label, ProgressBar } from "@heroui/react";
import {
  OCCUPANCY_COLORS,
  OCCUPANCY_THRESHOLDS,
  CURRENCY_CODE,
  CURRENCY_LOCALE,
} from "../../../constants/metrics.constants";
import { ROOM_OCCUPANCY_ROW_STYLES as S } from "./RoomOccupancyRow.styles";
import type { RoomOccupancyRowProps } from "./RoomOccupancyRow.interface";

type ProgressBarColor = "success" | "warning" | "accent" | "default" | "danger";

function resolveOccupancyColor(pct: number): ProgressBarColor {
  if (pct < OCCUPANCY_THRESHOLDS.LOW) return OCCUPANCY_COLORS.LOW;
  if (pct < OCCUPANCY_THRESHOLDS.MEDIUM) return OCCUPANCY_COLORS.MEDIUM;
  if (pct < OCCUPANCY_THRESHOLDS.HIGH) return OCCUPANCY_COLORS.HIGH;
  return OCCUPANCY_COLORS.FULL;
}

function formatRevenue(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function RoomOccupancyRow({ roomName, occupancyPct, revenue }: RoomOccupancyRowProps) {
  const color = resolveOccupancyColor(occupancyPct);

  return (
    <div className={S.row}>
      <span className={S.name} title={roomName}>{roomName}</span>
      <div className={S.barWrapper}>
        <ProgressBar value={occupancyPct} color={color} size="sm" aria-label={roomName}>
          <Label className="sr-only">{roomName}</Label>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <div className={S.footer}>
          <span className={S.pct}>{occupancyPct.toFixed(1)}%</span>
          <span className={S.revenue}>{formatRevenue(revenue)}</span>
        </div>
      </div>
    </div>
  );
}
