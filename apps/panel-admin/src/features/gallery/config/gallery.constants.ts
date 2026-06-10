export const GALLERY_STORAGE_BUCKET = "cms-images" as const;
export const GALLERY_STORAGE_PREFIX = "gallery/item-" as const;
export const GALLERY_IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024;
export const GALLERY_ACCEPTED_IMAGE_TYPES = Object.freeze([
  "image/jpeg",
  "image/png",
  "image/webp",
] as const);
export const GALLERY_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp" as const;
export const GALLERY_LOCALES = Object.freeze({
  ES: "es",
  EN: "en",
} as const);
export const GALLERY_LOCALE_LIST = Object.freeze([GALLERY_LOCALES.ES, GALLERY_LOCALES.EN] as const);
export const GALLERY_MAX_ITEMS = 12 as const;
export const GALLERY_ERROR_MISSING_DATA = "MISSING_DATA" as const;
