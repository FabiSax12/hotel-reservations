/**
 * @file types.ts — Domain types for the room detail panel feature (US-DM-05).
 *
 * Pure TypeScript: no React, no hooks, no JSX. The room data types (`Room`,
 * `RoomPackage`) are consumed from the rooms feature via its public barrel.
 */

import type { ReactNode } from "react";
import type { Room, RoomPackage } from "@/features/rooms";

/**
 * What the side panel is currently showing: a single room or a full package.
 * Stored as a snapshot *above* the room list, so a re-search triggered from the
 * panel's own availability calendar keeps the panel open and simply updates it.
 */
export type RoomDetailSelection =
  | { kind: "room"; room: Room }
  | { kind: "package"; pkg: RoomPackage };

/** Shared state for the room detail panel, distributed via RoomDetailContext. */
export interface RoomDetailContextValue {
  /** Current selection, or null when the panel is closed. */
  selection: RoomDetailSelection | null;
  /** True while a selection is active (panel mounted/open). */
  isOpen: boolean;
  /** Opens the panel for a single room. */
  openRoom: (room: Room) => void;
  /** Opens the panel for a package (all its rooms). */
  openPackage: (pkg: RoomPackage) => void;
  /** Closes the panel and restores focus to the trigger element. */
  close: () => void;
}

export interface RoomDetailPushProps {
  children: ReactNode;
}

/** A 1-based position of a room within a package (e.g. room 2 of 3). */
export interface RoomPosition {
  current: number;
  total: number;
}

export interface RoomDetailPanelProps {
  selection: RoomDetailSelection;
  /** Whether the panel is open; drives the slide-in / slide-out transition. */
  isOpen: boolean;
  onClose: () => void;
}

export interface RoomDetailHeaderProps {
  /** Gold uppercase eyebrow (room location). */
  eyebrow: string;
  /** Main serif title. */
  title: string;
  /** Optional secondary line under the title. */
  subtitle?: string;
  onClose: () => void;
}

export interface RoomDetailRoomSectionProps {
  room: Room;
  /** Position within a package; omitted for a standalone room. */
  position?: RoomPosition;
}

export interface PackageRoomsViewProps {
  pkg: RoomPackage;
}

export interface RoomDetailMediaProps {
  /** Ordered image URLs (hero first, then additional images). */
  images: string[];
  /** Room title, used to build accessible image names. */
  title: string;
}

export interface RoomDetailCarouselProps {
  images: string[];
  index: number;
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export interface RoomDetailGalleryProps {
  images: string[];
  index: number;
  title: string;
  onSelect: (index: number) => void;
}

export interface RoomDetailKeyInfoProps {
  room: Room;
}

export interface RoomDetailAmenitiesProps {
  amenities: string[];
}

export interface RoomDetailFooterProps {
  /** Room whose availability drives the CTA (the primary room for packages). */
  room: Room;
  /** Amount to display: the room price, or the package total per night. */
  price: number;
  /** Whether this footer represents a package (changes label + CTA copy). */
  isPackage: boolean;
}

export interface RoomDetailCtaProps {
  /** Room whose availability drives the CTA (the primary room for packages). */
  room: Room;
  /** Whether this CTA reserves a package (changes the reserve copy). */
  isPackage: boolean;
}

/** Options for the image-carousel hook. */
export interface UseImageCarouselOptions {
  /** Total number of slides. */
  count: number;
}
