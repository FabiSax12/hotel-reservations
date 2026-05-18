import "server-only";
import { createSupabaseServiceClient } from "@hotel/db";
import type { CmsLocale, CmsSection } from "@/features/cms/domain/cms.interface";

export async function getCmsSection(
  locale: CmsLocale,
  section: CmsSection,
): Promise<Record<string, string> | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("cms_content")
    .select("content")
    .eq("locale", locale)
    .eq("section", section)
    .maybeSingle();

  if (error || !data) return null;
  return data.content as Record<string, string>;
}
