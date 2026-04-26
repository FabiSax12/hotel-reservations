/**
 * @file RoomList.tsx — Scrollable list of room results.
 *
 * Updated in US-DM-02:
 *  - No longer gated behind `hasSearched`. Renders whenever `selectedLocation`
 *    has a value (rooms section activates as soon as a destination is chosen).
 *  - `searchKey` is still used as a React key to re-trigger entrance animations
 *    when a new search is submitted.
 */

import type { Room } from "../domain/types";
import { RoomCard } from "./RoomCard";
import { ROOM_LIST_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";

interface RoomListProps {
  /** Filtered array of rooms to display for the selected location. */
  rooms: Room[];
  /** The currently selected destination name. */
  selectedDest: string;
  /** Monotonic counter used as a React key to force re-mount and replay entrance animations. */
  searchKey: number;
}

export function RoomList({ rooms, selectedDest, searchKey }: RoomListProps) {
  const { t } = useI18n();

  return (
    <section id="rooms-section" className={S.section} aria-label="Listado de habitaciones">
      {/* Summary header */}
      <div className={S.header}>
        <div>
          <div className={S.badge}>{t.ROOMS.REALTIME_AVAIL}</div>
          <h2 className={S.heading}>
            {t.ROOMS.OPTIONS_IN} {selectedDest}
          </h2>
        </div>

        <div className={S.countBadge} role="status" aria-live="polite">
          <span className={S.countDot} />
          {rooms.length} {t.ROOMS.ROOMS_FOUND}
        </div>
      </div>

      {/* Card grid — key forces re-mount for staggered animations on new search */}
      <div key={searchKey} className={S.grid}>
        {rooms.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} selectedDest={selectedDest} />
        ))}
      </div>
    </section>
  );
}
