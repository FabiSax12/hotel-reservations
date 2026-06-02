import { useCallback } from "react";
import { AVAILABILITY_OPTIONS } from "@/features/rooms/constants/availabilityOptions";
import type { RoomCategory } from "@/features/rooms/constants/info.constants";

const ALL_KEY = "all";

interface UseRoomsFilterHandlersParams {
  category: RoomCategory | null;
  minCapacity: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  available: boolean | null;
  onCategoryChange: (category: RoomCategory | null) => void;
  onMinCapacityChange: (capacity: number | null) => void;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  onAvailabilityChange: (available: boolean | null) => void;
}

export function useRoomsFilterHandlers({
  category,
  minPrice,
  maxPrice,
  available,
  onCategoryChange,
  onMinCapacityChange,
  onPriceRangeChange,
  onAvailabilityChange,
}: UseRoomsFilterHandlersParams) {
  // --- Category ---
  const selectedCategoryKey = category ?? ALL_KEY;

  const handleCategoryChange = useCallback(
    (key: React.Key | null) => {
      const strKey = String(key);
      onCategoryChange(strKey === ALL_KEY ? null : (strKey as RoomCategory));
    },
    [onCategoryChange],
  );

  // --- Capacity ---
  const handleCapacityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number.parseInt(e.target.value, 10);
      onMinCapacityChange(Number.isNaN(num) || num < 1 ? null : num);
    },
    [onMinCapacityChange],
  );

  // --- Price min ---
  const handlePriceMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number.parseFloat(e.target.value);
      onPriceRangeChange(Number.isNaN(num) ? null : num, maxPrice);
    },
    [onPriceRangeChange, maxPrice],
  );

  // --- Price max ---
  const handlePriceMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number.parseFloat(e.target.value);
      onPriceRangeChange(minPrice, Number.isNaN(num) ? null : num);
    },
    [onPriceRangeChange, minPrice],
  );

  // --- Availability ---
  const selectedAvailabilityKey =
    available === null
      ? ALL_KEY
      : available
        ? AVAILABILITY_OPTIONS.AVAILABLE.id
        : AVAILABILITY_OPTIONS.UNAVAILABLE.id;

  const handleAvailabilityChange = useCallback(
    (key: React.Key | null) => {
      const strKey = String(key);
      if (strKey === ALL_KEY) {
        onAvailabilityChange(null);
      } else {
        const option = Object.values(AVAILABILITY_OPTIONS).find((opt) => opt.id === strKey);
        onAvailabilityChange(option?.value ?? null);
      }
    },
    [onAvailabilityChange],
  );

  return {
    selectedCategoryKey,
    handleCategoryChange,
    handleCapacityChange,
    handlePriceMinChange,
    handlePriceMaxChange,
    selectedAvailabilityKey,
    handleAvailabilityChange,
  };
}
