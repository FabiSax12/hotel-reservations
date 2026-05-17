/**
 * @file types.ts — Props types for RoomsInnerPage component.
 */

import type { Room } from "../features/rooms/domain/types";
import type { SearchParams } from "../features/search/domain/types";

export interface RoomsInnerPageProps {
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
