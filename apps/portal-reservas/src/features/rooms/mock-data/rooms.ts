/**
 * @file rooms.ts — Mock room data for Portal de Reservas.
 *
 * Placeholder dataset used during development. Four rooms per destination
 * (Monteverde and Arenal & La Fortuna) spanning all four room types
 * (Standard, Suite, Family, Villa) for a realistic demonstration.
 *
 * NOTE: This mock data is currently not internationalized (i18n). In a real
 * scenario, this content would be fetched from a backend API that serves
 * localized strings based on the user's selected language.
 *
 * This file should be replaced by an API fetch in a future iteration.
 * The `inventory` values intentionally include scarce rooms (≤ 2) to
 * exercise the urgency badge logic in {@link RoomImagePanel}.
 */

import type { Room } from "../domain/types";

export const mockRooms: Room[] = [
  // ─── Monteverde ────────────────────────────────────
  {
    id: "mv-1",
    location: "Monteverde",
    title: "Cabaña Estándar del Bosque",
    type: "Standard",
    price: 145,
    inventory: 8,
    sqft: 45,
    description:
      "Una inmersión acogedora en el bosque nuboso con ventanales de piso a techo y terraza de madera privada.",
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "mv-2",
    location: "Monteverde",
    title: "Suite Dosel Panorámica",
    type: "Suite",
    price: 280,
    inventory: 3,
    sqft: 80,
    description:
      "Nuestra suite elevada al nivel del dosel arbóreo. Avistamiento de aves desde tu tina de hidromasaje exterior.",
    image:
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: "mv-3",
    location: "Monteverde",
    title: "Eco-Lodge Familiar",
    type: "Family",
    price: 320,
    inventory: 2,
    sqft: 120,
    description:
      "Diseñada para familias, con habitaciones conectadas, cocina completa y área de fogata exclusiva.",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: "mv-4",
    location: "Monteverde",
    title: "Villa Quetzal Exclusiva",
    type: "Villa",
    price: 550,
    inventory: 1,
    sqft: 200,
    description:
      "El máximo lujo en la reserva. Incluye mayordomo privado, senderos exclusivos y piscina térmica incrustada en roca.",
    image:
      "https://images.unsplash.com/photo-1586500036065-2184d048dc53?q=80&w=2574&auto=format&fit=crop",
  },

  // ─── Arenal & La Fortuna ───────────────────────────
  {
    id: "lf-1",
    location: "Arenal & La Fortuna",
    title: "Habitación Vista Volcán",
    type: "Standard",
    price: 180,
    inventory: 12,
    sqft: 50,
    description:
      "Despierta con vistas directas e interrumpidas al coloso Arenal. Diseño minimalista con tina interior de piedra.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop",
  },
  {
    id: "lf-2",
    location: "Arenal & La Fortuna",
    title: "Suite Aguas Termales Privadas",
    type: "Suite",
    price: 350,
    inventory: 4,
    sqft: 90,
    description:
      "Tu propio paraíso termal en el patio trasero. Aguas minerales directas del flujo volcánico 24/7.",
    image:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=2600&auto=format&fit=crop",
  },
  {
    id: "lf-3",
    location: "Arenal & La Fortuna",
    title: "Lodge de Aventura",
    type: "Family",
    price: 290,
    inventory: 5,
    sqft: 110,
    description:
      "Base ideal para aventureros. Incluye muros de escalar infantiles y espacio para equipos.",
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "lf-4",
    location: "Arenal & La Fortuna",
    title: "Gran Villa Tabacón Signature",
    type: "Villa",
    price: 850,
    inventory: 1,
    sqft: 350,
    description:
      "Nuestra propiedad más extensa. Piscina infinity fundiéndose con la selva, servicio de chef privado y helipuerto.",
    image:
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=2574&auto=format&fit=crop",
  },
];
