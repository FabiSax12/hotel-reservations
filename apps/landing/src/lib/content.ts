import "server-only";
import { createSupabaseServiceClient } from "@hotel/db";
import type { SupportedLocale } from "@hotel/i18n";
import type { AppTranslations } from "@/locales";
import { defaultLocale, translations } from "@/locales";

const SECTION_HERO = "hero" as const;
const SECTION_ABOUT = "about" as const;
const SECTION_ABOUT_TEXT = "about-text" as const;
const SECTION_SERVICES = "services" as const;
const SECTION_PROPERTIES = "properties" as const;
const SECTION_GALLERY = "gallery" as const;
const SECTION_TESTIMONIALS = "testimonials" as const;

type FlatContent = Record<string, string>;

function nonEmpty(obj: FlatContent): FlatContent {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ""));
}

function pickKeys(obj: FlatContent, keys: readonly string[]): FlatContent {
  const out: FlatContent = {};
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== "") out[key] = obj[key];
  }
  return out;
}

function buildItem(
  obj: FlatContent,
  prefix: string,
  fieldKeys: readonly string[],
): FlatContent {
  const out: FlatContent = {};
  for (const key of fieldKeys) {
    const flat = `${prefix}_${key}`;
    if (obj[flat] !== undefined && obj[flat] !== "") out[key] = obj[flat];
  }
  return out;
}

function buildStats(obj: FlatContent): Record<string, FlatContent> {
  const stats: Record<string, FlatContent> = {};
  for (const id of ["SUITES", "YEARS", "GUESTS", "RATING"]) {
    const value = obj[`STATS_${id}_VALUE`];
    const label = obj[`STATS_${id}_LABEL`];
    const entry: FlatContent = {};
    if (value !== undefined && value !== "") entry.VALUE = value;
    if (label !== undefined && label !== "") entry.LABEL = label;
    if (Object.keys(entry).length > 0) stats[id] = entry;
  }
  return stats;
}

const ABOUT_TEXT_TOP_KEYS = [
  "EYEBROW",
  "HEADLINE",
  "BODY",
  "QUOTE",
  "QUOTE_ATTRIBUTION",
  "MOSAIC_ALT_1",
  "MOSAIC_ALT_2",
  "MOSAIC_ALT_3",
];
const SERVICE_ITEM_IDS = [
  "THERMAL",
  "RESTAURANT",
  "EXPEDITIONS",
  "YOGA",
  "PHOTOGRAPHY",
  "TRANSFERS",
  "SANCTUARY",
  "BUTLER",
];
const SERVICE_ITEM_KEYS = ["TITLE", "DESC"];
const SERVICE_HEADER_KEYS = ["EYEBROW", "HEADLINE", "SUBHEADLINE", "CTA"];

const PROPERTY_ITEM_IDS = ["ARENAL", "MONTEVERDE"];
const PROPERTY_ITEM_KEYS = [
  "NAME",
  "LOCATION",
  "TAGLINE",
  "DESCRIPTION",
  "FEATURE_1",
  "FEATURE_2",
  "FEATURE_3",
  "PRICE_LABEL",
  "PRICE",
  "CTA",
];
const PROPERTY_HEADER_KEYS = [
  "EYEBROW",
  "HEADLINE",
  "SUBHEADLINE",
  "DRAG_HINT",
  "NAV_PREV",
  "NAV_NEXT",
];

const GALLERY_ITEM_IDS = ["THERMAL", "CANOPY", "SPA", "VOLCANO", "DINING", "MIST", "SUITE"];
const GALLERY_ITEM_KEYS = ["TITLE", "SUBTITLE"];
const GALLERY_HEADER_KEYS = ["EYEBROW", "HEADLINE", "SUBHEADLINE"];

const TESTIMONIAL_ITEM_IDS = ["T1", "T2", "T3", "T4", "T5", "T6"];
const TESTIMONIAL_ITEM_KEYS = ["NAME", "ORIGIN", "BODY"];
const TESTIMONIAL_HEADER_KEYS = ["EYEBROW", "HEADLINE", "SUBHEADLINE"];

