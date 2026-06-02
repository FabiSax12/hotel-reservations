"use client";

import { memo } from "react";
import { FILTER_BAR_STYLES as STYLES } from "@/features/rooms/components/list/RoomsFilters/RoomsFilters.styles";
import { useRoomsFilterHandlers } from "../../hooks/useRoomsFilterHandlers";
import { AvailabilityFilter } from "./AvailabilityFilter/AvailabilityFilter";
import { CapacityFilter } from "./CapacityFilter/CapacityFilter";
import { CategoryFilter } from "./CategoryFilter/CategoryFilter";
import { ClearFiltersButton } from "./ClearFiltersButton/ClearFiltersButton";
import { PriceMaxFilter } from "./PriceMaxFilter/PriceMaxFilter";
import { PriceMinFilter } from "./PriceMinFilter/PriceMinFilter";
import { ResultsSummary } from "./ResultsSummary/ResultsSummary";
import type { RoomsFiltersProps } from "./RoomsFilters.interface";

export const RoomsFilters = memo(
  ({
    category,
    minCapacity,
    minPrice,
    maxPrice,
    available,
    isFiltered,
    resultCount,
    totalCount,
    onCategoryChange,
    onMinCapacityChange,
    onPriceRangeChange,
    onAvailabilityChange,
    onClearFilters,
  }: RoomsFiltersProps) => {
    const {
      selectedCategoryKey,
      handleCategoryChange,
      handleCapacityChange,
      handlePriceMinChange,
      handlePriceMaxChange,
      selectedAvailabilityKey,
      handleAvailabilityChange,
    } = useRoomsFilterHandlers({
      category,
      minCapacity,
      minPrice,
      maxPrice,
      available,
      onCategoryChange,
      onMinCapacityChange,
      onPriceRangeChange,
      onAvailabilityChange,
    });

    return (
      <div>
        <div className={STYLES.bar}>
          <CategoryFilter selectedKey={selectedCategoryKey} onChange={handleCategoryChange} />

          <CapacityFilter
            defaultValue={minCapacity?.toString() ?? ""}
            onChange={handleCapacityChange}
          />

          <PriceMinFilter
            defaultValue={minPrice?.toString() ?? ""}
            onChange={handlePriceMinChange}
          />

          <PriceMaxFilter
            defaultValue={maxPrice?.toString() ?? ""}
            onChange={handlePriceMaxChange}
          />

          <AvailabilityFilter
            selectedKey={selectedAvailabilityKey}
            onChange={handleAvailabilityChange}
          />

          <div className={STYLES.spacer} />

          {isFiltered && <ClearFiltersButton onPress={onClearFilters} />}
        </div>

        {isFiltered && <ResultsSummary resultCount={resultCount} totalCount={totalCount} />}
      </div>
    );
  },
);
