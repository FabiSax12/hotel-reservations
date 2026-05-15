"use client";

import { RoomOccupancyRow } from "../../shared/RoomOccupancyRow/RoomOccupancyRow";
import { ROOM_OCCUPANCY_TAB_STYLES as STYLES } from "./RoomOccupancyTab.styles";
import type { RoomOccupancyTabProps } from "./RoomOccupancyTab.interface";

export function RoomOccupancyTab({ roomOccupancies, subtitle, emptyText }: RoomOccupancyTabProps) {
  const hasData = roomOccupancies.length > 0;

  return (
    <div>
      <p className={STYLES.subtitle}>{subtitle}</p>
      {hasData ? (
        <div className={STYLES.wrapper}>
          {roomOccupancies.map((room, idx) => (
            <div key={room.roomId}>
              <RoomOccupancyRow
                roomName={room.roomName}
                occupancyPct={room.occupancyPct}
                revenue={room.revenue}
              />
              {idx < roomOccupancies.length - 1 && <div className={STYLES.divider} />}
            </div>
          ))}
        </div>
      ) : (
        <p className={STYLES.empty}>{emptyText}</p>
      )}
    </div>
  );
}
