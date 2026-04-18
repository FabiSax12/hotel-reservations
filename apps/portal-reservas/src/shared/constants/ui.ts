/**
 * @file ui.ts — Centralized UI copy constants for Portal de Reservas.
 *
 * Follows the "Zero Magic Strings" rule: every user-facing string in the
 * portal's components is defined here rather than hardcoded in JSX.
 * This centralizes copy management and prepares the codebase for future
 * internationalization (i18n).
 *
 * Organized by feature area: HEADER, HERO, ROOMS.
 */

export const UI_CONSTANTS = {
  /** Copy used in the sticky header bar. */
  HEADER: {
    BRAND: "EcoResorts",
    BRAND_HIGHLIGHT: "CR",
    HELP: "¿Necesita Ayuda?",
    MY_RESERVATIONS: "Mis Reservas",
  },
  /** Copy for the full-viewport hero landing section. */
  HERO: {
    TITLE: "¿Cuándo nos visitas?",
    SUBTITLE: "Seleccione su destino, fechas y cantidad de personas",
  },
  /** Copy used across the room results section and individual room cards. */
  ROOMS: {
    REALTIME_AVAIL: "Disponibilidad en tiempo real",
    OPTIONS_IN: "Opciones en",
    ALL_DESTINATIONS: "Todos nuestros destinos",
    ROOMS_FOUND: "habitaciones encontradas",
    LAST_ROOM: "¡Última habitación disponible!",
    ONLY_REMAINING: "Solo quedan",
    ROOMS_PLURAL: "habitaciones",
    TYPE_LABEL: "Tipo",
    SQFT_LABEL: "m²",
    PRICE_LABEL: "Precio Promedio Por Noche",
    CURRENCY: "USD",
    AVAILABLE_DATES: "disponibles para sus fechas",
    SELECT_ACTION: "Seleccionar y Continuar",
  }
} as const;
