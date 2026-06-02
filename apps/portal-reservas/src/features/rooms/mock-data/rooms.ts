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
    checkInTime: "15:00",
    checkOutTime: "11:00",
    location: "Monteverde",
    title: "Cabaña Estándar del Bosque",
    type: "Standard",
    price: 145,
    capacity: 2,
    inventory: 8,
    sqft: 45,
    beds: [{ type: "king", count: 1 }],
    description:
      "Una inmersión acogedora en el bosque nuboso con ventanales de piso a techo y terraza de madera privada. Cada mañana despierta al canto de las aves y la niebla que abraza las copas de los árboles.",
    adminTip: "Ideal para parejas que buscan desconectarse sin renunciar al confort.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542314831-c6a4d27a6584?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: ["WiFi", "Terraza privada", "Desayuno incluido", "AC", "Cafetera"],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 3),
    isFeatured: false,
  },
  {
    id: "mv-2",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    location: "Monteverde",
    title: "Suite Dosel Panorámica",
    type: "Suite",
    price: 280,
    capacity: 2,
    inventory: 3,
    sqft: 80,
    beds: [{ type: "king", count: 1 }],
    description:
      "Nuestra suite elevada al nivel del dosel arbóreo. Avistamiento de aves desde tu tina de hidromasaje exterior. Un espacio que redefine el lujo en armonía con la naturaleza.",
    adminTip: "Reserva al menos con 3 semanas de anticipación — la tina exterior se llena rápido.",
    image:
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ec8fa62?q=80&w=2070&auto=format&fit=crop",
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
    isFeatured: true,
  },
  {
    id: "mv-3",
    checkInTime: "16:00",
    checkOutTime: "11:00",
    location: "Monteverde",
    title: "Eco-Lodge Familiar",
    type: "Family",
    price: 320,
    capacity: 5,
    inventory: 2,
    sqft: 120,
    beds: [
      { type: "queen", count: 1 },
      { type: "litera", count: 2 },
    ],
    description:
      "Diseñada para familias que quieren explorar el bosque nuboso juntas. Habitaciones conectadas, cocina completa equipada y un área de fogata exclusiva en la terraza. Los niños adoran el puente colgante privado.",
    adminTip:
      "El puente colgante privado es el favorito de los niños — ¡no te lo pierdas al atardecer!",
    image:
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Cocina completa",
      "Fogata privada",
      "Puente colgante",
      "Área de juego",
      "Lavadora",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 7, 4),
    isFeatured: false,
  },
  {
    id: "mv-4",
    checkInTime: "13:00",
    checkOutTime: "12:00",
    location: "Monteverde",
    title: "Villa Quetzal Exclusiva",
    type: "Villa",
    price: 550,
    capacity: 4,
    inventory: 1,
    sqft: 200,
    beds: [
      { type: "king", count: 1 },
      { type: "queen", count: 1 },
    ],
    description:
      "El máximo lujo en la reserva. Incluye mayordomo privado, senderos exclusivos y piscina térmica incrustada en roca volcánica. Un santuario privado rodeado de 2 acres de bosque primario intacto.",
    adminTip:
      "Nuestro huésped más memorable. El chef privado puede preparar cenas con ingredientes del bosque.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1538332576228-eb5b4c4de8f5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338-8c671be9be54?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Piscina privada",
      "Mayordomo 24h",
      "Chef privado",
      "Senderos exclusivos",
      "Spa privado",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 10, 5),
    isFeatured: true,
  },

  // ─── Arenal & La Fortuna ─────────────────────────────────────────────────────
  {
    id: "lf-1",
    checkInTime: "15:00",
    checkOutTime: "10:00",
    location: "Arenal & La Fortuna",
    title: "Habitación Vista Volcán",
    type: "Standard",
    price: 180,
    capacity: 2,
    inventory: 12,
    sqft: 50,
    beds: [{ type: "queen", count: 1 }],
    description:
      "Despierta con vistas directas e interrumpidas al coloso Arenal. Diseño minimalista con tina interior de piedra volcánica y ventanales del piso al techo que enmarcan el volcán como si fuera un cuadro viviente.",
    adminTip: "Las mejores vistas son al amanecer — pide el despertador a las 5:30am.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1433060547904-122e166fcb81?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: ["WiFi", "Vista al volcán", "Tina de piedra", "AC", "Desayuno incluido"],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 2),
    isFeatured: false,
  },
  {
    id: "lf-2",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    location: "Arenal & La Fortuna",
    title: "Suite Aguas Termales Privadas",
    type: "Suite",
    price: 350,
    capacity: 2,
    inventory: 4,
    sqft: 90,
    beds: [{ type: "king", count: 1 }],
    description:
      "Tu propio paraíso termal en el patio trasero. Aguas minerales directas del flujo volcánico disponibles 24/7. La temperatura del agua se ajusta naturalmente con el ciclo del volcán.",
    adminTip: "Las termas son más intensas después de las 6pm — el ambiente nocturno es mágico.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582610116397-edb318600f1d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2070&auto=format&fit=crop",
    ],
    amenities: [
      "WiFi",
      "Aguas termales privadas",
      "Piscina mineral",
      "Masajes a domicilio",
      "Servicio de habitación",
    ],
    availableDates: generateAvailableDates(ROOM_MOCK.AVAILABLE_DATE_COUNT, 6, 3),
    isFeatured: true,
  },
  {
    id: "lf-3",
    checkInTime: "16:00",
    checkOutTime: "11:00",
    location: "Arenal & La Fortuna",
    title: "Lodge de Aventura",
    type: "Family",
    price: 290,
    capacity: 6,
    inventory: 5,
    sqft: 110,
    beds: [
      { type: "queen", count: 1 },
      { type: "individual", count: 2 },
      { type: "litera", count: 1 },
    ],
    description:
      "Base ideal para aventureros. Incluye muros de escalar infantiles, espacio seguro para equipos, y acceso prioritario a las rutas de senderismo al Arenal. La sala de secado de equipo es un servicio único.",
    adminTip: "Pregunta por nuestro paquete de rafting familiar — incluye instructor certificado.",
    image:
      "https://images.unsplash.com/photo-1533633310920-cc9bf1e7f9b0?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551632811-561f558c638f?q=80&w=2070&auto=format&fit=crop",
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
    isFeatured: false,
  },
  {
    id: "lf-4",
    checkInTime: "12:00",
    checkOutTime: "12:00",
    location: "Arenal & La Fortuna",
    title: "Gran Villa Tabacón Signature",
    type: "Villa",
    price: 850,
    capacity: 8,
    inventory: 1,
    sqft: 350,
    beds: [
      { type: "king", count: 2 },
      { type: "sofá cama", count: 1 },
    ],
    description:
      "Nuestra propiedad más extensa. Piscina infinity fundiéndose con la selva, servicio de chef privado y helipuerto propio. La experiencia definitiva del volcán Arenal vista desde la comodidad de tu propia villa de lujo.",
    adminTip:
      "Disponemos de servicio de helicóptero al Volcán Poás para nuestros huéspedes Signature.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490908653-cg72990471b0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
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
    isFeatured: true,
  },
];
