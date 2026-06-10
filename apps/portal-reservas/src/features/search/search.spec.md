# Feature Specification: Search Orchestrator & UI

**Status:** completed (Phase 1 / US-DM-01) | completed (Phase 2 / US-DM-02) | in-progress (Phase 3 / US-DM-04 — guest count integration)
**Version:** 3.0
**Depends on:** `@hotel/ui` (Calendar, Button), `@hotel/i18n`

---

## 1. Objective

Implement a high-performance, locale-aware, interactive search bar orchestrator that manages complex destination, date, and guest selection logic across two distinct UI modes (cinematic Hero Search and Sticky Compact Bar) without prop drilling. In Phase 2, the search bar's destination selection also drives the `RoomsContext` — activating the rooms listing below the hero.

---

## 2. Scope & Boundaries

### In Scope (Phase 1 — completed)
* React Context API (`SearchBarContext`) eliminating prop drilling.
* Smart Flow Progression: automatic section activation (Destination → Check-In → Check-Out → Guests).
* Full i18n support via `@/locales` for all labels, date formats, and error messages.
* Destination selection with image/price preview hover panel (`DestinationPopover`).
* Dynamic multi-month Calendar popup (`@hotel/ui` injection), full-screen in Hero mode.
* Guest selection via increment/decrement steppers.
* Orchestration between State A (hero landing) and State B (post-search results).
* Complete elimination of magic strings via `search.constants.ts`.
* Auto-selection of destination when `REGIONS_CONFIG.length === 1`.

### In Scope (Phase 2 / US-DM-02 — completed)
* The `destination` value in `SearchBarContext` must be surfaced to the `RoomsContext` at the page-orchestrator level (passed down via `page.tsx`), so that rooms activate when a destination is chosen.
* The `QuickSearchDialog` (inside rooms feature) uses the same search bar's `@hotel/ui` Calendar — no new calendar component is needed.
* The compact search bar in State B (sticky) must pass `searchParams` into `RoomsContext` so that `hasDates` and `searchDates` are updated.

### In Scope (Phase 3 / US-DM-04 — NEW)
* The `adults` and `children` values from `SearchBarContext` must be surfaced to `RoomsContext` as `guestCount` (total = adults + children), so the rooms feature can run the smart grouping algorithm.
* `guestCount` updates reactively when the user changes guest counts in either the hero search bar or the sticky compact bar.
* When `guestCount` is 0 or not set, the rooms feature falls back to individual room listing (no grouping).

### Out of Scope (Do Not Modify)
* Do not integrate with live backend endpoints. The search bar outputs a typed `SearchParams` object to the parent — nothing more.
* Do not implement new fields in `SearchParams` (e.g., room type filter) — that belongs to US-DM-03.
* The grouping algorithm itself lives in the `rooms` feature — the search feature only provides the raw `guestCount` number.

---

## 3. Architecture & Context

### Core Files Involved
| Layer | File |
|-------|------|
| Context | `features/search/components/search-bar/context/SearchBarContext.tsx` |
| Orchestrator | `features/search/components/search-bar/sub-components/ModernSearchBar.tsx` |
| Hooks | `useSearchBarState.ts`, `useDateSelection.ts`, `useGuestsSelection.ts`, `useSearchValidation.ts`, `useDestinationPreview.ts` |
| Sub-components | `SearchBarFrame.tsx`, `SearchBarFields.tsx`, `DestinationPopover.tsx`, `HeroCalendarFloat.tsx`, `GuestsPopover.tsx` |
| Constants | `search.constants.ts`, `regionsConfig.ts`, `regionsMock.ts`, `guests.constants.ts` |
| i18n | `search.texts.ts`, `searchTexts.type.ts` |
| Theme | `search-bar.theme.ts` (in `features/search/components/search-bar/theme/`) |
| Spec | `search.spec.md` |

### SearchParams Type
```typescript
interface SearchParams {
  destination: string;  // "Monteverde" | "Arenal & La Fortuna" | SEARCH_VALS.DESTINATION_ALL
  checkIn:     string;  // locale short string, e.g. "15 Oct"
  checkOut:    string;  // locale short string, e.g. "21 Oct"
  adults:      number;
  children:    number;
  pets:        number;
}
```

### System Constraints & Known Pitfalls
* Must be strictly typed; no `any` types.
* `ModernSearchBar` must remain UI-agnostic regarding its internal inputs.
* `destination` state is initialized to `onlyOneSede || ""` — already handles auto-selection.
* `regionsMock.ts` and `regionsConfig.ts` are currently duplicates. Unify to a single `regionsConfig.ts` in a future cleanup pass (US-DM-03 scope).

---

## 4. Acceptance Criteria

### Phase 1 (US-DM-01) — Complete
* [x] Hero section includes controls for: headquarters, check-in/out dates, and number of guests. Missing data is visually indicated.
* [x] Search state managed via `SearchBarContext` — zero prop drilling.
* [x] Smart flow progression (HQ → Dates → Guests).
* [x] Full-screen Calendar in Hero mode; date correction supported.
* [x] Destination selection with image/price preview panel.
* [x] All texts and error messages integrated with i18n.

### Phase 2 (US-DM-02) — Complete
* [x] `destination` value from `SearchBarContext` is surfaced to `RoomsContext` via `page.tsx` — rooms activate when destination is chosen without requiring a full search submission.
* [x] `hasDates` in `RoomsContext` updates whenever `checkIn` and `checkOut` are both set (triggered from either the hero or the sticky compact bar).
* [x] `onlyOneSede` detection correctly causes auto-selection at mount (already works via `ModernSearchBar`; verify `page.tsx` passes it through).

### Phase 3 (US-DM-04) — Pending
* [ ] `adults` and `children` from `SearchBarContext` are surfaced to `RoomsContext` as `guestCount = adults + children`.
* [ ] `guestCount` updates reactively when guest steppers change in hero or compact bar.
* [ ] When `guestCount` is 0, rooms feature shows individual listings (no grouping).

---

## 5. Handoff & Status Notes

* **Current State:** Phase 2 complete. All core search bar functionality implemented and refactored to architecture standards. Destination and dates flow to RoomsContext.
* **Next Step (Phase 3):** In `page.tsx`, pass `adults + children` from search params to `RoomsProvider` as `guestCount`. No changes needed inside the search feature itself — the data is already available in `SearchParams`.
