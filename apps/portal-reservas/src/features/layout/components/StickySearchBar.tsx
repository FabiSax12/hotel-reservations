/**
 * @file StickySearchBar.tsx — Compact search bar pinned below the header.
 *
 * Only rendered in State B (after the user has searched). It receives the
 * current search parameters as `initialState` so the compact bar's fields
 * reflect the most recent query. Submitting a new search from here
 * re-triggers the results with updated filters.
 */

import { ModernSearchBar } from "../../search/components/search-bar";
import type { SearchParams } from "../../search/domain/types";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

interface StickySearchBarProps {
  /** The current search parameters to pre-fill the compact bar fields. */
  searchParams: SearchParams;
  /** Callback invoked when the user submits a new search. */
  onSearch: (params: SearchParams) => void;
}

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
