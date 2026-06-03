/**
 * @file StickySearchBar.tsx — Compact search bar pinned below the header.
 *
 * Only rendered in State B (after the user has searched). It receives the
 * current search parameters as `initialState` so the compact bar's fields
 * reflect the most recent query. Submitting a new search from here
 * re-triggers the results with updated filters.
 */

import { ModernSearchBar } from "../../search/components/search-bar";
import type { StickySearchBarProps } from "../domain/types";
import { HEADER_STYLES } from "../../../theme/layout.theme";

export function StickySearchBar({ searchParams, onSearch }: StickySearchBarProps) {
  return (
    <div className={HEADER_STYLES.stickySearchBar}>
      <ModernSearchBar
        size="compact"
        className={HEADER_STYLES.compactSearchContainer}
        onSearch={onSearch}
        initialState={searchParams}
      />
    </div>
  );
}
