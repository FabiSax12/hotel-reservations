import "server-only";
import type { SupportedLocale } from "@hotel/i18n";
import type { AppTranslations } from "@/locales";
import { translations } from "@/locales";

/**
 * Fetches page content for a given locale from the CMS.
 *
 * Swap the body below for a real API call once the CMS is ready:
 *
 *   const res = await fetch(
 *     `${process.env.CMS_API_URL}/content?locale=${locale}&hotel=${hotelId}`,
 *     {
 *       headers: { Authorization: `Bearer ${process.env.CMS_API_KEY}` },
 *       next: { revalidate: 60 },
 *     },
 *   );
 *   if (!res.ok) throw new Error(`CMS fetch failed: ${res.status}`);
 *   return res.json() as AppTranslations;
 */
export async function fetchContent(
  locale: SupportedLocale,
  // hotelId?: string,  // future: per-tenant content
): Promise<AppTranslations> {
  return translations[locale] ?? translations["es"];
}
