export const GALLERY_CONFIG = {
  BUCKET: "room-images",
  MAX_IMAGES: 10,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  IMAGE_SIZES: "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw",
} as const;

export const GALLERY_KEYBOARD = {
  ENTER: "Enter",
  SPACE: " ",
} as const;
