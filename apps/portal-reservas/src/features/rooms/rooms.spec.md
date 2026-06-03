# Feature Specification: Rooms — Dynamic Listing, Detail Expansion & Smart Grouping

**Status:** in-progress (Phase 4 / US-DM-05)
**Version:** 4.0
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
  - Concrete example: for 3 guests, the algorithm must NOT suggest a package of 1× Standard (cap 2) + 1× Villa (cap 8) = 10 total capacity for 3 guests. The Villa exceeds the remaining 1 guest by 7, which violates MAX_WASTE=2.
  - Prefers fewer rooms: if a single room covers all guests, it's not a package.
  - Prefers same-type packages: when possible, group identical rooms (shown as "x2", "x3" indicators).
* **Package card UI:**
  - The primary card (most expensive room) renders exactly like a normal `RoomCard`.
  - Behind it, 1-3 decorative **shadow cards** are rendered offset below and behind the primary card. Shadow cards are **purely decorative** — they load ZERO data: no images, no amenities, no price, no description. They render as dark semi-transparent rectangles (`bg-forest-800/30 border border-forest-700/15`) with only the room type label (e.g., "Standard") in muted text. This follows the landing page's border-based depth model (no box-shadow on shadow cards).
  - Shadow cards are non-interactive: `cursor-default`, no hover effects, no click handlers.
  - A **package indicator badge** appears centered below the shadow card stack:
    - Same-type packages: `"x2"`, `"x3"` etc.
    - Mixed-type packages: `"+1 habitación"`, `"+2 habitaciones"`.
  - The price shown is the **total package price per night** (sum of all rooms in the package), displayed with a "Total por noche" label.
* **Listing count header:** The room list header counts packages as single items ("X opciones encontradas"), not by individual rooms within packages.
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
│   ├── types.ts              (modified: +RoomPackage, +PackageRoomEntry, +PackageCardProps)
│   └── grouping.ts           (NEW: smart room grouping algorithm)
├── hooks/
│   └── useRoomPackages.ts    (NEW: consumes guestCount + rooms → (Room | RoomPackage)[])
├── components/
│   ├── RoomList.tsx           (modified: renders RoomCard or PackageCard, counts options)
│   ├── PackageCard.tsx        (NEW: orchestrator for a room package)
│   └── sub-components/
│       ├── PackageBadge.tsx   (NEW: "+1 habitación" / "x2" indicator)
│       └── PackageShadow.tsx  (NEW: decorative stacked card behind primary)
├── constants/
│   └── rooms.constants.ts    (modified: +GROUPING_MAX_WASTE, +GROUPING_MAX_ROOMS)
└── i18n/
    ├── rooms.texts.ts        (modified: +package indicator keys, +ROOMS_OPTIONS_FOUND)
    └── roomsTexts.type.ts    (modified: +package indicator types, +ROOMS_OPTIONS_FOUND)
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
* Shadow cards are **decorative only** — they render a dark semi-transparent rectangle with only the room type label. No images, no amenities, no price, no description. Data is loaded in US-DM-05 when the user clicks to explore.
* Shadow cards use **border-based depth** (no box-shadow), consistent with the landing page's visual language.
* The package indicator text must use i18n keys (pluralization rules: "1 habitación" vs "habitaciones").
* `guestCount` flows from the search bar → `page.tsx` → `RoomsContext`. It is `adults + children`.
* The grouping algorithm runs **after** location filtering but **before** rendering. It's a `useMemo` in `useRoomPackages`.
* Package cards use the same entrance animation as individual cards (stagger continues seamlessly).
* Total package price = sum of `room.price` for all rooms in the package. Display as "Total por noche".
* Listing header counts packages as single items ("opciones encontradas"), not individual rooms within packages.

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
* [ ] Shadow cards are purely decorative — zero data loaded (no images, no amenities, no price, no description). They render as dark semi-transparent rectangles with only the room type label in muted text.
* [ ] Shadow cards are non-interactive: cursor-default, no hover effects, no click handlers.
* [ ] Package indicator badge shows "+1 habitación" or "+X habitaciones" for mixed-type packages.
* [ ] Package indicator badge shows "x2" or "xX" for homogeneous packages (all same room type).
* [ ] Package total price = sum of all room prices per night, displayed as the card's price with "Total por noche" label.
* [ ] The grouping algorithm rejects absurd splits. Concrete example: for 3 guests, it must NOT suggest 1× Standard (cap 2) + 1× Villa (cap 8), because the Villa exceeds remaining 1 guest by 7, violating MAX_WASTE=2.
* [ ] The grouping algorithm prefers fewer rooms and same-type groupings when possible.
* [ ] Shadow cards use border-based depth (no box-shadow), consistent with the landing page's visual language.
* [ ] Package cards use the same entrance animation as individual cards.
* [ ] Listing header counts packages as single items: "X opciones encontradas" (not individual rooms within packages).
* [ ] `guestCount` is distributed via `RoomsContext` (sourced from search params).
* [ ] New i18n keys for package indicators are type-safe and registered in `translations.ts`.
* [ ] All existing US-DM-02 acceptance criteria continue to pass (no regressions).
* [ ] `domain/grouping.ts` has unit tests covering edge cases (0 guests, single room sufficient, no valid package, homogeneous, heterogeneous, MAX_WASTE rejection, the "3 guests not 2+7" case).

