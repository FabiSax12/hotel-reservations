# Feature Specification: Rooms — Dynamic Listing, Detail Expansion & Smart Grouping

**Status:** in-progress (Phase 3 / US-DM-04)
**Version:** 3.0
**Depends on:** `search` feature (destination + guest count), `@hotel/ui` (Calendar, Button), `@hotel/i18n`

---

## 1. Objective

Allow clients to browse all active room types for a selected location **without entering dates first**. Once a location is selected (auto-selected when only one exists), rooms cascade into view. Each room card offers progressive disclosure: a surface view of key info, and an expanded panel with full gallery, amenities, and admin recommendations. The CTA on each card is conditional on whether search dates have been chosen.

In Phase 3 (US-DM-04), the guest count from the search bar influences the room listing by **intelligently grouping rooms into packages** when a single room cannot accommodate all guests. Packages are displayed as stacked cards with a clear visual indicator.

---

## 2. Scope & Boundaries

### In Scope (US-DM-02 — completed)
* Rooms section renders as soon as a location is selected — no dates required.
* Auto-selection of location when only one exists (`REGIONS_CONFIG.length === 1`).
* Scroll-lock: the hero section scroll is locked until a location is selected (via `RoomsContext` + CSS on `<body>`).
* Cascade entrance animations (staggered `slide-in-from-bottom` + `fade-in`) with a 120ms delay per card.
* Inventory chip shows plain count (e.g. "8 habitaciones") when no dates are selected.
  Only shows "disponibles para sus fechas" after dates have been set.
* Room cards do **not** show type label ("Standard", "Suite") or sqft — these fields are stripped
  from the display (still exist in the domain type for future use).
* Admin tip is displayed as an editorial pull-quote element in the card body (NOT as an image overlay).
  It uses a decorative quote glyph and italic styling.
* **No price is shown** until a location + dates are both present (price depends on date range and occupancy).
* Each card has an expand toggle that animates open (using `grid-template-rows` transition) to reveal:
  - Additional image gallery (up to 3 extra images, horizontal scroll on mobile).
  - Full room description.
  - Amenities list as styled tags.
* CTA is rendered by `RoomCardCTA` and is fully conditional:
  - **No dates selected** → "Ver disponibilidad" ghost button → opens `RoomAvailabilityCalendar`
    (room-specific inline calendar popover with available dates highlighted, booked days faded).
    Selecting an available date fires `onSearch` on the page orchestrator and transitions to State B.
  - **Dates selected + room available** → "Reservar" filled button with spinner loader while `isReserving`.
  - **Dates selected + room unavailable** → Card opacity reduced, "Ver fechas libres" text button → also opens `RoomAvailabilityCalendar`.
* `RoomAvailabilityCalendar`: absolutely-positioned popover anchored above the CTA.
  Shows a month-view calendar where only `room.availableDates` are selectable (emerald highlight).
  Booked days are rendered at ~40% opacity. Closing happens on outside-click.
  Guest panel (QuickSearchDialog) has been **removed** — guests default to 2 adults when triggered from the room card.
* Loading and error states for every async path (mock-simulated with a configurable delay).
* All mock data uses **dynamically calculated future dates** at import time (never hardcoded past dates).

### In Scope (US-DM-04 — NEW)
* **Guest-driven room grouping:** When the total guest count (adults + children) exceeds a single room's capacity, the system automatically creates **room packages** — combinations of 2+ rooms that together accommodate all guests.
* **Package domain type:** A `RoomPackage` wraps a primary room (the most expensive), zero or more secondary rooms, total capacity, and total price per night.
* **Package grouping algorithm** (`domain/grouping.ts`):
  - Greedy bin-packing: sort rooms by capacity descending, then fill remaining guests with the smallest sufficient room.
  - Rejects absurd splits: a room's capacity must not exceed the remaining guest count by more than `MAX_WASTE` (e.g., 2 extra spots). This prevents suggesting a 7-person room for 1 remaining guest.
  - Prefers fewer rooms: if a single room covers all guests, it's not a package.
  - Prefers same-type packages: when possible, group identical rooms (shown as "x2", "x3" indicators).
* **Package card UI:**
  - The primary card (most expensive room) renders exactly like a normal `RoomCard`.
  - Behind it, 1-2 decorative "shadow cards" are rendered offset below (purely visual, no data loaded until click).
  - A **package indicator badge** appears below the primary card:
    - Same-type packages: `"x2"`, `"x3"` etc.
    - Mixed-type packages: `"+1 habitación"`, `"+2 habitaciones"`.
  - The price shown is the **total package price per night** (sum of all rooms in the package).
