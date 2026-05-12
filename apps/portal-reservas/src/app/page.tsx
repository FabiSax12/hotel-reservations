/**
 * @file page.tsx — Root page of the Portal de Reservas application.
 *
 * Acts as a pure composition layer — all state is delegated to
 * `useHomePageState` and all rendering to `RoomsInnerPage`.
 * No inline logic per architecture spec: app/ pages only compose.
 */

"use client";

import { useHomePageState } from "../hooks/useHomePageState";
import { RoomsInnerPage } from "../components/RoomsInnerPage";

export default function HomePage() {
  const state = useHomePageState();

  return (
    <RoomsInnerPage
      hasSearched={state.hasSearched}
      selectedLocation={state.selectedLocation}
      heroCalendarActive={state.heroCalendarActive}
      setHeroCalendarActive={state.setHeroCalendarActive}
      searchParams={state.searchParams}
      searchKey={state.searchKey}
      hasDates={state.hasDates}
      isSearchingData={state.isSearchingData}
      filteredRooms={state.filteredRooms}
      onSearchTrigger={state.handleSearchTrigger}
      onDestinationChange={state.handleDestinationChange}
      onReset={state.handleReset}
    />
  );
}
