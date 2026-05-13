/**
 * @file amenity-icons.const.ts — Amenity icon mapping for room cards.
 *
 * Maps amenity strings to SVG path data and labels.
 * Used in PackageCardSummary room tree and RoomCard detail popover.
 *
 * Icons are minimal, line-style SVGs that match the natural/premium aesthetic.
 * Only the most important amenities get icons; the rest fall back to a generic tag.
 */

export interface AmenityIcon {
  /** SVG path data (used inside a 20×20 viewBox). */
  path: string;
  /** Accessible label for the icon. */
  label: string;
  /** Stroke-based icon (true) or fill-based (false). */
  isStroke: boolean;
}

/**
 * Top amenities with dedicated icons.
 * Keys are matched case-insensitively against room.amenities[].
 * Order determines display priority (first = most important).
 */
export const AMENITY_ICON_MAP: Record<string, AmenityIcon> = {
  "WiFi": {
    path: "M1 8.5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2zm12-4a7 7 0 015.2 2.4M16.7 8a4.5 4.5 0 013 2M3 12.5a10 10 0 0114 0",
    label: "WiFi",
    isStroke: true,
  },
  "Jacuzzi exterior": {
    path: "M2 16h16M4 16V8a4 4 0 014-4h4a4 4 0 014 4v8M7 4v1M13 4v1M6 12h.01M10 12h.01M14 12h.01",
    label: "Jacuzzi",
    isStroke: true,
  },
  "Piscina privada": {
    path: "M2 15c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M2 11c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M4 7V5a2 2 0 012-2h1M14 7V5a2 2 0 012-2h1",
    label: "Piscina",
    isStroke: true,
  },
  "Piscina infinity": {
    path: "M2 15c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M2 11c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M4 7V5a2 2 0 012-2h1M14 7V5a2 2 0 012-2h1",
    label: "Infinity pool",
    isStroke: true,
  },
  "Desayuno incluido": {
    path: "M3 11h18M5 11V7a7 7 0 0114 0v4M3 11v2a2 2 0 002 2h14a2 2 0 002-2v-2M8 7V4M12 7V4M16 7V4",
    label: "Desayuno",
    isStroke: true,
  },
  "Aguas termales privadas": {
    path: "M12 2C9 2 6 5 6 9c0 4 6 9 6 9s6-5 6-9c0-4-3-7-6-7zm0 4a2 2 0 110 4 2 2 0 010-4z",
    label: "Termales",
    isStroke: true,
  },
  "Chef privado": {
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    label: "Chef",
    isStroke: true,
  },
  "Mayordomo 24h": {
    path: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v5l3 3",
    label: "Mayordomo",
    isStroke: true,
  },
  "Spa privado": {
    path: "M12 2C9 2 6 5 6 9c0 4 6 9 6 9s6-5 6-9c0-4-3-7-6-7zm-3 8a3 3 0 016 0",
    label: "Spa",
    isStroke: true,
  },
  "Vista al volcán": {
    path: "M2 18l4-8 3 4 3-6 4 10M14 6l2-2 2 2M12 2v2",
    label: "Vista volcán",
    isStroke: true,
  },
  "Vista al dosel": {
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    label: "Vista dosel",
    isStroke: true,
  },
  "Terraza privada": {
    path: "M3 21h18M3 21V10l9-7 9 7v11M9 21v-6h6v6",
    label: "Terraza",
    isStroke: true,
  },
  "AC": {
    path: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
    label: "AC",
    isStroke: true,
  },
  "Minibar": {
    path: "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 7h14M12 3v18",
    label: "Minibar",
    isStroke: true,
  },
  "Servicio de habitación": {
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    label: "Room service",
    isStroke: true,
  },
  "Masajes a domicilio": {
    path: "M12 2C9 2 6 5 6 9c0 4 6 9 6 9s6-5 6-9c0-4-3-7-6-7zm0 4a2 2 0 110 4 2 2 0 010-4z",
    label: "Masajes",
    isStroke: true,
  },
  "Cocina completa": {
    path: "M3 11h18M5 11V7a7 7 0 0114 0v4M3 11v2a2 2 0 002 2h14a2 2 0 002-2v-2",
    label: "Cocina",
    isStroke: true,
  },
  "Fogata privada": {
    path: "M12 2C9 5 7 8 7 11a5 5 0 0010 0c0-3-2-6-5-9zm0 7a2 2 0 110 4 2 2 0 010-4z",
    label: "Fogata",
    isStroke: true,
  },
  "Piscina mineral": {
    path: "M2 15c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M2 11c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0",
    label: "Piscina mineral",
    isStroke: true,
  },
};

/** Bed type display labels (Spanish). */
export const BED_TYPE_LABELS: Record<string, string> = {
  king: "King",
  queen: "Queen",
  individual: "Individual",
  litera: "Litera",
  "sofá cama": "Sofá cama",
};

/**
 * Gets the icon for an amenity, or null if no dedicated icon exists.
 */
export function getAmenityIcon(amenity: string): AmenityIcon | null {
  return AMENITY_ICON_MAP[amenity] ?? null;
}

/**
 * Formats a bed configuration into a human-readable string.
 * Example: [{type:"king",count:1},{type:"individual",count:2}] → "1 King · 2 Individual"
 */
export function formatBedConfig(
  beds: Array<{ type: string; count: number }>,
): string {
  return beds
    .map((b) => `${b.count} ${BED_TYPE_LABELS[b.type] ?? b.type}`)
    .join(" · ");
}
