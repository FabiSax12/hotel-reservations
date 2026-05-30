/**
 * @file StickySearchBar.tsx — Compact search bar pinned below the header.
 *
 * Only rendered in State B (after the user has searched). It receives the
 * current search parameters as `initialState` so the compact bar's fields
 * reflect the most recent query. Submitting a new search from here
 * re-triggers the results with updated filters.
 */

import { HEADER_STYLES as S } from "../../../theme/layout.theme";
import { ModernSearchBar } from "../../search/components/search-bar";
import type { StickySearchBarProps } from "../domain/types";

export function StickySearchBar({ searchParams, onSearch }: StickySearchBarProps) {
  return (
    <div className={S.stickySearchBar}>
      <ModernSearchBar
        size="compact"
        className={S.compactSearchContainer}
        onSearch={onSearch}
        initialState={searchParams}
      />
    </div>
  );
}
