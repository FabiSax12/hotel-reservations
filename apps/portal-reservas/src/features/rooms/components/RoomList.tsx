"use client";

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
 *
 * Updated in US-DM-03:
 *  - Pipes the destination-filtered room list through `useRoomFilters`
 *    (sort + multi-attribute filter) before grouping, so packages form from
 *    the already-filtered set.
 *  - Renders `RoomFiltersBar` above the card grid once `hasSearched` is true
 *    — the "full search interface" per AC #1.
 *  - Shows an empty state when filters return zero options.
 */

import { useI18n } from "@/locales";
import { ROOM_FILTERS_BAR_STYLES, ROOM_LIST_STYLES } from "../../../theme/rooms.theme";
import { useRoomsContext } from "../context/RoomsContext";
import type { RoomListProps } from "../domain/types";
import { useRoomFilters } from "../hooks/useRoomFilters";
import { isRoomPackage, useRoomPackages } from "../hooks/useRoomPackages";
import { PackageCard } from "./PackageCard";
import { RoomCard } from "./RoomCard";
import { RoomCardSkeleton } from "./RoomCardSkeleton";
import { RoomFiltersBar } from "./RoomFiltersBar";

export function RoomList({ rooms, selectedDest, searchKey, isLoading = false }: RoomListProps) {
  const { t } = useI18n();
  const { guestCount, prioritizedRoomId, hasSearched } = useRoomsContext();

  const { attributes, filters, setFilters, sort, setSort, reset, visibleRooms } =
    useRoomFilters(rooms);

  const groupedRooms = useRoomPackages(visibleRooms, guestCount, prioritizedRoomId);
  const optionCount = groupedRooms.length;
  const hasNoResults = !isLoading && optionCount === 0;

  return (
    <section
      id="rooms-section"
      className={ROOM_LIST_STYLES.section}
      aria-label={t.ROOMS.BROWSE_ROOMS}
    >
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
              <span className={ROOM_LIST_STYLES.countValue}>{optionCount}</span>{" "}
              {t.ROOMS.ROOMS_OPTIONS_FOUND}
            </>
          )}
        </div>
      </div>

      {/* US-DM-03: sort + filter controls — only after the user presses "Buscar". */}
      {hasSearched && !isLoading && (
        <RoomFiltersBar
          attributes={attributes}
          filters={filters}
          onFiltersChange={setFilters}
          sort={sort}
          onSortChange={setSort}
          onReset={reset}
        />
      )}

      {/* Card grid — key forces re-mount for staggered animations on new search */}
      <div key={searchKey} className={ROOM_LIST_STYLES.grid}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => <RoomCardSkeleton key={`skel-${index}`} />)
        ) : hasNoResults ? (
          <div className={ROOM_FILTERS_BAR_STYLES.emptyState} role="status">
            <p className={ROOM_FILTERS_BAR_STYLES.emptyTitle}>{t.ROOMS.FILTERS_NO_RESULTS}</p>
            <p className={ROOM_FILTERS_BAR_STYLES.emptyHint}>{t.ROOMS.FILTERS_NO_RESULTS_HINT}</p>
          </div>
        ) : (
          groupedRooms.map((item, index) =>
            isRoomPackage(item) ? (
              <PackageCard key={item.id} pkg={item} index={index} selectedDest={selectedDest} />
            ) : (
              <RoomCard key={item.id} room={item} index={index} selectedDest={selectedDest} />
            ),
          )
        )}
      </div>
    </section>
  );
}
