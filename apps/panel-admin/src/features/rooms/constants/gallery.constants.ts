export const GALLERY_CONFIG = {
  BUCKET: "room-images",
  MAX_IMAGES: 10,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/webp"],
} as const;
