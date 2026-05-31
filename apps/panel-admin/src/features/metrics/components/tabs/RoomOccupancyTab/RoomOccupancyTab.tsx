"use client";

import { RoomOccupancyRow } from "../../shared/RoomOccupancyRow/RoomOccupancyRow";
import { formatPct } from "../../../utils/metrics.format.utils";
import { ROOM_OCCUPANCY_TAB_STYLES as STYLES } from "./RoomOccupancyTab.styles";
import type { RoomOccupancyTabProps } from "./RoomOccupancyTab.interface";

export function RoomOccupancyTab({ roomOccupancies, subtitle, emptyText, reservationsSuffix, nightsSuffix, meterAriaLabelSuffix }: RoomOccupancyTabProps) {
  const hasData = roomOccupancies.length > 0;

  return (
    <div>
      <p className={STYLES.subtitle}>{subtitle}</p>
      {hasData ? (
        <div className={STYLES.wrapper}>
          {roomOccupancies.map((room) => (
            <RoomOccupancyRow
              key={room.roomId}
              roomName={room.roomName}
              occupancyPct={room.occupancyPct}
              reservationCount={room.reservationCount}
              nights={room.nights}
              reservationsSuffix={reservationsSuffix}
              nightsSuffix={nightsSuffix}
              meterAriaLabel={`${room.roomName}: ${formatPct(room.occupancyPct)} ${meterAriaLabelSuffix}`}
            />
          ))}
        </div>
      ) : (
        <p className={STYLES.empty}>{emptyText}</p>
      )}
    </div>
  );
}
