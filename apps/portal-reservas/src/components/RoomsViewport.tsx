/**
 * @file RoomsViewport.tsx — Page chrome that reflows when the detail panel opens.
 *
 * Consumes RoomDetailContext (the only place that needs the open state) and
 * pushes the header, hero, and room list left so the right-docked detail panel
 * (US-DM-05) never covers them. Keeps the layout feature decoupled from rooms:
 * the Header just receives an `isDetailOpen` boolean.
 */

"use client";

import { useEffect, useState } from "react";
import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { RoomList } from "../features/rooms/components/RoomList";
import {
  RoomDetailMount,
  RoomDetailPush,
  useRoomDetail,
} from "../features/rooms/components/room-detail-panel";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { PAGE_STYLES as S } from "../theme/layout.theme";
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
  const [roomsHidden, setRoomsHidden] = useState(false);

  useEffect(() => {
    if (heroCalendarActive || isSearchingData) {
      // Scroll to top immediately so the user sees the calendar / loading state
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Hide rooms after the calendar finishes its entrance animation (500 ms
      // must match the CSS transition) to avoid a flash underneath.
      const timer = setTimeout(() => setRoomsHidden(true), 500);
      return () => clearTimeout(timer);
    }
    setRoomsHidden(false);
  }, [heroCalendarActive, isSearchingData]);

  return (
    <main className={S.main}>
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
          <div className={S.roomsWrapper(hasSearched, heroCalendarActive)}>
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
