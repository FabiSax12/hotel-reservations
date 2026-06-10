"use client";

import { ProgressBar } from "@heroui/react";
import { resolveOccupancyColor } from "../../../domain/metricsOccupancyComputations";
import { formatPct } from "../../../utils/metricsFormatUtils";
import { ROOM_OCCUPANCY_ROW_STYLES as STYLES } from "./RoomOccupancyRow.styles";
import type { RoomOccupancyRowProps } from "./RoomOccupancyRow.interface";

export function RoomOccupancyRow({ roomName, occupancyPct, reservationCount, nights, reservationsSuffix, nightsSuffix, meterAriaLabel }: RoomOccupancyRowProps) {
  const color = resolveOccupancyColor(occupancyPct);

  return (
    <div className={STYLES.row}>
      <div className={STYLES.nameRow}>
        <span className={STYLES.name} title={roomName}>{roomName}</span>
      </div>
      <ProgressBar value={occupancyPct} color={color} size="sm" aria-label={meterAriaLabel}>
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <div className={STYLES.statsRow}>
        <span className={STYLES.pct}>{formatPct(occupancyPct)}</span>
        <span className={STYLES.countNights}>{reservationCount} {reservationsSuffix} | {nights} {nightsSuffix}</span>
      </div>
    </div>
  );
}
