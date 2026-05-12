/**
 * @file types.ts — Room-feature domain types for Portal de Reservas.
 *
 * Defines the data shape for a single hotel room listing.
 * Updated in US-DM-02 to include capacity, amenities, adminTip, additional
 * images, and dynamically-computed available dates for mock availability logic.
 */

/** A single room listing as returned by the (future) reservation API. */
export interface Room {
  /** Unique identifier (e.g. "mv-1", "lf-2"). */
  id: string;
  /** Resort destination name (must match a value from REGIONS_CONFIG). */
  location: string;
  /** Human-readable room name. */
  title: string;
  /** Room category (e.g. "Standard", "Suite", "Family", "Villa"). */
  type: string;
  /** Average price per night in USD. Only shown when dates are selected. */
  price: number;
  /** Maximum guest capacity (adults + children combined). */
  capacity: number;
  /** Number of rooms currently available for the user's dates. */
  inventory: number;
  /** Room area in square meters. */
  sqft: number;
  /** Full marketing description of the room. */
  description: string;
  /** Short administrator recommendation shown as a badge on the card. */
  adminTip: string;
  /** Unsplash URL for the hero image of this room. */
  image: string;
  /** Up to 3 additional image URLs shown in the expanded gallery panel. */
  images: string[];
  /** List of included amenity tags (e.g. "WiFi", "Jacuzzi", "Terraza"). */
  amenities: string[];
  /**
   * ISO date strings (YYYY-MM-DD) representing available check-in days.
   * Generated dynamically at import time from today + offsets.
   * Used by the mock availability resolver and AvailabilityCalendarDialog.
   */
  availableDates: string[];
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

export interface RoomCardGalleryProps {
  room: Room;
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

export interface RoomDetailsPopoverProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export interface RoomRangeCalendarProps {
  availableDates: string[];
  location: string;
  onClose: () => void;
}

// ─── Package Types (US-DM-04) ──────────────────────────────────────────────

/** A single room entry within a package. */
export interface PackageRoomEntry {
  room: Room;
  /** How many of this exact room type are in the package (>= 1). */
  count: number;
}

/** A group of rooms that together accommodate the guest count. */
export interface RoomPackage {
  /** Unique identifier for the package (e.g. "pkg-mv-1-mv-2"). */
  id: string;
  /** The most expensive room — rendered as the primary card. */
  primaryRoom: Room;
  /** Secondary rooms as flat list (may include duplicates of same type). */
  secondaryRooms: Room[];
  /** Total capacity across all rooms in the package. */
  totalCapacity: number;
  /** Sum of all room prices per night. */
  totalPricePerNight: number;
  /** Whether all rooms in the package are the same type. */
  isHomogeneous: boolean;
  /** Display label for the package indicator (e.g. "+1 habitacion", "x2"). */
  indicatorLabel: string;
}

export interface PackageCardProps {
  pkg: RoomPackage;
  index: number;
  selectedDest?: string | null;
}