* **Package CTA:** Same logic as individual rooms (conditional on dates/availability), but the "Reservar" action will be handled in US-DM-05 (package detail exploration).
* **RoomsContext extension:** The context now also distributes `guestCount` (from search params) so the grouping algorithm can run.
* **No absurd suggestions:** The grouping algorithm is deterministic and rejects wasteful combinations.

### Out of Scope (Do Not Modify)
* Package detail exploration / side panel for viewing individual rooms in a package → US-DM-05.
* Advanced filtering (by price, room type, capacity, exact dates) → US-DM-03.
* Real backend integration → after DB layer is chosen.
* Mock data is excluded from i18n.
* Booking confirmation / payment flow → future US.
* Mobile hamburger nav → layout feature scope.

---

## 3. Architecture & Context

### New/Modified Files for US-DM-04
```
features/rooms/
├── domain/
│   ├── types.ts              (modified: +RoomPackage, +PackageRoomEntry)
│   └── grouping.ts           (NEW: smart room grouping algorithm)
├── hooks/
│   └── useRoomPackages.ts    (NEW: consumes guestCount + rooms → RoomPackage[])
├── components/
│   ├── RoomList.tsx           (modified: renders RoomCard or PackageCard)
│   ├── PackageCard.tsx        (NEW: orchestrator for a room package)
│   └── sub-components/
│       ├── PackageBadge.tsx   (NEW: "+1 habitación" / "x2" indicator)
│       └── PackageShadow.tsx  (NEW: decorative stacked card behind primary)
├── constants/
│   └── rooms.constants.ts    (modified: +GROUPING_MAX_WASTE, +GROUPING_MAX_ROOMS)
└── i18n/
    ├── rooms.texts.ts        (modified: +package indicator keys)
    └── roomsTexts.type.ts    (modified: +package indicator types)
```

### Core Files Involved
| File | Role |
|------|------|
| `domain/grouping.ts` | Pure function: `groupRoomsIntoPackages(rooms, guestCount) → RoomPackage[]` |
| `hooks/useRoomPackages.ts` | Orchestrates grouping: consumes `RoomsContext.guestCount` + filtered rooms, returns packages |
| `components/PackageCard.tsx` | Renders primary card + shadow cards + package badge |
| `components/sub-components/PackageBadge.tsx` | Displays "+1 habitación" or "x2" indicator |
| `components/sub-components/PackageShadow.tsx` | Decorative stacked card (no data, just visual) |
| `context/RoomsContext.tsx` | Extended with `guestCount` from search params |

### System Constraints & Known Pitfalls
* The grouping algorithm must be a **pure function** in `domain/grouping.ts` — no hooks, no JSX, no side effects.
* `RoomPackage.primaryRoom` is always the most expensive room in the group.
* Shadow cards are **decorative only** — they do not load room data, images, or amenities. Data is loaded in US-DM-05 when the user clicks to explore.
* The package indicator text must use i18n keys (pluralization rules: "1 habitación" vs "habitaciones").
* `guestCount` flows from the search bar → `page.tsx` → `RoomsContext`. It is `adults + children`.
* The grouping algorithm runs **after** location filtering but **before** rendering. It's a `useMemo` in `useRoomPackages`.
* Package cards use the same entrance animation as individual cards (stagger continues seamlessly).
* Total package price = sum of `room.price` for all rooms in the package. Display as "desde $X/noche".

---

## 4. Domain — New Types for US-DM-04

```typescript
/** A single room entry within a package. */
export interface PackageRoomEntry {
  room: Room;
  /** How many of this exact room type are in the package (≥ 1). */
  count: number;
}

/** A group of rooms that together accommodate the guest count. */
export interface RoomPackage {
  /** Unique identifier for the package (e.g. "pkg-mv-1-mv-2"). */
  id: string;
  /** The most expensive room — rendered as the primary card. */
  primaryRoom: Room;
  /** Secondary rooms rendered as decorative shadow cards. */
  secondaryRooms: PackageRoomEntry[];
  /** Total capacity across all rooms in the package. */
  totalCapacity: number;
  /** Sum of all room prices per night. */
  totalPricePerNight: number;
  /** Whether all rooms in the package are the same type. */
  isHomogeneous: boolean;
  /** Display label for the package indicator (e.g. "+1 habitación", "x2"). */
  indicatorLabel: string;
}
```

---

## 5. Grouping Algorithm — `domain/grouping.ts`

