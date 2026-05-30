/**
 * @file rooms.ts — Mock room data for Portal de Reservas.
 *
 * Updated in US-DM-02 to include: capacity, adminTip, images[], amenities[],
 * and availableDates[] (generated dynamically at import time so dates are
 * always in the future regardless of when the file is loaded).
 *
 * NOTE: Mock data is not internationalized. All content here is in Spanish
 * since it represents server-returned content (not UI labels).
 *
 * This file should be replaced by an API fetch in a future iteration.
 */

import { ROOM_MOCK } from "../constants/rooms.constants";
import type { Room } from "../domain/types";

// ─── Dynamic Date Generator ────────────────────────────────────────────────────
/**
 * Generates an array of future ISO date strings.
 * Uses clustered windows of contiguous availability (3-4 nights) separated
 * by short gaps, so UX testing can always select valid ranges.
 *
 * @param count - How many available date slots to generate.
 * @param startOffset - Days from today before the first slot.
 * @param skip - Days to skip between available slots (simulates bookings).
 */
function generateAvailableDates(
  count: number,
  startOffset: number = ROOM_MOCK.FIRST_AVAILABLE_OFFSET,
  skip: number = 2,
): string[] {
  const dates: string[] = [];
  const today = new Date();
  let dayOffset = startOffset;
  let windowSize = 3;

  while (dates.length < count) {
    for (let dayInWindow = 0; dayInWindow < windowSize && dates.length < count; dayInWindow++) {
      const d = new Date(today);
      d.setDate(today.getDate() + dayOffset + dayInWindow);
      dates.push(d.toISOString().slice(0, 10));
    }

    // Booked gap between availability windows (1-3 nights)
    dayOffset += windowSize + (skip % 3) + 1;
    // Alternate between 3 and 4-night windows for more realistic variance.
    windowSize = windowSize === 3 ? 4 : 3;
  }

  return dates;
}

