/**
 * @file RoomsViewport.tsx — Page chrome that reflows when the detail panel opens.
 *
 * Consumes RoomDetailContext (the only place that needs the open state) and
 * pushes the header, hero, and room list left so the right-docked detail panel
 * (US-DM-05) never covers them. Keeps the layout feature decoupled from rooms:
 * the Header just receives an `isDetailOpen` boolean.
 */

"use client";

import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { RoomDetailMount, RoomDetailPush, useRoomDetail } from "../features/room-detail";
import { RoomList } from "../features/rooms/components/RoomList";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { useRoomsReveal } from "../hooks/useRoomsReveal";
import { PAGE_STYLES } from "../theme/layout.theme";
import type { RoomsViewportProps } from "./RoomsViewport.types";

export function RoomsViewport({
  hasSearched,
  selectedLocation,
  heroCalendarActive,
  setHeroCalendarActive,
  searchParams,
  searchKey,
  isSearchingData,
  filteredRooms,
  onSearchTrigger,
  onDestinationChange,
  onReset,
}: RoomsViewportProps) {
  const { isOpen } = useRoomDetail();
  const roomsHidden = useRoomsReveal(heroCalendarActive, isSearchingData);

  return (
    <main className={PAGE_STYLES.main}>
      <Background />

      <Header
        hasSearched={hasSearched}
        searchParams={searchParams}
        onReset={onReset}
        onSearch={onSearchTrigger}
        isDetailOpen={isOpen}
      />

      {!hasSearched && (
        <RoomDetailPush>
          <HeroSearch
            onSearch={onSearchTrigger}
            onDestinationChange={onDestinationChange}
            heroCalendarActive={heroCalendarActive}
            setHeroCalendarActive={setHeroCalendarActive}
            hasLocation={!!selectedLocation}
          />
        </RoomDetailPush>
      )}

      {selectedLocation && !roomsHidden && (
        <RoomDetailPush>
          <div className={PAGE_STYLES.roomsWrapper(hasSearched, heroCalendarActive)}>
            <RoomList
              rooms={filteredRooms}
              selectedDest={selectedLocation}
              searchKey={searchKey}
              isLoading={isSearchingData}
            />
          </div>
        </RoomDetailPush>
      )}

      {/* Detail panel — mounted above the list so a re-search keeps it open. */}
      <RoomDetailMount />
    </main>
  );
}
