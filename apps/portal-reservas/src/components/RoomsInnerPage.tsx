/**
 * @file RoomsInnerPage.tsx — Inner page that owns expandedRoomId state.
 *
 * Separated from the root page to keep the RoomsProvider state colocated
 * with the components that consume it, avoiding prop drilling.
 */

"use client";

import { useState, useEffect } from "react";
import type { SearchParams } from "../features/search/domain/types";
import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { RoomList } from "../features/rooms/components/RoomList";
import { RoomsProvider } from "../features/rooms/context/RoomsContext";
import { PAGE_STYLES as S } from "../theme/layout.theme";
import type { Room } from "../features/rooms/domain/types";

interface RoomsInnerPageProps {
  hasSearched: boolean;
  selectedLocation: string | null;
  heroCalendarActive: boolean;
  setHeroCalendarActive: (v: boolean) => void;
  searchParams: SearchParams;
  searchKey: number;
  hasDates: boolean;
  isSearchingData: boolean;
  filteredRooms: Room[];
  onSearchTrigger: (params: SearchParams) => void;
  onDestinationChange: (dest: string) => void;
  onReset: () => void;
}

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
  onSearchTrigger,
  onDestinationChange,
  onReset,
}: RoomsInnerPageProps) {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (heroCalendarActive || isSearchingData) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    }
  }, [heroCalendarActive, isSearchingData]);

  const roomsContextValue = {
    selectedLocation,
    hasDates,
    searchDates: hasDates
      ? { checkIn: searchParams.checkIn, checkOut: searchParams.checkOut }
      : null,
    expandedRoomId,
    setExpandedRoomId,
    onSearch: onSearchTrigger,
  };

  return (
    <RoomsProvider value={roomsContextValue}>
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

        {selectedLocation && (
          <div className={S.roomsWrapper(hasSearched, heroCalendarActive)}>
            <RoomList
              rooms={filteredRooms}
              selectedDest={selectedLocation}
              searchKey={searchKey}
              isLoading={isSearchingData}
            />
          </div>
        )}
      </main>
    </RoomsProvider>
  );
}
