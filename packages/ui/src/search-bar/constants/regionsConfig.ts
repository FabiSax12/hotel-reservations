/**
 * @file regionsConfig.ts — Destination data for the DestinationPopover.
 *
 * Each entry defines a selectable resort region displayed in the "Sede"
 * dropdown. The `name` field must match the `location` values used in
 * the portal's room mock data, as it is the key used for filtering.
 *
 * The `highlights` array provides bullet-point selling points shown in
 * the hover-preview panel beside the destination list.
 */

export const REGIONS_CONFIG = [
  { 
    name: "Arenal & La Fortuna", 
    desc: "Volcanes, aguas termales, selvas tropicales", 
    icon: "🌋",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop",
    highlights: ["Habitaciones con vista al volcán", "Aguas termales minerales privadas", "Aventuras de senderismo incrustadas"],
    priceFrom: 180
  },
  { 
    name: "Monteverde", 
    desc: "Bosques nubosos, tirolesas, vida silvestre", 
    icon: "☁️",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
    highlights: ["Inmersión en el bosque nuboso", "Eco-lodges exclusivos y privados", "Avistamiento de fauna exótica"],
    priceFrom: 145
  },
];
