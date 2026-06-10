import type { RefObject } from "react";

/**
 * @file types.ts — Room-feature domain types for Portal de Reservas.
 *
 * Defines the data shape for a single hotel room listing.
 * Updated in US-DM-02 to include capacity, amenities, adminTip, additional
 * images, and dynamically-computed available dates for mock availability logic.
 * Updated in US-DM-03 to include isFeatured (admin-defined highlight flag)
 * and add sort/filter UI types.
 */

/** Bed configuration entry. */
export interface BedConfig {
  /** Bed type (e.g. "king", "queen", "individual", "litera", "sofá cama"). */
  type: string;
  /** Number of beds of this type in the room. */
  count: number;
}

/**
 * A single room listing, mapped from the `rooms` table by the rooms service
 * (US-DM-07). Fields backed by the DB today are always present; fields with no
 * DB source yet are optional and the UI hides them until the schema catches up
 * (see the "DB-pending" block below).
 */
export interface Room {
  /** Unique identifier — the `rooms.id` UUID. */
  id: string;
  /** Human-readable room name — `rooms.name`. */
  title: string;
  /** Room category (e.g. "Standard", "Suite", "Deluxe") — `rooms.category`. */
  type: string;
  /** Nightly price in USD — `rooms.regular_fee`. Only shown when dates are selected. */
  price: number;
  /** Maximum guest capacity — `rooms.capacity_adults + capacity_kids`. */
  capacity: number;
  /**
   * Units available for the user's dates. No DB column exists yet, so the rooms
   * service assumes a single unit per room (US-DM-07). Used by the package
   * grouping/availability math; inventory-driven UI (scarcity badges) is hidden.
   */
  inventory: number;
  /** Full marketing description — `rooms.description`. */
  description: string;
  /** Amenity names from `amenities` joined via `room_amenities`. */
  amenities: string[];
  /**
   * ISO date strings (YYYY-MM-DD) of available check-in days, computed from the
   * room's reservations assuming an inventory of 1 (US-DM-07). Drives the
   * AvailabilityCalendarDialog.
   */
  availableDates: string[];
  /** Hero image URL — first `room_images` row by position. Undefined until uploaded (US-KA-06). */
  image?: string;
  /** Additional gallery image URLs — remaining `room_images` rows. Empty until uploaded. */
  images?: string[];

  // ─── DB-pending (US-DM-07): no source yet, hidden in the UI ─────────────────
  // These fields are intentionally optional and left undefined by the mapper.
  // The rendering code that consumes them is kept (guarded) so the feature
  // reappears automatically once the DB gains the backing columns/typing.
  /**
   * Resort destination/sede name. No `rooms.location`/region column yet, so the
   * destination filter degrades to the full pool and the location label is hidden.
   */
  location?: string;
  /** Bed configuration. No beds column/table yet — the bed rows are hidden. */
  beds?: BedConfig[];
  /** Administrator recommendation. No `rooms.admin_tip` column yet — the quote is hidden. */
  adminTip?: string;
  /**
   * Local check-in time "HH:MM". The data lives in `room_schedules`, but that
   * table is not yet in the `@hotel/db` generated types, so it is hidden.
   */
  checkInTime?: string;
  /** Local check-out time "HH:MM". Hidden for the same reason as `checkInTime`. */
  checkOutTime?: string;
}

// ─── Sub-Component Props ────────────────────────────────────────────────────

export interface AvailabilityCalendarDialogProps {
  /** Whether the inline panel is currently open. */
  isOpen: boolean;
  /** ISO date strings (YYYY-MM-DD) representing available check-in days. */
  availableDates: string[];
  /** Callback to close the panel. */
  onClose: () => void;
}

export interface GuestStepperProps {
  label: string;
  subtitle: string;
  value: number;
  min: number;
  onDecrement: () => void;
  onIncrement: () => void;
  decrementLabel: string;
  incrementLabel: string;
}

export interface QuickSearchDialogProps {
  isOpen: boolean;
  location: string;
  onClose: () => void;
}

export interface RoomCardCTAProps {
  room: Room;
}

/** A decorative stroke icon for the reserve/check-dates buttons. */
export interface CtaIconProps {
  /** SVG path data from CTA_ICON_PATHS. */
  path: string;
  className: string;
  strokeWidth: number;
}

export interface RoomCardHeaderProps {
  room: Room;
  selectedDest?: string | null;
}

export interface RoomCardMetaProps {
  room: Room;
}