export const mockRooms: Room[] = [
  // ─── Monteverde ─────────────────────────────────────────────────────────────
  {
    id: "mv-1",
    location: "Monteverde",
    title: "Cabaña Estándar del Bosque",
    type: "Standard",
    price: 145,
    capacity: 2,
    inventory: 8,
    sqft: 45,
    description:
      "Una inmersión acogedora en el bosque nuboso con ventanales de piso a techo y terraza de madera privada. Cada mañana despierta al canto de las aves y la niebla que abraza las copas de los árboles.",
    adminTip: "Ideal para parejas que buscan desconectarse sin renunciar al confort.",
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: ["WiFi", "Terraza privada", "Desayuno incluido", "AC", "Cafetera"],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 3),
  },
  {
    id: "mv-2",
    location: "Monteverde",
    title: "Suite Dosel Panorámica",
    type: "Suite",
    price: 280,
    capacity: 2,
    inventory: 3,
    sqft: 80,
    description:
      "Nuestra suite elevada al nivel del dosel arbóreo. Avistamiento de aves desde tu tina de hidromasaje exterior. Un espacio que redefine el lujo en armonía con la naturaleza.",
    adminTip: "Reserva al menos con 3 semanas de anticipación — la tina exterior se llena rápido.",
    image:
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=2574&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Jacuzzi exterior",
      "Minibar",
      "Servicio de habitación",
      "Desayuno incluido",
      "Vista al dosel",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 5, 3),
  },
  {
    id: "mv-3",
    location: "Monteverde",
    title: "Eco-Lodge Familiar",
    type: "Family",
    price: 320,
    capacity: 5,
    inventory: 2,
    sqft: 120,
    description:
      "Diseñada para familias que quieren explorar el bosque nuboso juntas. Habitaciones conectadas, cocina completa equipada y un área de fogata exclusiva en la terraza. Los niños adoran el puente colgante privado.",
    adminTip:
      "El puente colgante privado es el favorito de los niños — ¡no te lo pierdas al atardecer!",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2574&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Cocina completa",
      "Fogata privada",
      "Puente colgante",
      "Camas literas",
      "Área de juego",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 7, 4),
  },
  {
    id: "mv-4",
    location: "Monteverde",
    title: "Villa Quetzal Exclusiva",
    type: "Villa",
    price: 550,
    capacity: 4,
    inventory: 1,
    sqft: 200,
    description:
      "El máximo lujo en la reserva. Incluye mayordomo privado, senderos exclusivos y piscina térmica incrustada en roca volcánica. Un santuario privado rodeado de 2 acres de bosque primario intacto.",
    adminTip:
      "Nuestro huésped más memorable. El chef privado puede preparar cenas con ingredientes del bosque.",
    image:
      "https://images.unsplash.com/photo-1586500036065-2184d048dc53?q=80&w=2574&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Piscina privada",
      "Mayordomo 24h",
      "Chef privado",
      "Senderos exclusivos",
      "Helipad",
      "Spa privado",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 10, 5),
  },

  // ─── Arenal & La Fortuna ─────────────────────────────────────────────────────
  {
    id: "lf-1",
    location: "Arenal & La Fortuna",
    title: "Habitación Vista Volcán",
    type: "Standard",
    price: 180,
    capacity: 2,
    inventory: 12,
    sqft: 50,
    description:
      "Despierta con vistas directas e interrumpidas al coloso Arenal. Diseño minimalista con tina interior de piedra volcánica y ventanales del piso al techo que enmarcan el volcán como si fuera un cuadro viviente.",
    adminTip: "Las mejores vistas son al amanecer — pide el despertador a las 5:30am.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2062&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: ["WiFi", "Vista al volcán", "Tina de piedra", "AC", "Desayuno incluido"],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 2),
  },
  {
    id: "lf-2",
    location: "Arenal & La Fortuna",
    title: "Suite Aguas Termales Privadas",
    type: "Suite",
    price: 350,
    capacity: 2,
    inventory: 4,
    sqft: 90,
    description:
      "Tu propio paraíso termal en el patio trasero. Aguas minerales directas del flujo volcánico disponibles 24/7. La temperatura del agua se ajusta naturalmente con el ciclo del volcán.",
    adminTip: "Las termas son más intensas después de las 6pm — el ambiente nocturno es mágico.",
    image:
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=2600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Aguas termales privadas",
      "Piscina mineral",
      "Masajes a domicilio",
      "Servicio de habitación",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 6, 3),
  },
  {
    id: "lf-3",
    location: "Arenal & La Fortuna",
    title: "Lodge de Aventura",
    type: "Family",
    price: 290,
    capacity: 6,
    inventory: 5,
    sqft: 110,
    description:
      "Base ideal para aventureros. Incluye muros de escalar infantiles, espacio seguro para equipos, y acceso prioritario a las rutas de senderismo al Arenal. La sala de secado de equipo es un servicio único.",
    adminTip: "Pregunta por nuestro paquete de rafting familiar — incluye instructor certificado.",
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Muro de escalar",
      "Bodega de equipos",
      "Sala de secado",
      "Kayaks incluidos",
      "Desayuno energético",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 4, 2),
  },
  {
    id: "lf-4",
    location: "Arenal & La Fortuna",
    title: "Gran Villa Tabacón Signature",
    type: "Villa",
    price: 850,
    capacity: 8,
    inventory: 1,
    sqft: 350,
    description:
      "Nuestra propiedad más extensa. Piscina infinity fundiéndose con la selva, servicio de chef privado y helipuerto propio. La experiencia definitiva del volcán Arenal vista desde la comodidad de tu propia villa de lujo.",
    adminTip:
      "Disponemos de servicio de helicóptero al Volcán Poás para nuestros huéspedes Signature.",
    image:
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=2574&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Piscina infinity",
      "Chef privado",
      "Helipuerto",
      "Spa completo",
      "Mayordomo 24h",
      "Sala de cine",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 14, 6),
  },
];
