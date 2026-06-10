"use server";

import { createSupabaseServiceClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import {
  GALLERY_ACCEPTED_IMAGE_TYPES,
  GALLERY_ERROR_MISSING_DATA,
  GALLERY_IMAGE_MAX_SIZE_BYTES,
  GALLERY_LOCALES,
  GALLERY_MAX_ITEMS,
  GALLERY_STORAGE_BUCKET,
  GALLERY_STORAGE_PREFIX,
} from "@/features/gallery/config/gallery.constants";
import type {
  DeleteGalleryItemResult,
  UploadGalleryImageResult,
} from "@/features/gallery/domain/gallery.interface";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export async function uploadGalleryImageAction(
  formData: FormData,
): Promise<UploadGalleryImageResult> {
  await requirePermission(PERMISSIONS.CMS.MANAGE);
  const file = formData.get("file") as File | null;

  if (!file) return { success: false, error: GALLERY_ERROR_MISSING_DATA };
  if (file.size > GALLERY_IMAGE_MAX_SIZE_BYTES) return { success: false, error: "ERROR_SIZE" };
  if (!(GALLERY_ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return { success: false, error: "ERROR_TYPE" };
  }

  const supabase = createSupabaseServiceClient();
  const fileId = crypto.randomUUID();
  const path = `${GALLERY_STORAGE_PREFIX}${fileId}`;
  const extension = file.name.split(".").pop() || "jpg";
  const fullPath = `${path}.${extension}`;

  const { error } = await supabase.storage
    .from(GALLERY_STORAGE_BUCKET)
    .upload(fullPath, file, { upsert: false, contentType: file.type });

  if (error) return { success: false, error: error.message };

  const { data } = supabase.storage.from(GALLERY_STORAGE_BUCKET).getPublicUrl(fullPath);
  return { success: true, url: `${data.publicUrl}?t=${Date.now()}` };
}

export async function createGalleryItemAction(
  imageUrl: string,
  title: string,
  description: string,
  locale: "es" | "en",
): Promise<{ success: boolean; error?: string; itemId?: string }> {
  await requirePermission(PERMISSIONS.CMS.MANAGE);

  const supabase = createSupabaseServiceClient();

  const { count } = await supabase
    .from(DB_TABLES.GALLERY_ITEMS)
    .select("*", { count: "exact", head: true })
    .eq(DB_COLUMNS.gallery_items.is_active, true);

  if ((count ?? 0) >= GALLERY_MAX_ITEMS) {
    return { success: false, error: "ERROR_MAX_ITEMS" };
  }

  const { data: item, error: itemError } = await supabase
    .from(DB_TABLES.GALLERY_ITEMS)
    .insert([{ [DB_COLUMNS.gallery_items.image_url]: imageUrl }])
    .select()
    .single();

  if (itemError) return { success: false, error: itemError.message };

  const { error: contentError } = await supabase.from(DB_TABLES.GALLERY_CONTENT).insert([
    {
      [DB_COLUMNS.gallery_content.gallery_item_id]: item.id,
      [DB_COLUMNS.gallery_content.locale]: locale,
      [DB_COLUMNS.gallery_content.title]: title,
      [DB_COLUMNS.gallery_content.description]: description,
    },
  ]);

  if (contentError) {
    await supabase.from(DB_TABLES.GALLERY_ITEMS).delete().eq(DB_COLUMNS.gallery_items.id, item.id);
    return { success: false, error: contentError.message };
  }

  const otherLocale = locale === GALLERY_LOCALES.ES ? GALLERY_LOCALES.EN : GALLERY_LOCALES.ES;
  const { error: otherLocaleError } = await supabase.from(DB_TABLES.GALLERY_CONTENT).insert([
    {
      [DB_COLUMNS.gallery_content.gallery_item_id]: item.id,
      [DB_COLUMNS.gallery_content.locale]: otherLocale,
      [DB_COLUMNS.gallery_content.title]: "",
      [DB_COLUMNS.gallery_content.description]: "",
    },
  ]);

  if (otherLocaleError) {
    return { success: false, error: otherLocaleError.message };
  }

  return { success: true, itemId: item.id };
}

export async function updateGalleryItemContentAction(
  itemId: string,
  title: string,
  description: string,
  locale: "es" | "en",
): Promise<{ success: boolean; error?: string }> {
  await requirePermission(PERMISSIONS.CMS.MANAGE);

  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from(DB_TABLES.GALLERY_CONTENT).upsert(
    {
      [DB_COLUMNS.gallery_content.gallery_item_id]: itemId,
      [DB_COLUMNS.gallery_content.locale]: locale,
      [DB_COLUMNS.gallery_content.title]: title,
      [DB_COLUMNS.gallery_content.description]: description,
      [DB_COLUMNS.gallery_content.updated_at]: new Date().toISOString(),
    },
    { onConflict: "gallery_item_id,locale" },
  );

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteGalleryItemAction(itemId: string): Promise<DeleteGalleryItemResult> {
  await requirePermission(PERMISSIONS.CMS.MANAGE);

  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from(DB_TABLES.GALLERY_ITEMS)
    .update({ [DB_COLUMNS.gallery_items.is_active]: false })
    .eq(DB_COLUMNS.gallery_items.id, itemId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
