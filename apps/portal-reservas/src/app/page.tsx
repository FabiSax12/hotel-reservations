"use client";

import { useState } from "react";
import type { SearchParams } from "../features/search/domain/types";
import { mockRooms } from "../features/rooms/mock-data/rooms";
import { Background } from "../features/layout/components/Background";
import { Header } from "../features/layout/components/Header";
import { HeroSearch } from "../features/search/components/HeroSearch";
import { RoomList } from "../features/rooms/components/RoomList";
import { filterRoomsByDestination } from "../features/rooms/domain/filters";

export default function HomePage() {
  const [hasSearched, setHasSearched] = useState(false);
  const [heroCalendarActive, setHeroCalendarActive] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: 'Todos',
    checkIn: '15 Oct',
    checkOut: '21 Oct',
    adults: 2,
    children: 0,
    pets: 0
  });

  const handleSearchTrigger = (params: any) => {
    setSearchParams(params);
    setHasSearched(true);
    setSearchKey(prev => prev + 1);
  };

  const handleReset = () => {
    setHasSearched(false);
    setHeroCalendarActive(false);
  };

  const selectedDest = searchParams.destination;
  const filteredRooms = filterRoomsByDestination(mockRooms, selectedDest);

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-emerald-900 selection:text-emerald-50">
      
      <Background />
      
      <Header 
        hasSearched={hasSearched}
        searchParams={searchParams}
        onReset={handleReset}
        onSearch={handleSearchTrigger}
      />

      {!hasSearched && (
        <HeroSearch 
          onSearch={handleSearchTrigger}
          heroCalendarActive={heroCalendarActive}
          setHeroCalendarActive={setHeroCalendarActive}
        />
      )}

      {hasSearched && (
        <RoomList 
          rooms={filteredRooms}
          selectedDest={selectedDest}
          searchKey={searchKey}
        />
      )}

    </main>
  );
}
