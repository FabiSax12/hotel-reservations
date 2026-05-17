# Feature Specification: Rooms — Dynamic Listing & Detail Expansion

**Status:** in-progress (Phase 2 / US-DM-02)
**Version:** 2.0
**Depends on:** `search` feature (destination state), `@hotel/ui` (Calendar, Button), `@hotel/i18n`

---

## 1. Objective

Allow clients to browse all active room types for a selected location **without entering dates first**. Once a location is selected (auto-selected when only one exists), rooms cascade into view. Each room card offers progressive disclosure: a surface view of key info, and an expanded panel with full gallery, amenities, and admin recommendations. The CTA on each card is conditional on whether search dates have been chosen.

---

## 2. Scope & Boundaries

### In Scope (US-DM-02)
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

### Out of Scope (Do Not Modify)
* Advanced filtering (by price, room type, capacity, exact dates) → US-DM-03.
* Real backend integration → after DB layer is chosen.
* Mock data is excluded from i18n.
* Booking confirmation / payment flow → future US.
* Mobile hamburger nav → layout feature scope.

---

## 3. Architecture & Context

### New Folders Created
```
features/rooms/
├── components/
│   ├── RoomList.tsx          (modified: accepts RoomsContext, removed hasSearched gate)
│   ├── RoomCard.tsx          (refactored: orchestrator consuming RoomsContext)
│   ├── RoomImagePanel.tsx    (modified: expand button, adminTip overlay)
│   ├── RoomPriceTier.tsx     (modified: price hidden when !hasDates)
│   └── sub-components/
│       ├── RoomCardHeader.tsx     (NEW: name, capacity, inventory chip)
│       ├── RoomCardMeta.tsx       (NEW: type chip, sqft, description)
│       ├── RoomCardGallery.tsx    (NEW: expanded gallery + amenities)
│       ├── RoomCardCTA.tsx        (NEW: conditional CTA orchestrator)
│       ├── QuickSearchDialog.tsx  (NEW: inline date+guest picker)
│       └── AvailabilityCalendarDialog.tsx  (NEW: read-only availability calendar)
├── constants/
│   └── rooms.constants.ts    (NEW)
├── context/
│   └── RoomsContext.tsx      (NEW: selectedLocation, hasDates, expandedRoomId, isReserving)
├── domain/
│   ├── types.ts              (modified: +capacity, +amenities, +adminTip, +images, +availableDates)
│   └── filters.ts            (unchanged)
├── hooks/
│   ├── useRoomAvailability.ts  (NEW: mock availability resolver)
│   └── useRoomExpansion.ts     (NEW: expand/collapse state per card)
├── i18n/
│   ├── rooms.texts.ts        (modified: new keys)
│   └── roomsTexts.type.ts    (modified: new keys)
└── mock-data/
    └── rooms.ts              (modified: populated new fields + dynamic dates)
```

### Core Files Involved
| File | Role |
|------|------|
| `context/RoomsContext.tsx` | Distributes `selectedLocation`, `hasDates`, `searchDates`, `expandedRoomId`, `isReserving` without prop drilling |
| `hooks/useRoomAvailability.ts` | Deterministic availability check (mock). Returns `{ isAvailable, isLoading, error }` |
| `hooks/useRoomExpansion.ts` | Wraps `setExpandedRoomId` from context; provides `isExpanded`, `handleExpand`, `handleCollapse` |
| `components/sub-components/RoomCardCTA.tsx` | Renders one of three CTAs based on `(hasDates, isAvailable)` |
| `components/sub-components/QuickSearchDialog.tsx` | Inline panel using `@hotel/ui` Calendar; fires `onSearch` |
| `components/sub-components/AvailabilityCalendarDialog.tsx` | Read-only calendar with `room.availableDates` |
| `mock-data/rooms.ts` | Source of truth for dev. `availableDates` computed at import time using `Date.now()` |

### System Constraints & Known Pitfalls
* `Room.availableDates` is generated at module load time to simulate real dynamic data; never hardcode year-specific strings.
* `QuickSearchDialog` must call `onSearch` from the **page orchestrator** (`page.tsx`), not from inside the rooms feature. Pass it via `RoomsContext`.
* The expand animation uses `grid-template-rows: 0fr → 1fr` transition, never `height` directly.
* Only **one** room can be expanded at a time (controlled by a single `expandedRoomId` in context).
* `hasDates` is `true` only when **both** `checkIn` and `checkOut` are non-empty strings.
* Scroll-lock: set `document.body.style.overflow = 'hidden'` while `!selectedLocation`. Remove when location is set. Use `useEffect` cleanup to guarantee removal.
* `@hotel/ui` Calendar is a read-only picker when `readOnly` prop is passed.

---

## 4. Domain — Updated `Room` Type

