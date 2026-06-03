import "server-only";
import { createSupabaseServiceClient } from "@hotel/db";
import type { SupportedLocale } from "@hotel/i18n";
import type { AppTranslations } from "@/locales";
import { defaultLocale, translations } from "@/locales";

const SECTION_HERO = "hero" as const;
const SECTION_ABOUT = "about" as const;

export async function fetchContent(locale: SupportedLocale): Promise<AppTranslations> {
  const base = translations[locale] ?? translations[defaultLocale];

  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("cms_content")
      .select("section, content")
      .eq("locale", locale);

    if (error || !data?.length) return base;

    const heroRow = data.find((r) => r.section === SECTION_HERO);
    const aboutRow = data.find((r) => r.section === SECTION_ABOUT);

    const nonEmpty = (obj: Record<string, string>) =>
      Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ""));

    return {
      ...base,
      LANDING: {
        ...base.LANDING,
        HERO: heroRow
          ? { ...base.LANDING.HERO, ...nonEmpty(heroRow.content as Record<string, string>) }
          : base.LANDING.HERO,
        ABOUT: aboutRow
          ? { ...base.LANDING.ABOUT, ...nonEmpty(aboutRow.content as Record<string, string>) }
          : base.LANDING.ABOUT,
      },
    };
  } catch {
    return base;
  }
}
