/**
 * @file ModernSearchBar.tsx — Top-level search bar orchestrator.
 *
 * This is the architectural centerpiece of the search feature. It contains
 * ZERO business logic — purely a wiring layer that:
 *
 * 1. Instantiates 7 custom hooks, each owning a distinct concern:
 *    - useSearchBarState: UI state (active section, hero flags, refs)
 *    - useSearchValidation: validation errors, shake animation
 *    - useDestinationState: destination string, auto-selection
 *    - useDateSelection: check-in/check-out state
 *    - useGuestsSelection: adults/children/pets counts
 *    - useSearchTrigger: submission + section activation interception
 *    - useSearchBarContextValue: assembles all above into a single context value
 *
 * 2. Wraps everything in a SearchBarProvider (React Context) so sub-components
 *    can consume state without prop drilling.
 *
 * 3. Renders conditionally: HeroCalendarFloat (hero mode only), then SearchBarFrame.
 *
 * The orchestrator pattern: hooks own logic, context distributes it, sub-components render it.
 */

"use client";

import { SearchBarProvider } from "../context/SearchBarContext";
import type { SearchBarProps } from "../domain/types";
import { useModernSearchBar } from "../hooks/useModernSearchBar";
import { SEARCH_BAR_STYLES as S } from "../theme/search-bar.theme";
import { HeroCalendarFloat } from "./HeroCalendarFloat";
import { SearchBarFrame } from "./SearchBarFrame";

export function ModernSearchBar(props: SearchBarProps) {
  const { contextValue, containerRef, isHero } = useModernSearchBar(props);

  return (
    <SearchBarProvider value={contextValue}>
      <div ref={containerRef} className={`${S.container} ${props.className || ""}`}>
        {isHero && <HeroCalendarFloat />}
        <SearchBarFrame />
      </div>
    </SearchBarProvider>
  );
}
