/**
 * @file Header.tsx — Top-level header orchestrator.
 *
 * Composes three sub-components:
 *  - {@link HeaderBrand} — The logo that resets the page to State A on click.
 *  - {@link HeaderNav}   — Help button and user account controls.
 *  - {@link StickySearchBar} — A compact search bar that only appears in
 *    State B (after the user has searched), pinned below the main header bar.
 */

import { HEADER_STYLES as S } from "../../../theme/layout.theme";
import type { SearchParams } from "../../search/domain/types";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderNav } from "./HeaderNav";
import { StickySearchBar } from "./StickySearchBar";

interface HeaderProps {
  /** Whether the user has triggered a search (activates the sticky search bar). */
  hasSearched: boolean;
  /** Current search parameters to seed into the compact bar. */
  searchParams: SearchParams;
  /** Callback to reset the page to the hero (State A). */
  onReset: () => void;
  /** Callback when a new search is submitted from the compact bar. */
  onSearch: (params: any) => void;
}

export function Header({ hasSearched, searchParams, onReset, onSearch }: HeaderProps) {
  return (
    <header className={S.root}>
      <div className={S.inner}>
        <HeaderBrand onReset={onReset} />
        <HeaderNav />
      </div>

      {/* Pinned compact search bar — only visible after the first search */}
      {hasSearched && <StickySearchBar searchParams={searchParams} onSearch={onSearch} />}
    </header>
  );
}
