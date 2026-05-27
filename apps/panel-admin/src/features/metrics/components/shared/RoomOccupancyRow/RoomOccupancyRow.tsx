"use client";

import { Label, ProgressBar } from "@heroui/react";
import { formatCurrency, resolveOccupancyColor } from "../../../utils/metrics.format.utils";
import { ROOM_OCCUPANCY_ROW_STYLES as STYLES } from "./RoomOccupancyRow.styles";
import type { RoomOccupancyRowProps } from "./RoomOccupancyRow.interface";

export function RoomOccupancyRow({ roomName, occupancyPct, revenue }: RoomOccupancyRowProps) {
  const color = resolveOccupancyColor(occupancyPct);

  return (
    <div className={STYLES.row}>
      <span className={STYLES.name} title={roomName}>{roomName}</span>
      <div className={STYLES.barWrapper}>
        <ProgressBar value={occupancyPct} color={color} size="sm" aria-label={roomName}>
          <Label className="sr-only">{roomName}</Label>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <div className={STYLES.footer}>
          <span className={STYLES.pct}>{occupancyPct.toFixed(1)}%</span>
          <span className={STYLES.revenue}>{formatCurrency(revenue)}</span>
        </div>
      </div>
    </div>
  );
}