```typescript
export interface Room {
  id: string;
  location: string;
  title: string;
  type: string;
  price: number;           // per night (USD) — only displayed when hasDates
  capacity: number;        // max guests (adults + children combined)
  inventory: number;       // rooms available
  sqft: number;            // m²
  description: string;
  adminTip: string;        // admin recommendation shown as a badge
  image: string;           // hero image URL
  images: string[];        // 0–3 additional image URLs for gallery
  amenities: string[];     // e.g. ["WiFi", "AC", "Jacuzzi"]
  availableDates: string[]; // ISO date strings, computed dynamically
}
```

---

## 5. State Machine — Card CTA

```
hasDates = false
  └─ Show: "Ver disponibilidad" (ghost)
       └─ onClick → open QuickSearchDialog (inline date+guest picker)
            └─ onConfirm → onSearch(params) → page.tsx transitions to State B

hasDates = true
  ├─ isLoading = true
  │    └─ Show: skeleton pulse on CTA
  ├─ isAvailable = true
  │    └─ Show: "Reservar" (filled primary button)
  │         └─ onClick → setIsReserving(true) → show spinner
  │              └─ (mock 1s delay) → navigate to booking flow
  └─ isAvailable = false
       └─ Card: opacity 50%, pointer-events limited
            └─ Show: "Ver fechas libres" (text button)
                 └─ onClick → open AvailabilityCalendarDialog
```

---

## 6. Acceptance Criteria (US-DM-02)

* [x] Room list renders immediately after a location is selected (no dates required). *(architecture completed)*
* [x] When only one location exists, it is auto-selected on load. *(logic in `ModernSearchBar`; `RoomsContext` subscribes)*
* [ ] Hero scroll is locked until a location is selected.
* [x] Rooms appear with staggered cascade entrance animations. *(existing)*
* [ ] Cards show: image, name, capacity, available-room count, `adminTip` badge. *(capacity + adminTip are new)*
* [x] No price displayed without dates. *(new `hasDates` gate in `RoomPriceTier`)*
* [ ] Each card has an expand toggle that opens the gallery + amenities panel with a smooth `grid-template-rows` animation.
* [ ] `QuickSearchDialog` opens when no dates are set and user clicks CTA; collects dates + guests; fires `onSearch` on confirm.
* [ ] Rooms with dates show "Reservar" CTA with loader.
* [ ] Unavailable rooms show reduced opacity and "Ver fechas libres" button that opens `AvailabilityCalendarDialog`.
* [ ] All async paths (availability check, reservation mock) show loading and error states.
* [ ] All mock data uses dynamically calculated future dates.
* [ ] New i18n keys are type-safe and registered in `translations.ts`.

---

## 7. i18n — New Keys Required

| Key | ES | EN |
|-----|----|----|
| `CAPACITY_LABEL` | `"Capacidad"` | `"Capacity"` |
| `AMENITIES_TITLE` | `"Amenidades"` | `"Amenities"` |
| `ADMIN_TIP_LABEL` | `"Recomendación"` | `"Recommendation"` |
| `EXPAND_DETAILS` | `"Ver detalles"` | `"See details"` |
| `COLLAPSE_DETAILS` | `"Cerrar detalles"` | `"Close details"` |
| `RESERVE_ACTION` | `"Reservar"` | `"Book now"` |
| `LOADING_RESERVE` | `"Procesando..."` | `"Processing..."` |
| `CHECK_DATES_ACTION` | `"Ver disponibilidad"` | `"Check availability"` |
| `SEE_FREE_DATES` | `"Ver fechas libres"` | `"See available dates"` |
| `UNAVAILABLE_LABEL` | `"No disponible"` | `"Unavailable"` |
| `QUICK_SEARCH_TITLE` | `"Elige tus fechas"` | `"Choose your dates"` |
| `AVAIL_CALENDAR_TITLE` | `"Días libres"` | `"Available days"` |
| `GUESTS_LABEL` | `"Huéspedes"` | `"Guests"` |
| `CONFIRM_SEARCH` | `"Buscar habitaciones"` | `"Search rooms"` |

---

## 8. Handoff & Status Notes

* **Current State:** Phase 1 scaffolding complete (US-DM-01 over-implementation). Cards show price always, no expansion, no conditional CTA.
* **Next Step:** Implement in order:
  1. `domain/types.ts` — expand Room type.
  2. `mock-data/rooms.ts` — populate new fields.
  3. `constants/rooms.constants.ts` — thresholds, delays.
  4. `context/RoomsContext.tsx` — shared state.
  5. `hooks/useRoomAvailability.ts` + `useRoomExpansion.ts`.
  6. Sub-components (`RoomCardHeader`, `RoomCardMeta`, `RoomCardGallery`, `RoomCardCTA`).
  7. `QuickSearchDialog` + `AvailabilityCalendarDialog`.
  8. Refactor `RoomCard` to consume context + new sub-components.
  9. Refactor `RoomPriceTier` — hide price when `!hasDates`.
  10. i18n keys + theme keys.
  11. `page.tsx` — `RoomsProvider` wrapping, scroll-lock logic.
