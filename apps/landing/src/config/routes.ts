export const ROUTES = Object.freeze({
  HOME: "/",
  PORTAL: process.env.NEXT_PUBLIC_PORTAL_URL ?? "/reservas",
  LEGAL: Object.freeze({
    PRIVACY: "/privacidad",
    TERMS: "/terminos",
  }),
  ANCHORS: Object.freeze({
    ABOUT: "#about",
    ROOMS: "#rooms",
    SERVICES: "#services",
    GALLERY: "#gallery",
    TESTIMONIALS: "#testimonials",
    CONTACT: "#contact",
  }),
} as const);
