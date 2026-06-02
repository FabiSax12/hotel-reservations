/**
 * @file amenities.ts — Mock amenity catalog for Portal de Reservas.
 *
 * Mirrors the real database shape: in production every amenity is a row in
 * `public.amenities` (`name`, `icon`, `description`) and rooms link to them
 * through the `public.room_amenities` join table. See the migration
 * `packages/db/supabase/migrations/20260505000000_create_amenities.sql`.
 *
 * Rooms reference amenities by name (`Room.amenities: string[]`); this catalog
 * resolves each name to its client-facing description for the detail panel.
 * When the mock layer is replaced by an API/DB fetch, read the description from
 * `public.amenities.description` instead of this map.
 *
 * NOTE: Like the rest of the mock data, descriptions are server-returned
 * Spanish content, NOT internationalized UI labels.
 */

/** A single amenity entry, mirroring the `public.amenities` row shape. */
export interface AmenityDetail {
  /** Amenity name — matches the strings stored in `Room.amenities`. */
  name: string;
  /** Client-facing description (maps to `public.amenities.description`). */
  description: string;
}

/**
 * Amenity name → detail. Keys match `Room.amenities[]` exactly.
 * Mirrors `public.amenities`; rooms link via `public.room_amenities`.
 */
export const AMENITY_CATALOG: Record<string, AmenityDetail> = {
  WiFi: {
    name: "WiFi",
    description: "Internet de alta velocidad por fibra en toda la habitación y áreas comunes.",
  },
  "Terraza privada": {
    name: "Terraza privada",
    description: "Terraza de madera exclusiva con vistas al bosque, ideal para el café de la mañana.",
  },
  "Desayuno incluido": {
    name: "Desayuno incluido",
    description: "Desayuno gourmet servido cada mañana con productos locales y orgánicos.",
  },
  AC: {
    name: "AC",
    description: "Aire acondicionado con control de clima individual para tu confort.",
  },
  Cafetera: {
    name: "Cafetera",
    description: "Cafetera de cápsulas con selección de café costarricense de altura.",
  },
  "Jacuzzi exterior": {
    name: "Jacuzzi exterior",
    description: "Tina de hidromasaje al aire libre con vista panorámica al dosel.",
  },
  Minibar: {
    name: "Minibar",
    description: "Minibar surtido con bebidas, snacks artesanales y agua premium sin costo.",
  },
  "Servicio de habitación": {
    name: "Servicio de habitación",
    description: "Servicio a la habitación disponible durante horario extendido.",
  },
  "Vista al dosel": {
    name: "Vista al dosel",
    description: "Ventanales que enmarcan el dosel arbóreo y el avistamiento de aves.",
  },
  "Cocina completa": {
    name: "Cocina completa",
    description: "Cocina totalmente equipada con utensilios, refrigerador y zona de comedor.",
  },
  "Fogata privada": {
    name: "Fogata privada",
    description: "Fogata exclusiva en la terraza para noches al aire libre bajo las estrellas.",
  },
  "Puente colgante": {
    name: "Puente colgante",
    description: "Acceso a un puente colgante privado sobre el bosque nuboso.",
  },
  "Área de juego": {
    name: "Área de juego",
    description: "Zona de juegos segura pensada para los más pequeños.",
  },
  Lavadora: {
    name: "Lavadora",
    description: "Lavadora y secadora en la unidad, ideal para estancias prolongadas.",
  },
  "Piscina privada": {
    name: "Piscina privada",
    description: "Piscina privada de uso exclusivo rodeada de naturaleza.",
  },
  "Mayordomo 24h": {
    name: "Mayordomo 24h",
    description: "Mayordomo personal disponible las 24 horas para cualquier solicitud.",
  },
  "Chef privado": {
    name: "Chef privado",
    description: "Chef privado que prepara menús a medida con ingredientes del bosque.",
  },
  "Senderos exclusivos": {
    name: "Senderos exclusivos",
    description: "Acceso a senderos privados para explorar la reserva sin multitudes.",
  },
  "Spa privado": {
    name: "Spa privado",
    description: "Espacio de spa privado con tratamientos disponibles a solicitud.",
  },
  "Vista al volcán": {
    name: "Vista al volcán",
    description: "Vista directa e ininterrumpida al volcán Arenal desde la habitación.",
  },
  "Tina de piedra": {
    name: "Tina de piedra",
    description: "Tina interior tallada en piedra volcánica para un baño relajante.",
  },
  "Aguas termales privadas": {
    name: "Aguas termales privadas",
    description: "Aguas termales minerales de origen volcánico, disponibles las 24 horas.",
  },
  "Piscina mineral": {
    name: "Piscina mineral",
    description: "Piscina de aguas minerales con propiedades relajantes.",
  },
  "Masajes a domicilio": {
    name: "Masajes a domicilio",
    description: "Servicio de masajes terapéuticos en la comodidad de tu habitación.",
  },
  "Muro de escalar": {
    name: "Muro de escalar",
    description: "Muro de escalar infantil supervisado para aventureros en formación.",
  },
  "Bodega de equipos": {
    name: "Bodega de equipos",
    description: "Espacio seguro para almacenar y organizar tu equipo de aventura.",
  },
  "Sala de secado": {
    name: "Sala de secado",
    description: "Sala de secado de equipo, ideal tras un día de lluvia o rafting.",
  },
  "Kayaks incluidos": {
    name: "Kayaks incluidos",
    description: "Kayaks de cortesía con acceso prioritario a las rutas acuáticas.",
  },
  "Desayuno energético": {
    name: "Desayuno energético",
    description: "Desayuno energético diseñado para días de senderismo y aventura.",
  },
  "Piscina infinity": {
    name: "Piscina infinity",
    description: "Piscina infinity que se funde con la selva y la vista al volcán.",
  },
  Helipuerto: {
    name: "Helipuerto",
    description: "Helipuerto privado con servicio de traslados para huéspedes Signature.",
  },
  "Spa completo": {
    name: "Spa completo",
    description: "Spa completo con sauna, baño de vapor y circuito de hidroterapia.",
  },
  "Sala de cine": {
    name: "Sala de cine",
    description: "Sala de cine privada con sonido envolvente y biblioteca de películas.",
  },
};

/**
 * Resolves an amenity name to its detail, or null when no catalog entry exists
 * (the panel then renders the bare amenity name without a description).
 */
export function getAmenityDetail(name: string): AmenityDetail | null {
  return AMENITY_CATALOG[name] ?? null;
}
