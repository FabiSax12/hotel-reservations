/**
 * @file RoomsInnerPage.tsx — Inner page that wires the rooms providers.
 *
 * Separated from the root page to keep the RoomsProvider + RoomDetailProvider
 * state colocated with the components that consume it, avoiding prop drilling.
 * The detail panel (US-DM-05) mounts here, above the room list, so a re-search
 * never unmounts an open panel.
 */

"use client";

import { useEffect, useState } from "react";
import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { RoomList } from "../features/rooms/components/RoomList";
import {
  RoomDetailMount,
  RoomDetailProvider,
  RoomDetailPush,
} from "../features/rooms/components/room-detail-panel";
import { RoomsProvider } from "../features/rooms/context/RoomsContext";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { PAGE_STYLES as S } from "../theme/layout.theme";
import type { RoomsInnerPageProps } from "./RoomsInnerPage.types";

export function RoomsInnerPage({
  hasSearched,
  selectedLocation,
  heroCalendarActive,
  setHeroCalendarActive,
  searchParams,
  searchKey,
  hasDates,
  isSearchingData,
  filteredRooms,
  prioritizedRoomId,
  onSearchTrigger,
  onDestinationChange,
  onReset,
}: RoomsInnerPageProps) {
  const [roomsHidden, setRoomsHidden] = useState(false);

  useEffect(() => {
    if (heroCalendarActive || isSearchingData) {
      // Scroll to top immediately so the user sees the calendar / loading state
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Hide rooms after the calendar finishes its entrance animation.
      // This prevents the room list from flashing underneath while the hero
      // calendar slides in; the 500 ms must match the CSS transition duration.
      const timer = setTimeout(() => setRoomsHidden(true), 500);
      return () => clearTimeout(timer);
    }
    // When calendar closes or search finishes, show rooms again immediately
    setRoomsHidden(false);
  }, [heroCalendarActive, isSearchingData]);

  const roomsContextValue = {
    selectedLocation,
    hasSearched,
    hasDates,
    searchDates: hasDates
      ? { checkIn: searchParams.checkIn, checkOut: searchParams.checkOut }
      : null,
    onSearch: onSearchTrigger,
    guestCount: (searchParams.adults ?? 0) + (searchParams.children ?? 0),
    prioritizedRoomId,
  };

  return (
    <RoomsProvider value={roomsContextValue}>
      <RoomDetailProvider>
        <main className={S.main}>
          <Background />

          <Header
            hasSearched={hasSearched}
            searchParams={searchParams}
            onReset={onReset}
            onSearch={onSearchTrigger}
          />

          {!hasSearched && (
            <HeroSearch
              onSearch={onSearchTrigger}
              onDestinationChange={onDestinationChange}
              heroCalendarActive={heroCalendarActive}
              setHeroCalendarActive={setHeroCalendarActive}
              hasLocation={!!selectedLocation}
            />
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
      </RoomDetailProvider>
    </RoomsProvider>
  );
}
