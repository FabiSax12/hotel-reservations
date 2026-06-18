# Feature Specification: Room Detail Side Panel

**Status:** in-progress (US-DM-05)
**Version:** 1.0
**Depends on:** `rooms` (room data + availability/CTA building blocks, via its barrel), `@hotel/i18n`, `@hotel/ui` (Calendar through the rooms `RoomRangeCalendar`).

---

## 1. Objective

Let a client open a right-docked detail panel from any room or package in the
search results to digest every client-facing detail (image carousel + gallery,
key info, the full amenity list with descriptions, and a conditional reserve
CTA) without leaving the search interface. This is the deferred US-DM-05 panel;
it replaces the unwired US-DM-02 `RoomDetailsPopover` stub (removed).

This started as the `room-detail-panel` sub-feature inside `rooms` and was
promoted to its own top-level feature so it owns its UI, state, theme, i18n and
constants, with a flat `components/` folder.

---

## 2. Scope & Boundaries

### In Scope
* Opens from **both** search states — brief (location only) and full
  (`hasSearched`). Both render the same `RoomList`, so one implementation covers
  both.
* **Whole-card trigger:** clicking a room/package card opens the panel; the card
  CTA and the package expand toggle stay independently clickable (raised above a
  transparent trigger overlay). The active card is highlighted.
* **Layout:** desktop (`>=lg`) docks the panel on the right (full height) and
  reflows the header, hero and results left; below `lg` the panel is a
  full-screen sheet sliding in from the right over a scrim.
* **Per-room content:** hero carousel over `[image, ...images]` (arrows, dots,
  ArrowLeft/Right keyboard, pointer swipe), a thumbnail gallery that drives it,
  capacity/area/type chips, a scarcity chip, bed configuration, the admin-tip
  pull quote, the full description, and **every** amenity with its icon and
  description.
* **Package mode:** a banner shows the room count; each room is stacked as its
  own section with a "Room X of N" heading; the footer shows the total per night
  and reserves the package (availability via the primary room).
* **CTA:** mirrors the card CTA states (no dates / verifying / reserve /
  unavailable). Picking dates in the panel's availability calendar re-runs the
  search, but the panel stays open and updates — the selection lives **above**
  `RoomList`.
* **Close:** X button, Escape, re-clicking the active card, and (mobile) scrim
  tap; focus returns to the trigger. Body scroll is locked on mobile only.

### Out of Scope (Do Not Modify)
* The reservation / checkout action page — only the CTA is built.
* URL persistence of the open panel (client state only, consistent with US-DM-03).
* Real amenity descriptions from the DB — mirrored as mock data in the rooms
  feature for now (`AMENITY_CATALOG`, see §4).

---

## 3. Architecture

```
features/room-detail/
├── components/                 (flat — no sub-components/)
│   ├── RoomDetailPanel.tsx     (orchestrator: header / body / footer)
│   ├── RoomDetailHeader.tsx
│   ├── RoomDetailMedia.tsx     (carousel + gallery, shared index)
│   ├── RoomDetailCarousel.tsx
│   ├── RoomDetailGallery.tsx
│   ├── RoomDetailKeyInfo.tsx
│   ├── RoomDetailAmenities.tsx
│   ├── RoomDetailRoomSection.tsx   (reused for room + each package room)
│   ├── PackageRoomsView.tsx
│   ├── RoomDetailFooter.tsx
│   ├── RoomDetailCta.tsx
│   ├── RoomDetailMount.tsx      (mounts the panel above the list)
│   └── RoomDetailPush.tsx       (reflows the results when open)
├── context/RoomDetailContext.tsx   (RoomDetailProvider + useRoomDetail)
├── hooks/useImageCarousel.ts
├── domain/types.ts             (selection + panel component Props)
├── theme/room-detail.theme.ts  (ROOM_DETAIL_STYLES)
├── i18n/roomDetail.texts.ts + .type   (ROOM_DETAIL namespace)
├── constants/
│   ├── room-detail.constants.ts     (EXIT_MS, SWIPE_THRESHOLD_PX, MOBILE_QUERY)
│   └── room-detail-icons.const.ts   (ICON_VIEW_BOX / ICON_PATHS — no SVG data in .tsx)
└── index.ts

src/
├── components/RoomsViewport.tsx     (consumes useRoomDetail; pushes header/hero/list)
└── hooks/useMediaQuery.ts           (mobile-only scroll-lock gating)
```

