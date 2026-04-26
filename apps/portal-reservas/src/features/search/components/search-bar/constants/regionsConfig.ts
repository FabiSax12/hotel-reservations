/**
 * @file regionsConfig.ts — Destination data for the DestinationPopover.
 *
 * ─── DEBUG VARIABLE ──────────────────────────────────────────────────────────
 * Change `DEBUG_SEDE_COUNT` to `1` to simulate a single-sede hotel
 * (the first region in the list will be auto-selected on load).
 * Change to `2` to test the full multi-sede selection flow.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Set to 1 or 2 to control how many sedes are exposed for testing. */
export const DEBUG_SEDE_COUNT: 1 | 2 = 2;

const ALL_REGIONS = [
  {
    name: "Arenal & La Fortuna",
    desc: "Volcanes, aguas termales, selvas tropicales",
    icon: "🌋",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop",
    highlights: [
      "Habitaciones con vista al volcán",
      "Aguas termales minerales privadas",
      "Aventuras de senderismo incrustadas",
    ],
    priceFrom: 180,
  },
  {
    name: "Monteverde",
    desc: "Bosques nubosos, tirolesas, vida silvestre",
    icon: "☁️",
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Inmersión en el bosque nuboso",
      "Eco-lodges exclusivos y privados",
      "Avistamiento de fauna exótica",
    ],
    priceFrom: 145,
  },
];

export const REGIONS_CONFIG = ALL_REGIONS.slice(0, DEBUG_SEDE_COUNT);
