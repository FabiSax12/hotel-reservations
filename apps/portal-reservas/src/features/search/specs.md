# Feature Specification: Search Orchestrator & UI

**Status:** completed
**Version:** 1.0

## 1. Objective
Implement a high-performance, locale-aware, interactive search bar orchestrator that manages complex destination, date, and guest selection logic across two distinct UI modes (cinematic Hero Search and Sticky Compact Bar) without prop drilling.

## 2. Scope & Boundaries
**In Scope:**
* React Context API (`SearchBarContext`) implementation to securely manage cross-component state without prop drilling.
* **Smart Flow Progression:** Automatic focus/activation of next logical section (Destination -> Check-In -> Check-Out -> Guests) upon selection.
* **Full i18n Support:** Integration with the `@/locales` system for all labels, dynamic date formats, and error messages.
* Destination selection with an image/price preview hover panel.
* Dynamic, multi-month Calendar popup (`@hotel/ui` injection) with exact check-in/check-out range mapping and date-error shaking animations.
* Guest selection via numerical increment/decrement steppers.
* Orchestration between "State A" (landing page) and "State B" (post-search results).
* Complete elimination of magic strings via `search.constants.ts`.

**Out of Scope (Do Not Modify):**
* Do not attempt to integrate the search bar with live backend endpoints; it strictly passes validated `SearchParams` to the parent orchestrator (`app/page.tsx`).
* Do not modify `@hotel/ui` components to include app-specific logic (e.g., hardcoded "Hero" strings). 

## 3. Architecture & Context
**Core Files Involved:**
* **Context & Orchestration:**
  * `features/search/components/search-bar/context/SearchBarContext.tsx` (Target for state modification and type definitions of context values).
  * `features/search/components/search-bar/sub-components/ModernSearchBar.tsx` (The core orchestrator. It manages no UI natively but composes all hooks and provides the `SearchBarContext`).
* **Custom Hooks (State & Logic Split):**
  * `features/search/components/search-bar/hooks/useSearchBarState.ts` (Manages active tab, sizes, and open/close status).
  * `features/search/components/search-bar/hooks/useDateSelection.ts` (Handles date manipulation and automatically advancing to the guest tab).
  * `features/search/components/search-bar/hooks/useGuestsSelection.ts` (Tracks adult, child, and pet counts).
  * `features/search/components/search-bar/hooks/useSearchValidation.ts` (Manages error states, shaking animations, and empty-input validation).
  * `features/search/components/search-bar/hooks/useDestinationPreview.ts` (Fetches destination info for the hover-panel).
* **UI Presentation:**
  * `features/search/components/search-bar/sub-components/SearchBarFrame.tsx` (The physical wrapper for the search bar, dynamically rendering popovers based on active state).
  * `features/search/components/search-bar/sub-components/SearchBarFields.tsx` (The flex grid holding the 4 input blocks: Destination, CheckIn, CheckOut, Guests).
* **Constants & Integrations:**
  * `features/search/components/search-bar/constants/search.constants.ts` (Single source of truth for variants, sections, and default values).
  * `packages/ui/src/components/Calendar/CalendarPopover.tsx` (External UI component injected seamlessly into the search feature).

**System Constraints & Known Pitfalls:**
* Must be strictly typed; no `any` types. Destructuring of context values must be limited to exactly what the component uses to prevent unnecessary namespace collisions.
* `ModernSearchBar` must remain UI-agnostic regarding the internal inputs. It only acts as the state boundary.
* The file `HeroExpandTab.tsx` contains hardcoded inline styling, as it is a placeholder awaiting the upcoming "preview of rooms" feature. 

## 4. Acceptance Criteria
* [x] The top section (Hero) must include mandatory controls for: hotel location, check-in and check-out dates, and number of guests. In case of an empty field, the missing information must be indicated to the user.
* [x] The system must have a calendar selection system accessible enough to understand the user's intent as they choose or correct selected dates. In the Hero section, this calendar must cover the full screen.
* [x] When pressed in the Hero page, the search button must compress the search interface, remaining identical but more compact, for better visualization of the rooms found.

## 5. Handoff & Status Notes
* **Current State:** Refactoring complete. The component tree correctly uses the Context API and `@hotel/ui` libraries.
* **Next Step:** Await design specifications for the "preview of rooms" feature to refactor `HeroExpandTab.tsx`.