### Dependency direction
`room-detail` consumes the rooms feature's public barrel for the room data and
the availability/CTA building blocks it reuses: `Room`, `RoomPackage`,
`useRoomsContext`, `usePackageCardState`, `RoomRangeCalendar`, `CTASpinner`,
`getAmenityIcon`, `formatBedConfig`. The rooms cards open the panel via
`useRoomDetail` from this feature's barrel.

---

## 4. Amenity descriptions — DB mirror

Amenity descriptions live in `public.amenities.description` (TEXT), joined to
rooms through `public.room_amenities` (migration
`20260505000000_create_amenities.sql`). US-DM-07 removed the mock amenity catalog;
`Room.amenities[]` now carries DB amenity names and the panel renders the names
only. Plumbing `amenities.description` through `Room.amenities` (richer objects) is
a follow-up so the detail list can show descriptions again.

---

## 5. Acceptance Criteria

* [x] The panel opens from both the brief and the full search interfaces.
* [x] Clicking a room (whole card, including the name) opens a right-side panel;
  the search interface (header, hero, results) reflows left.
* [x] The panel has an image carousel and an image gallery.
* [x] The panel shows the card's key info plus all client-facing room
  information (capacity, area, type, beds, admin tip, full description, price).
* [x] Every amenity is shown with its details (icon + name + description).
* [x] Package-aware: shows how many rooms are offered and which room is being
  viewed ("Room X of N" + room count banner).
* [x] Clear, availability-aware reserve CTA (action page out of scope); the
  availability calendar re-search keeps the panel open and updates it.
* [x] Clear close affordances (X / Escape / re-click / mobile scrim).
* [x] No regressions: `type-check` and production `build` are green.

---

## 6. i18n — `ROOM_DETAIL` namespace

| Key | ES | EN |
|-----|----|----|
| `OPEN_LABEL` | "Ver detalles de {title}" | "View details for {title}" |
| `CLOSE` | "Cerrar panel de detalles" | "Close details panel" |
| `PACKAGE_COUNT` | "{count} habitaciones en este paquete" | "{count} rooms in this package" |
| `ROOM_POSITION` | "Habitación {current} de {total}" | "Room {current} of {total}" |
| `CAROUSEL_LABEL` | "Galería en carrusel" | "Image carousel" |
| `CAROUSEL_ROLE` | "carrusel" | "carousel" |
| `PREV_IMAGE` / `NEXT_IMAGE` | "Imagen anterior" / "Imagen siguiente" | "Previous image" / "Next image" |
| `IMAGE_POSITION` | "Imagen {current} de {total}" | "Image {current} of {total}" |
| `GALLERY_LABEL` | "Galería de imágenes" | "Image gallery" |
| `CAPACITY_VALUE` | "Hasta {count} huéspedes" | "Up to {count} guests" |
| `ABOUT_TITLE` | "Sobre el hospedaje" | "About this stay" |
| `PRICE_PLACEHOLDER` | "Selecciona fechas para ver el precio" | "Select dates to see the price" |

Reused from the `ROOMS` namespace: `PRICE_LABEL`, `CURRENCY`,
`PACKAGE_TOTAL_LABEL`, `RESERVE_ACTION`, `PACKAGE_RESERVE`, `CHECK_DATES_ACTION`,
`SEE_FREE_DATES`, `UNAVAILABLE_LABEL`, `VERIFYING`, `LOADING_RESERVE`,
`SQFT_LABEL`, `LAST_ROOM`, `AMENITIES_TITLE`, `PACKAGE_LABEL`.

---

## 7. Handoff & Status Notes

* **Current State:** Panel implemented as a standalone feature; `type-check` and
  production `build` pass. Selection state lives above `RoomList` so the
  availability re-search keeps the panel open.
* **Next Step:** Wire the reserve CTA to the real reservation flow (US-DM action
  page) and swap `AMENITY_CATALOG` for the live `public.amenities` data.
