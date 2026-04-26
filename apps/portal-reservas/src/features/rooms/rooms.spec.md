# Feature Specification: Rooms Display

**Status:** in-progress (Transitioning to US-DM-02)
**Version:** 1.0

## 1. Objective
Render a dynamic list of hotel rooms filtered by the user's destination parameters. Initially using mock data for the preliminary list (US-DM-01), with upcoming expansions for detailed views, availability checks, and reservation flows (US-DM-02).

## 2. Scope & Boundaries
**In Scope:**
* UI implementation of `RoomCard` displaying location, pricing, and basic availability.
* Basic domain filtering logic based on the `destination` search parameter.
* Staggered entrance animations for the room list.
* **Upcoming (US-DM-02):** Card expansion for extra details, summary search dialog for missing dates, and the reservation checkout flow.

**Out of Scope (Do Not Modify):**
* Advanced filtering (by price, guest count, exact dates) and sorting belong to US-DM-03.
* Mock data is explicitly excluded from internationalization (i18n).

## 3. Architecture & Context
**Core Files Involved:**
* `features/rooms/mock-data/rooms.ts` (Target for mock data updates)
* `features/rooms/components/RoomList.tsx` (Target for list layout changes)
* `features/rooms/components/RoomCard.tsx` (Target for individual card UI changes)
* `features/rooms/domain/filters.ts` (Target for domain logic modification)
* `features/rooms/domain/filters.test.ts` (Target for tests)

**System Constraints & Known Pitfalls:**
* Data schema must remain simple and strictly typed via `Room` interface to ensure smooth future migration to a live API.
* Hero scrolling must be disabled until a headquarters is selected.

## 4. Acceptance Criteria (US-DM-02)
* [x] Once a headquarters is selected, all active room types are displayed using cascading entrance animations.
* [x] Room list correctly filters based on destination parameters.
* [x] Basic card displays image, name, capacity, available rooms, and a recommendation badge.
* [ ] **Pending:** Cards must expand to show additional images, descriptions, and amenities.
* [ ] **Pending:** If no dates are selected, the card must show a button that opens a summary search dialog before redirecting to the full search.
* [ ] **Pending:** Available rooms must feature a 'Reserve' button that initiates the booking flow, complete with loaders and error handling.
* [ ] **Pending:** Unavailable rooms must appear opaque with an option to open a calendar showing available dates.

## 5. Handoff & Status Notes
* **Current State:** Preliminary list scaffolding is complete (Over-implemented in US-DM-01). Cards visually react to destination search parameters.
* **Next Step:** Implement the detailed card expansion, date selection from within the card, and the booking flow (US-DM-02).