function mergeFlatItems<T extends Record<string, unknown>>(
  base: T,
  flat: FlatContent,
  itemIds: readonly string[],
  itemKeys: readonly string[],
  headerKeys: readonly string[],
): T {
  const result: Record<string, unknown> = { ...base, ...pickKeys(flat, headerKeys) };
  for (const id of itemIds) {
    const itemPatch = buildItem(flat, id, itemKeys);
    if (Object.keys(itemPatch).length > 0) {
      const baseItem = (base as Record<string, unknown>)[id] as Record<string, unknown> | undefined;
      result[id] = { ...(baseItem ?? {}), ...itemPatch };
    }
  }
  return result as T;
}

export async function fetchContent(locale: SupportedLocale): Promise<AppTranslations> {
  const base = translations[locale] ?? translations[defaultLocale];

  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("cms_content")
      .select("section, content")
      .in("locale", [locale, defaultLocale]);

    if (error || !data?.length) return base;

    const findRow = (section: string, preferLocale: SupportedLocale = locale) => {
      const row = data.find((r) => r.section === section);
      return row ? (row.content as FlatContent) : null;
    };

    const heroFlat = findRow(SECTION_HERO);
    const aboutImagesFlat = findRow(SECTION_ABOUT);
    const aboutTextFlat = findRow(SECTION_ABOUT_TEXT);
    const servicesFlat = findRow(SECTION_SERVICES);
    const propertiesFlat = findRow(SECTION_PROPERTIES);
    const galleryFlat = findRow(SECTION_GALLERY);
    const testimonialsFlat = findRow(SECTION_TESTIMONIALS);

    const mergedHero = heroFlat ? { ...base.LANDING.HERO, ...nonEmpty(heroFlat) } : base.LANDING.HERO;

    let mergedAbout = base.LANDING.ABOUT;
    if (aboutImagesFlat) {
      mergedAbout = { ...mergedAbout, ...nonEmpty(aboutImagesFlat) };
    }
    if (aboutTextFlat) {
      mergedAbout = {
        ...mergedAbout,
        ...pickKeys(aboutTextFlat, ABOUT_TEXT_TOP_KEYS),
      };
      const stats = buildStats(aboutTextFlat);
      if (Object.keys(stats).length > 0) {
        mergedAbout = {
          ...mergedAbout,
          STATS: {
            ...mergedAbout.STATS,
            ...Object.fromEntries(
              Object.entries(stats).map(([id, patch]) => [
                id,
                {
                  ...(mergedAbout.STATS as Record<string, Record<string, string>>)[id],
                  ...patch,
                },
              ]),
            ),
          } as typeof mergedAbout.STATS,
        };
      }
    }

    const mergedServices = servicesFlat
      ? mergeFlatItems(base.LANDING.SERVICES, servicesFlat, SERVICE_ITEM_IDS, SERVICE_ITEM_KEYS, SERVICE_HEADER_KEYS)
      : base.LANDING.SERVICES;

    const mergedProperties = propertiesFlat
      ? mergeFlatItems(
          base.LANDING.PROPERTIES,
          propertiesFlat,
          PROPERTY_ITEM_IDS,
          PROPERTY_ITEM_KEYS,
          PROPERTY_HEADER_KEYS,
        )
      : base.LANDING.PROPERTIES;

    const mergedGallery = galleryFlat
      ? mergeFlatItems(base.LANDING.GALLERY, galleryFlat, GALLERY_ITEM_IDS, GALLERY_ITEM_KEYS, GALLERY_HEADER_KEYS)
      : base.LANDING.GALLERY;

    const mergedTestimonials = testimonialsFlat
      ? mergeFlatItems(
          base.LANDING.TESTIMONIALS,
          testimonialsFlat,
          TESTIMONIAL_ITEM_IDS,
          TESTIMONIAL_ITEM_KEYS,
          TESTIMONIAL_HEADER_KEYS,
        )
      : base.LANDING.TESTIMONIALS;

    return {
      ...base,
      LANDING: {
        ...base.LANDING,
        HERO: mergedHero,
        ABOUT: mergedAbout,
        SERVICES: mergedServices,
        PROPERTIES: mergedProperties,
        GALLERY: mergedGallery,
        TESTIMONIALS: mergedTestimonials,
      },
    };
  } catch {
    return base;
  }
}
