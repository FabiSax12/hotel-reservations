"use server";

import { createSupabaseServiceClient } from "@hotel/db";
import {
  CMS_ACCEPTED_IMAGE_TYPES,
  CMS_ERROR_MISSING_DATA,
  CMS_IMAGE_BUCKET,
  CMS_IMAGE_MAX_SIZE_BYTES,
  CMS_STORAGE_SLOT_PREFIX,
} from "@/features/cms/constants/cms-fields";
import type {
  CmsLocale,
  CmsSection,
  SaveCmsResult,
  UploadCmsImageResult,
} from "@/features/cms/domain/cms.interface";

export async function saveCmsTextAction(
  locale: CmsLocale,
  section: CmsSection,
  content: Record<string, string>,
): Promise<SaveCmsResult> {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase
    .from("cms_content")
    .upsert(
      { locale, section, content, updated_at: new Date().toISOString() },
      { onConflict: "locale,section" },
    );

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function uploadCmsImageAction(formData: FormData): Promise<UploadCmsImageResult> {
  const file = formData.get("file") as File | null;
  const slot = formData.get("slot") as string | null;

  if (!file || !slot) return { success: false, error: CMS_ERROR_MISSING_DATA };
  if (file.size > CMS_IMAGE_MAX_SIZE_BYTES) return { success: false, error: "ERROR_SIZE" };
  if (!(CMS_ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return { success: false, error: "ERROR_TYPE" };
  }

  const supabase = createSupabaseServiceClient();
  const path = `${CMS_STORAGE_SLOT_PREFIX}${slot}`;

  const { error } = await supabase.storage
    .from(CMS_IMAGE_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) return { success: false, error: error.message };

  const { data } = supabase.storage.from(CMS_IMAGE_BUCKET).getPublicUrl(path);
  return { success: true, url: `${data.publicUrl}?t=${Date.now()}` };
}
