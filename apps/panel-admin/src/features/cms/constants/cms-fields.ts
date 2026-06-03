export const CMS_SECTIONS = Object.freeze({
  HERO: "hero",
  ABOUT: "about",
  ABOUT_TEXT: "about-text",
  SERVICES: "services",
  PROPERTIES: "properties",
  GALLERY: "gallery",
  TESTIMONIALS: "testimonials",
} as const);

export const CMS_LOCALES = Object.freeze({
  ES: "es",
  EN: "en",
} as const);

export const CMS_LOCALE_LIST = Object.freeze([CMS_LOCALES.ES, CMS_LOCALES.EN] as const);

export const CMS_IMAGE_BUCKET = "cms-images" as const;
export const CMS_IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024;
export const CMS_ACCEPTED_IMAGE_TYPES = Object.freeze([
  "image/jpeg",
  "image/png",
  "image/webp",
] as const);
export const CMS_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp" as const;
export const CMS_IMAGE_SIZES = "(max-width: 768px) 100vw, 33vw" as const;
export const CMS_STORAGE_SLOT_PREFIX = "about/slot-" as const;
export const CMS_ERROR_MISSING_DATA = "MISSING_DATA" as const;
export const CMS_SAVE_SUCCESS_RESET_MS = 3000 as const;
