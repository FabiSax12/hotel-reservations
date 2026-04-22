/**
 * @file RoomList.tsx — Scrollable list of room results.
 *
 * Displayed in State B after the user searches. Shows a summary header
 * (destination name + room count) and renders a vertically stacked
 * list of {@link RoomCard} components.
 *
 * The `searchKey` prop is used as a React `key` on the grid container,
 * so that switching searches re-mounts the list and replays entrance
 * animations.
 */

import type { Room } from "../domain/types";
import { RoomCard } from "./RoomCard";
import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { ROOM_LIST_STYLES as S } from "../../../theme/rooms.theme";

interface RoomListProps {
  /** Filtered array of rooms to display. */
  rooms: Room[];
  /** The currently selected destination, or null for "all". */
  selectedDest: string | null;
  /** Monotonic counter used as a React key to force re-mount animations. */
  searchKey: number;
}

export function RoomList({ rooms, selectedDest, searchKey }: RoomListProps) {
  return (
    <section className={S.section}>
      {/* Summary header: destination name + live count badge */}
      <div className={S.header}>
        <div>
          <div className={S.badge}>{UI_CONSTANTS.ROOMS.REALTIME_AVAIL}</div>
          <h2 className={S.heading}>
            {UI_CONSTANTS.ROOMS.OPTIONS_IN} {selectedDest || UI_CONSTANTS.ROOMS.ALL_DESTINATIONS}
          </h2>
        </div>

        <div className={S.countBadge}>
          <span className={S.countDot} />
          {rooms.length} {UI_CONSTANTS.ROOMS.ROOMS_FOUND}
        </div>
      </div>

      {/* Stacked card grid — key forces re-mount for staggered animations */}
      <div key={searchKey} className={S.grid}>
        {rooms.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} selectedDest={selectedDest} />
        ))}
      </div>
    </section>
  );
}
