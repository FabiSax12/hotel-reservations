/**
 * @file RoomsInnerPage.tsx — Wires the rooms providers around the viewport.
 *
 * Builds the RoomsContext value and nests the RoomDetailProvider so the detail
 * panel state is colocated with the components that consume it. The actual page
 * chrome lives in RoomsViewport, which consumes RoomDetailContext to reflow when
 * the panel opens.
 */

"use client";

import { RoomDetailProvider } from "../features/room-detail";
import { RoomsProvider } from "../features/rooms/context/RoomsContext";
import { RoomsViewport } from "./RoomsViewport";
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
        <RoomsViewport
          hasSearched={hasSearched}
          selectedLocation={selectedLocation}
          heroCalendarActive={heroCalendarActive}
          setHeroCalendarActive={setHeroCalendarActive}
          searchParams={searchParams}
          searchKey={searchKey}
          isSearchingData={isSearchingData}
          filteredRooms={filteredRooms}
          onSearchTrigger={onSearchTrigger}
          onDestinationChange={onDestinationChange}
          onReset={onReset}
        />
      </RoomDetailProvider>
    </RoomsProvider>
  );
}
