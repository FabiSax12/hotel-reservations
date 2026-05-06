# Feature Specification: Search Orchestrator & UI

**Status:** completed (Phase 1 / US-DM-01)
**Version:** 1.0

## 1. Objective
Implement a high-performance, locale-aware, interactive search bar orchestrator that manages complex destination, date, and guest selection logic across two distinct UI modes (cinematic Hero Search and Sticky Compact Bar) without prop drilling.

## 2. Scope & Boundaries
**In Scope:**
* React Context API (`SearchBarContext`) implementation to securely manage cross-component state without prop drilling.
* **Smart Flow Progression:** Automatic focus/activation of next logical section (Destination -> Check-In -> Check-Out -> Guests) upon selection.
* **Full i18n Support:** Integration with the `@/locales` system for all labels, dynamic date formats, and error messages.
* Destination selection with an image/price preview hover panel.
* Dynamic, multi-month Calendar popup (`@hotel/ui` injection) covering the full screen in Hero mode.
* Guest selection via numerical increment/decrement steppers.
* Orchestration between "State A" (landing page) and "State B" (post-search results).
* Complete elimination of magic strings via `search.constants.ts`.

**Out of Scope (Do Not Modify):**
* Do not attempt to integrate the search bar with live backend endpoints; it strictly passes validated `SearchParams` to the parent orchestrator.

## 3. Architecture & Context
**Core Files Involved:**
* **Context & Orchestration:** `features/search/components/search-bar/context/SearchBarContext.tsx`, `ModernSearchBar.tsx`.
* **Custom Hooks:** `useSearchBarState.ts`, `useDateSelection.ts`, `useGuestsSelection.ts`, `useSearchValidation.ts`, `useDestinationPreview.ts`.
* **UI Presentation:** `SearchBarFrame.tsx`, `SearchBarFields.tsx`.
* **Constants & Integrations:** `search.constants.ts`, `CalendarPopover.tsx`.

**System Constraints & Known Pitfalls:**
* Must be strictly typed; no `any` types. 
* `ModernSearchBar` must remain UI-agnostic regarding the internal inputs.

## 4. Acceptance Criteria (US-DM-01)
* [x] The Hero section must include mandatory controls for: headquarters, check-in/out dates, and number of guests. Missing data must be visually indicated to the user.
* [x] The search state must be managed via a global Context, eliminating prop drilling.
* [x] The search bar must implement an automatic smart flow progression (Headquarters -> Dates -> Guests).
* [x] The calendar selection system must cover the full screen in the Hero section and allow intuitive date correction.
* [x] Destination selection must include a preview panel with images and quick information.
* [x] All texts, date formats, and error messages must be completely integrated with the internationalization (i18n) system.

## 5. Handoff & Status Notes
* **Current State:** Refactoring and implementation complete. The component tree correctly fulfills US-DM-01 requirements for the main search bar.
* **Next Step:** Await backend APIs to connect the validated output of the search bar to actual search queries.
