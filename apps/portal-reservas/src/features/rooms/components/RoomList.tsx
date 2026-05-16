/**
 * @file RoomList.tsx — Scrollable list of room results.
 *
 * Updated in US-DM-02:
 *  - No longer gated behind `hasSearched`. Renders whenever `selectedLocation`
 *    has a value (rooms section activates as soon as a destination is chosen).
 *  - `searchKey` is still used as a React key to re-trigger entrance animations
 *    when a new search is submitted.
 *
 * Updated in US-DM-04:
 *  - Renders room packages (PackageCard) alongside individual RoomCards.
 *  - Listing header counts packages as single items ("opciones encontradas").
 *  - Consumes `useRoomPackages` hook for smart grouping.
 */

import { useI18n } from "@/locales";
import { ROOM_LIST_STYLES as S } from "../../../theme/rooms.theme";
import { useRoomsContext } from "../context/RoomsContext";
import type { RoomListProps } from "../domain/types";
import { isRoomPackage, useRoomPackages } from "../hooks/useRoomPackages";
import { PackageCard } from "./PackageCard";
import { RoomCard } from "./RoomCard";
import { RoomCardSkeleton } from "./RoomCardSkeleton";

export function RoomList({ rooms, selectedDest, searchKey, isLoading = false }: RoomListProps) {
  const { t } = useI18n();
  const { guestCount, prioritizedRoomId } = useRoomsContext();

  const groupedRooms = useRoomPackages(rooms, guestCount, prioritizedRoomId);
  const optionCount = groupedRooms.length;

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
              <span className={S.countValue}>{optionCount}</span> {t.ROOMS.ROOMS_OPTIONS_FOUND}
            </>
          )}
        </div>
      </div>

      {/* Card grid — key forces re-mount for staggered animations on new search */}
      <div key={searchKey} className={S.grid}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <RoomCardSkeleton key={`skel-${index}`} />)
          : groupedRooms.map((item, index) =>
              isRoomPackage(item) ? (
                <PackageCard key={item.id} pkg={item} index={index} selectedDest={selectedDest} />
              ) : (
                <RoomCard key={item.id} room={item} index={index} selectedDest={selectedDest} />
              ),
            )}
      </div>
    </section>
  );
}