---

## 7. i18n — New Keys Required (US-DM-04)

| Key | ES | EN |
|-----|----|----|
| `PACKAGE_INDICATOR_SAME` | `"x{count}"` | `"x{count}"` |
| `PACKAGE_INDICATOR_MIXED` | `"+{count} habitación"` / `"+{count} habitaciones"` | `"+{count} room"` / `"+{count} rooms"` |
| `PACKAGE_TOTAL_PRICE_LABEL` | `"Total por noche"` | `"Total per night"` |
| `PACKAGE_ROOMS_LABEL` | `"habitaciones"` | `"rooms"` |
| `ROOMS_OPTIONS_FOUND` | `"opciones encontradas"` | `"options found"` |

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

---

## 9. US-DM-03 — Dynamic Sort & Filter for the Full Search Interface

**Status:** in-progress (US-DM-03)
**Depends on:** US-DM-04 (built atop the package-grouped listing).

### 9.1 Scope & Boundaries

#### In Scope
* **Sort controls (AC #1):** A dropdown rendered above the card grid offers
  three options — *Destacados* (admin-defined), *Precio: menor a mayor* and
  *Precio: mayor a menor*. Implemented via `sortRooms` (Room[]) and
  `sortGroupedRooms` (Room | RoomPackage), keeping the visible order coherent
  across individuals and packages.
* **Expandable filters panel (AC #2):** A collapsible section under the sort
  dropdown holds three filter groups — amenities (multi-select chips, AND
  semantics), room types (multi-select chips, OR semantics) and an inclusive
  price-range with min/max inputs.
* **Auto-derived attributes (AC #3):** `extractFilterAttributes` rebuilds the
  panel options (sorted unique amenities, room types, price bounds) from the
  rooms in the current search. No hardcoded lists.
* **Admin-defined featured flag:** `Room.isFeatured` (boolean) drives the
  *Destacados* sort and a subtle `FeaturedBadge` rendered inside
  `RoomCardHeader`.
* **Post-search gate:** The `RoomFiltersBar` only mounts when
  `RoomsContext.hasSearched === true` — i.e. after the user presses
  *Buscar*, satisfying the AC wording *"el que aparece cuando se presiona
  buscar"*.
* **Empty-state UI:** When filters yield zero options the grid renders a
  dashed-border message with reset hint.

#### Out of Scope
* Persisting filters to URL/search params (defer until query-string layer lands).
* Server-side filtering — all logic is client-side over the mock list.
* Sorting/filtering inside an individual `PackageCard` (packages remain atomic).

### 9.2 Architecture

```
features/rooms/
├── domain/
│   ├── sorting.ts                      (NEW)
│   ├── filter-attributes.ts            (NEW)
│   ├── filters.ts                      (modified: +applyRoomFilters, +hasActiveFilters)
│   ├── types.ts                        (modified: +isFeatured, +RoomFilters,
│   │                                                +RoomFilterAttributes,
│   │                                                +RoomSortOption, +Props)
│   ├── sorting.test.ts                 (NEW)
│   ├── filter-attributes.test.ts       (NEW)
│   └── filters.test.ts                 (extended)
├── constants/
│   └── rooms-filters.constants.ts      (NEW — ROOM_SORT_OPTIONS, defaults)
├── hooks/
│   └── useRoomFilters.ts               (NEW — orchestrator hook)
├── components/
│   ├── RoomFiltersBar.tsx              (NEW)
│   ├── RoomList.tsx                    (modified — pipes through useRoomFilters)
│   └── sub-components/
│       ├── SortControl.tsx             (NEW)
│       ├── FiltersPanel.tsx            (NEW)
│       ├── AmenityChipsFilter.tsx      (NEW)
│       ├── RoomTypeChipsFilter.tsx     (NEW)
│       ├── PriceRangeFilter.tsx        (NEW)
│       ├── FeaturedBadge.tsx           (NEW)
│       └── RoomCardHeader.tsx          (modified — renders FeaturedBadge)
├── context/RoomsContext.tsx            (modified — +hasSearched)
└── i18n/
    ├── rooms.texts.ts                  (modified — SORT_*, FILTERS_*, FEATURED_BADGE)
    └── roomsTexts.type.ts              (modified — strict typing for new keys)
```

### 9.3 Pipeline

```
destination-filtered rooms (input from page state)
  -> applyRoomFilters(filters)            // intra-amenity AND, intra-type OR, inclusive price
  -> sortRooms(option)                    // FEATURED / PRICE_ASC / PRICE_DESC
  -> visibleRooms
  -> useRoomPackages(visibleRooms, guestCount, prioritizedRoomId)
  -> (Room | RoomPackage)[] rendered as RoomCard / PackageCard
```

Sort runs on the flat `Room[]` before grouping; the package-aware
`sortGroupedRooms` is exported from the barrel for callers that need to sort
a mixed result list directly. Packages inherit ordering from their primary
room's price (`totalPricePerNight`) and from any featured constituent room.

### 9.4 Acceptance Criteria

* [x] Sort controls offer "Destacados", "Precio: menor a mayor" and
  "Precio: mayor a menor" — implemented and tested in `sortRooms` /
  `sortGroupedRooms`.
* [x] Filters panel is expandable, hidden by default, and groups amenities,
  room types and price-range controls — `FiltersPanel` + sub-components,
  controlled by `RoomFiltersBar`'s local `isPanelOpen` state.
* [x] Filterable attributes are derived automatically from the rooms in the
  current search — `extractFilterAttributes` rebuilds on every input
  (memoized in `useRoomFilters`).
* [x] Featured rooms are visibly marked — `FeaturedBadge` rendered when
  `room.isFeatured`.
* [x] Sort + filter UI gated to `hasSearched === true` — only present in the
  full search interface (`RoomList` mounts `RoomFiltersBar` accordingly).
* [x] Empty result state shows a clear message with reset hint when filters
  exclude all rooms.
* [x] Unit tests cover all three sort options (rooms + grouped), all three
  filter groups including combined semantics, the attribute extractor and
  the `hasActiveFilters` predicate. **38/38 passing.**

### 9.5 i18n — New Keys

| Key | ES | EN |
|-----|----|----|
| `SORT_LABEL` | "Ordenar por" | "Sort by" |
| `SORT_FEATURED` | "Destacados" | "Featured" |
| `SORT_PRICE_ASC` | "Precio: menor a mayor" | "Price: low to high" |
| `SORT_PRICE_DESC` | "Precio: mayor a menor" | "Price: high to low" |
| `FILTERS_TITLE` | "Filtros" | "Filters" |
| `FILTERS_SHOW` / `FILTERS_HIDE` | "Mostrar filtros" / "Ocultar filtros" | "Show filters" / "Hide filters" |
| `FILTERS_RESET` | "Limpiar" | "Clear" |
| `FILTERS_AMENITIES_TITLE` | "Amenidades" | "Amenities" |
| `FILTERS_ROOM_TYPES_TITLE` | "Tipo de habitación" | "Room type" |
| `FILTERS_PRICE_RANGE_TITLE` | "Rango de precio" | "Price range" |
| `FILTERS_PRICE_MIN_LABEL` / `_MAX_LABEL` | "Precio mínimo" / "Precio máximo" | "Minimum price" / "Maximum price" |
| `FILTERS_NO_RESULTS` | "Ninguna opción coincide con los filtros" | "No options match the current filters" |
| `FILTERS_NO_RESULTS_HINT` | "Ajusta o limpia los filtros…" | "Adjust or clear the filters…" |
| `FILTERS_ACTIVE_BADGE` | "filtros activos" | "active filters" |
| `FEATURED_BADGE` | "Destacado" | "Featured" |

---

## 10. US-DM-05 — Room Detail Side Panel

US-DM-05 graduated into its own top-level feature. See
`features/room-detail/room-detail.spec.md`.

The rooms feature exposes the building blocks the panel reuses via its barrel:
`usePackageCardState`, `RoomRangeCalendar`, `CTASpinner`, `getAmenityIcon`,
`formatBedConfig`, `getAmenityDetail` (plus `Room` / `RoomPackage` /
`useRoomsContext`). The cards open the panel through `useRoomDetail` from
`features/room-detail`.