```
INPUT:  rooms: Room[], guestCount: number
OUTPUT: (Room | RoomPackage)[]

1. If guestCount ≤ 0 or rooms is empty → return rooms as-is (no grouping).

2. Filter: only rooms where room.capacity ≥ 1 are eligible.

3. Sort eligible rooms by capacity DESC, then by price DESC (tie-break).

4. For each room:
   a. If room.capacity >= guestCount → emit as individual Room (no package needed).
   b. Else → attempt to build a package:
      i.   Start with this room as primary. remaining = guestCount - room.capacity.
      ii.  While remaining > 0:
           - Find the smallest room where capacity ≤ remaining + MAX_WASTE.
           - If no valid room found → skip this room (cannot form a valid package).
           - Add to package. remaining -= that room.capacity.
           - If package exceeds MAX_ROOMS → skip (too many rooms).
      iii. If package has 2+ rooms → emit as RoomPackage.
           - primaryRoom = most expensive room in package.
           - secondaryRooms = grouped by type with count.
           - indicatorLabel = if homogeneous → "x{count}", else → "+{n} habitación(es)".

5. Deduplicate: if a package covers the same rooms as another, keep only the cheaper one.

6. Sort results: individual rooms first, then packages by totalPricePerNight ASC.
```

### Constraints
- `MAX_WASTE = 2`: a room's capacity must not exceed remaining guests by more than 2.
- `MAX_ROOMS = 4`: no package may contain more than 4 rooms.
- Algorithm is deterministic and pure — same inputs always produce same output.

---

## 6. Acceptance Criteria (US-DM-04)

* [ ] When guest count > 0 and no single room can accommodate all guests, the listing shows room packages instead of (or alongside) individual rooms.
* [ ] A package displays the most expensive room as the primary card, with decorative shadow cards stacked behind it.
* [ ] Package indicator badge shows "+1 habitación" or "+X habitaciones" for mixed-type packages.
* [ ] Package indicator badge shows "x2" or "xX" for homogeneous packages (all same room type).
* [ ] Package total price = sum of all room prices per night, displayed as the card's price.
* [ ] The grouping algorithm rejects absurd splits (e.g., 7-person room for 1 remaining guest).
* [ ] The grouping algorithm prefers fewer rooms and same-type groupings when possible.
* [ ] Shadow cards are purely decorative — no room data loaded until the user clicks (US-DM-05 scope).
* [ ] Package cards use the same entrance animation as individual cards.
* [ ] `guestCount` is distributed via `RoomsContext` (sourced from search params).
* [ ] New i18n keys for package indicators are type-safe and registered in `translations.ts`.
* [ ] All existing US-DM-02 acceptance criteria continue to pass (no regressions).
* [ ] `domain/grouping.ts` has unit tests covering edge cases (0 guests, single room sufficient, no valid package, homogeneous, heterogeneous, MAX_WASTE rejection).

---

## 7. i18n — New Keys Required (US-DM-04)

| Key | ES | EN |
|-----|----|----|
| `PACKAGE_INDICATOR_SAME` | `"x{count}"` | `"x{count}"` |
| `PACKAGE_INDICATOR_MIXED` | `"+{count} habitación"` / `"+{count} habitaciones"` | `"+{count} room"` / `"+{count} rooms"` |
| `PACKAGE_TOTAL_PRICE_LABEL` | `"Total por noche"` | `"Total per night"` |
| `PACKAGE_ROOMS_LABEL` | `"habitaciones"` | `"rooms"` |

---

## 8. Handoff & Status Notes

* **Current State:** Phase 2 (US-DM-02) implementation complete. Room listing with conditional CTA, expansion, and availability calendar working.
* **Next Step (US-DM-04):** Implement in order:
  1. `domain/types.ts` — add `RoomPackage`, `PackageRoomEntry` interfaces.
  2. `domain/grouping.ts` — implement grouping algorithm with unit tests.
  3. `constants/rooms.constants.ts` — add `GROUPING_MAX_WASTE`, `GROUPING_MAX_ROOMS`.
  4. `context/RoomsContext.tsx` — extend with `guestCount`.
  5. `hooks/useRoomPackages.ts` — consume context, run grouping, memoize.
  6. `components/sub-components/PackageBadge.tsx` — indicator badge.
  7. `components/sub-components/PackageShadow.tsx` — decorative shadow card.
  8. `components/PackageCard.tsx` — orchestrator: primary + shadows + badge.
  9. `components/RoomList.tsx` — render packages alongside individual rooms.
  10. `i18n/rooms.texts.ts` + `roomsTexts.type.ts` — new keys.
  11. `page.tsx` — pass `guestCount` into `RoomsProvider`.