export interface RoomImagePanelProps {
  room: Room;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export interface RoomCardProps {
  room: Room;
  index: number;
  selectedDest?: string | null;
}

export interface RoomListProps {
  rooms: Room[];
  selectedDest: string;
  searchKey: number;
  isLoading?: boolean;
  guestCount?: number;
}

export interface RoomPriceTierProps {
  room: Room;
}

export interface RoomRangeCalendarProps {
  availableDates: string[];
  location: string;
  roomId: string;
  onClose: () => void;
  /** Ref to the element the calendar should appear above (for fixed positioning). */
  anchorRef: RefObject<HTMLElement | null>;
  /** Callback to receive the portal root element (for click-outside detection). */
  onPortalRef?: (el: HTMLDivElement | null) => void;
}

// ─── Package Types (US-DM-04) ──────────────────────────────────────────────

/** A group of rooms that together accommodate the guest count. */
export interface RoomPackage {
  /** Unique identifier for the package (e.g. "pkg-mv-1-mv-2"). */
  id: string;
  /** All rooms in the package, sorted by price DESC. First = most expensive. */
  rooms: Room[];
  /** Total capacity across all rooms in the package. */
  totalCapacity: number;
  /** Sum of all room prices per night. */
  totalPricePerNight: number;
  /** Whether all rooms in the package are the same type. */
  isHomogeneous: boolean;
}

export interface PackageCardProps {
  pkg: RoomPackage;
  index: number;
  selectedDest?: string | null;
}

export interface PackageCardHeaderProps {
  rooms: Room[];
  isHomogeneous: boolean;
}

export interface PackageCardExpansionProps {
  pkg: RoomPackage;
  selectedDest?: string | null;
}

export interface PackageCardSummaryProps {
  rooms: Room[];
  totalCapacity: number;
  totalPricePerNight: number;
}

export interface PackageCardCTAProps {
  /** Whether dates are selected in the search bar. */
  hasDates: boolean;
  /** Whether the room is available for the selected dates. */
  isAvailable: boolean;
  /** Whether the availability check is still loading. */
  isLoading: boolean;
  /** Whether the user clicked "Reserve" and the action is pending. */
  isReserving: boolean;
  /** Whether the inline calendar popover is open. */
  isCalendarOpen: boolean;
  /** Toggles the inline calendar popover. */
  onToggleCalendar: () => void;
  /** Handles the reservation action. */
  onReserve: () => void;
}

// ─── Sort & Filter Types (US-DM-03) ─────────────────────────────────────────

/** Sort option for the room listing. (FEATURED removed in US-DM-07 — no DB flag.) */
export type RoomSortOption = "PRICE_ASC" | "PRICE_DESC";

/** Inclusive `[min, max]` numeric range used for price filters. */
export interface NumericRange {
  min: number;
  max: number;
}

/**
 * Active filter state applied to the visible room list.
 * Each collection-based group is a multi-select; an empty array means "no filter applied".
 */
export interface RoomFilters {
  /** Selected amenity tags (must match `Room.amenities` strings exactly). */
  amenities: string[];
  /** Selected room types (must match `Room.type`). */
  roomTypes: string[];
  /** Inclusive price range (USD). `null` = no price filter applied. */
  priceRange: NumericRange | null;
}

/**
 * Auto-derived attribute panel options for the current room list.
 * Computed from the rooms currently in scope (after destination filter).
 */
export interface RoomFilterAttributes {
  /** Unique amenity tags found in the current rooms (sorted). */
  amenities: string[];
  /** Unique room types found in the current rooms (sorted). */
  roomTypes: string[];
  /** Full price bounds in the current rooms — clamps the slider. */
  priceBounds: NumericRange;
}

/** Props for the SortControl dropdown. */
export interface SortControlProps {
  value: RoomSortOption;
  onChange: (next: RoomSortOption) => void;
}

/** Props for the FiltersPanel collapsible. */
export interface FiltersPanelProps {
  attributes: RoomFilterAttributes;
  filters: RoomFilters;
  onChange: (next: RoomFilters) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

/** Props for the top-level RoomFiltersBar that wires SortControl + FiltersPanel. */
export interface RoomFiltersBarProps {
  attributes: RoomFilterAttributes;
  filters: RoomFilters;
  onFiltersChange: (next: RoomFilters) => void;
  sort: RoomSortOption;
  onSortChange: (next: RoomSortOption) => void;
  onReset: () => void;
}

/** Props for sub-component groups inside FiltersPanel. */
export interface AmenityChipsFilterProps {
  options: string[];
  selected: string[];
  onToggle: (amenity: string) => void;
}

export interface RoomTypeChipsFilterProps {
  options: string[];
  selected: string[];
  onToggle: (type: string) => void;
}

export interface PriceRangeFilterProps {
  bounds: NumericRange;
  value: NumericRange;
  onChange: (next: NumericRange) => void;
}
