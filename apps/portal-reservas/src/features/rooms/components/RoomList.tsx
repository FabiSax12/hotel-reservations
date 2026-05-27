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

import type { RoomListProps } from "../domain/types";
import { RoomCard } from "./RoomCard";
import { PackageCard } from "./PackageCard";
import { RoomCardSkeleton } from "./RoomCardSkeleton";
import { ROOM_LIST_STYLES } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { useRoomsContext } from "../context/RoomsContext";
import { useRoomPackages, isRoomPackage } from "../hooks/useRoomPackages";

export function RoomList({ rooms, selectedDest, searchKey, isLoading = false }: RoomListProps) {
  const { t } = useI18n();
  const { guestCount, prioritizedRoomId } = useRoomsContext();

  const groupedRooms = useRoomPackages(rooms, guestCount, prioritizedRoomId);
  const optionCount = groupedRooms.length;

  return (
    <section id="rooms-section" className={ROOM_LIST_STYLES.section} aria-label={t.ROOMS.BROWSE_ROOMS}>
      {/* Summary header */}
      <div className={ROOM_LIST_STYLES.header}>
        <div>
          <div className={ROOM_LIST_STYLES.badge}>{t.ROOMS.BROWSE_ROOMS}</div>
          <h2 className={ROOM_LIST_STYLES.heading}>{selectedDest}</h2>
        </div>

        <div className={ROOM_LIST_STYLES.countBadge} role="status" aria-live="polite">
          {isLoading ? (
            <span className={ROOM_LIST_STYLES.searchingText}>{t.ROOMS.SEARCHING_ROOMS}</span>
          ) : (
            <>
              <span className={ROOM_LIST_STYLES.countValue}>{optionCount}</span> {t.ROOMS.ROOMS_OPTIONS_FOUND}
            </>
          )}
        </div>
      </div>

      {/* Card grid — key forces re-mount for staggered animations on new search */}
      <div key={searchKey} className={ROOM_LIST_STYLES.grid}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <RoomCardSkeleton key={`skel-${index}`} />
            ))
          : groupedRooms.map((item, index) =>
              isRoomPackage(item) ? (
                <PackageCard
                  key={item.id}
                  pkg={item}
                  index={index}
                  selectedDest={selectedDest}
                />
              ) : (
                <RoomCard
                  key={item.id}
                  room={item}
                  index={index}
                  selectedDest={selectedDest}
                />
              ),
            )}
      </div>
    </section>
  );
}
