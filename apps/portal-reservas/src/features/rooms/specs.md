# Feature Specification: Rooms Display

**Status:** draft
**Version:** 1.0

## 1. Objective
Scaffolding / placeholder implementation to render a list of hotel rooms filtered by the user's destination parameters using mock data.

## 2. Scope & Boundaries
**In Scope:**
* UI implementation of `RoomCard` displaying location, pricing, and availability.
* Basic domain filtering logic based on the `destination` search parameter.
* Consumption of static JSON mock data for demonstration purposes.

**Out of Scope (Do Not Modify):**
* Do not connect to a real database or API.
* Do not implement advanced filtering (e.g., by price, guest count, or exact dates) until the backend API is ready.
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

## 4. Acceptance Criteria
* [x] Condition 1: Room list correctly maps over mock data and renders staggered entrance animations.
* [x] Condition 2: Domain logic successfully filters rooms if the `destination` parameter matches, or returns all rooms if `DESTINATION_ALL` is selected.
* [x] Condition 3: Domain filtering has 100% test coverage in Vitest.

## 5. Handoff & Status Notes
* **Current State:** Scaffolding complete. The cards visually react to search parameters but data is static.
* **Next Step:** Implement data-fetching layer via `react-query` or Next.js Server Components once backend is deployed.
