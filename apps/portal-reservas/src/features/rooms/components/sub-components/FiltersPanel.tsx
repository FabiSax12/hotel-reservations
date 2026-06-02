/**
 * @file FiltersPanel.tsx — Collapsible panel grouping the per-attribute filter controls.
 *
 * Implements US-DM-03 AC #2 (expandable filter section) and AC #3
 * (attributes auto-derived from the current room list — driven by the
 * `attributes` prop, which the parent computes via `extractFilterAttributes`).
 *
 * Orchestrates three sub-components: AmenityChipsFilter, RoomTypeChipsFilter,
 * PriceRangeFilter. Each toggle handler produces an immutable next state.
 */

"use client";

import { ROOM_FILTERS_BAR_STYLES as S } from "../../../../theme/rooms.theme";
import type { FiltersPanelProps, NumericRange, RoomFilters } from "../../domain/types";
import { AmenityChipsFilter } from "./AmenityChipsFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RoomTypeChipsFilter } from "./RoomTypeChipsFilter";

const toggleFromList = (list: string[], value: string): string[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export function FiltersPanel({ attributes, filters, onChange, isOpen }: FiltersPanelProps) {
  const handleAmenityToggle = (amenity: string) => {
    onChange({ ...filters, amenities: toggleFromList(filters.amenities, amenity) });
  };

  const handleTypeToggle = (type: string) => {
    onChange({ ...filters, roomTypes: toggleFromList(filters.roomTypes, type) });
  };

  const handlePriceChange = (next: NumericRange) => {
    const isDefault =
      next.min === attributes.priceBounds.min && next.max === attributes.priceBounds.max;
    const nextFilters: RoomFilters = { ...filters, priceRange: isDefault ? null : next };
    onChange(nextFilters);
  };

  const priceValue: NumericRange = filters.priceRange ?? attributes.priceBounds;
  const hasPriceRange = attributes.priceBounds.max > attributes.priceBounds.min;

  return (
    <div className={S.panelGrid(isOpen)} aria-hidden={!isOpen}>
      <div className={S.panelInner}>
        <div className={S.panelContent}>
          <AmenityChipsFilter
            options={attributes.amenities}
            selected={filters.amenities}
            onToggle={handleAmenityToggle}
          />
          <RoomTypeChipsFilter
            options={attributes.roomTypes}
            selected={filters.roomTypes}
            onToggle={handleTypeToggle}
          />
          {hasPriceRange && (
            <PriceRangeFilter
              bounds={attributes.priceBounds}
              value={priceValue}
              onChange={handlePriceChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
