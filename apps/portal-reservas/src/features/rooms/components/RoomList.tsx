/**
 * @file RoomList.tsx — Scrollable list of room results.
 *
 * Updated in US-DM-02:
 *  - No longer gated behind `hasSearched`. Renders whenever `selectedLocation`
 *    has a value (rooms section activates as soon as a destination is chosen).
 *  - `searchKey` is still used as a React key to re-trigger entrance animations
 *    when a new search is submitted.
 */

import type { RoomListProps } from "../domain/types";
import { RoomCard } from "./RoomCard";
import { RoomCardSkeleton } from "./RoomCardSkeleton";
import { ROOM_LIST_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";

export function RoomList({ rooms, selectedDest, searchKey, isLoading = false }: RoomListProps) {
  const { t } = useI18n();

  return (
    <section id="rooms-section" className={S.section} aria-label={t.ROOMS.BROWSE_ROOMS}>
      {/* Summary header */}
      <div className={S.header}>
        <div>
          <div className={S.badge}>{t.ROOMS.BROWSE_ROOMS}</div>
          <h2 className={S.heading}>{selectedDest}</h2>
        </div>

        <div className={S.countBadge} role="status" aria-live="polite">
          {isLoading ? (
            <span className={S.searchingText}>{t.ROOMS.SEARCHING_ROOMS}</span>
          ) : (
            <>
              <span className={S.countValue}>{rooms.length}</span> {t.ROOMS.ROOMS_FOUND}
            </>
          )}
        </div>
      </div>

      {/* Card grid — key forces re-mount for staggered animations on new search */}
      <div key={searchKey} className={S.grid}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <RoomCardSkeleton key={`skel-${index}`} />
            ))
          : rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} selectedDest={selectedDest} />
            ))}
      </div>
    </section>
  );
}
