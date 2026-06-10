import type { RoomCategory } from "@/features/rooms/constants/info.constants";

export interface RoomsFiltersProps {
  category: RoomCategory | null;
  minCapacity: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  available: boolean | null;
  isFiltered: boolean;
  resultCount: number;
  totalCount: number;
  onCategoryChange: (category: RoomCategory | null) => void;
  onMinCapacityChange: (capacity: number | null) => void;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  onAvailabilityChange: (available: boolean | null) => void;
  onClearFilters: () => void;
}
