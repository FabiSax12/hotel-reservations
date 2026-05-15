"use client";

import { RoomOccupancyRow } from "../../shared/RoomOccupancyRow/RoomOccupancyRow";
import { ROOM_OCCUPANCY_TAB_STYLES as S } from "./RoomOccupancyTab.styles";
import type { RoomOccupancyTabProps } from "./RoomOccupancyTab.interface";

export function RoomOccupancyTab({ roomOccupancies, subtitle, emptyText }: RoomOccupancyTabProps) {
  const hasData = roomOccupancies.length > 0;

  return (
    <div>
      <p className={S.subtitle}>{subtitle}</p>
      {hasData ? (
        <div className={S.wrapper}>
          {roomOccupancies.map((room, idx) => (
            <div key={room.roomId}>
              <RoomOccupancyRow
                roomName={room.roomName}
                occupancyPct={room.occupancyPct}
                revenue={room.revenue}
              />
              {idx < roomOccupancies.length - 1 && <div className={S.divider} />}
            </div>
          ))}
        </div>
      ) : (
        <p className={S.empty}>{emptyText}</p>
      )}
    </div>
  );
}
