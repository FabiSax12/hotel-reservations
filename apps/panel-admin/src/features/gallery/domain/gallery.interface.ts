import type { Database } from "@hotel/db";

export type GalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];

export type GalleryContent = Database["public"]["Tables"]["gallery_content"]["Row"];

export interface GalleryItemWithContent {
  item: GalleryItem;
  content: Record<string, GalleryContent>;
}

export type GalleryLocale = "es" | "en";

export interface CreateGalleryItemInput {
  imageUrl: string;
  title: string;
  description: string;
  locale: GalleryLocale;
}

export interface UpdateGalleryItemInput {
  id: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  locale: GalleryLocale;
}

export interface DeleteGalleryItemResult {
  success: boolean;
  error?: string;
}

export interface UploadGalleryImageResult {
  success: boolean;
  url?: string;
  error?: string;
}
