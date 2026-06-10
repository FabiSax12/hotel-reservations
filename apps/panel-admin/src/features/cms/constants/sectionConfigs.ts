import type { CmsFieldConfig, CmsSectionConfig } from "@/features/cms/domain/cms.interface";
import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";
import { CMS_LOCALES, CMS_SECTIONS } from "./cms-fields";

export const CMS_LOCALE_LABELS: Record<string, (texts: CmsTexts) => string> = Object.freeze({
  [CMS_LOCALES.ES]: (t: CmsTexts) => t.LOCALE_ES,
  [CMS_LOCALES.EN]: (t: CmsTexts) => t.LOCALE_EN,
});

const HERO_FIELDS: CmsFieldConfig[] = [
  { key: "EYEBROW", type: "text", getLabel: (t) => t.HERO.EYEBROW_LABEL },
  { key: "HOTEL_NAME", type: "text", getLabel: (t) => t.HERO.HOTEL_NAME_LABEL },
  {
    key: "HEADLINE_LINE1",
    type: "text",
    getLabel: (t) => t.HERO.HEADLINE_LINE1_LABEL,
    getPlaceholder: (t) => t.HERO.TITLE_PLACEHOLDER,
  },
  { key: "HEADLINE_LINE2", type: "text", getLabel: (t) => t.HERO.HEADLINE_LINE2_LABEL },
  {
    key: "SUBHEADLINE",
    type: "textarea",
    getLabel: (t) => t.HERO.SUBHEADLINE_LABEL,
    getPlaceholder: (t) => t.HERO.SUBTITLE_PLACEHOLDER,
  },
  {
    key: "CTA_PRIMARY",
    type: "text",
    getLabel: (t) => t.HERO.CTA_PRIMARY_LABEL,
    getPlaceholder: (t) => t.HERO.CTA_PLACEHOLDER,
  },
  { key: "CTA_SECONDARY", type: "text", getLabel: (t) => t.HERO.CTA_SECONDARY_LABEL },
  { key: "SCROLL_CUE", type: "text", getLabel: (t) => t.HERO.SCROLL_CUE_LABEL },
  { key: "LOCATIONS", type: "text", getLabel: (t) => t.HERO.LOCATIONS_LABEL },
  { key: "FEATURED_LABEL", type: "text", getLabel: (t) => t.HERO.FEATURED_LABEL_LABEL },
  { key: "FEATURED_PROPERTY", type: "text", getLabel: (t) => t.HERO.FEATURED_PROPERTY_LABEL },
];

const STAT_KEYS = [
  { id: "SUITES", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_STATS_SUITES },
  { id: "YEARS", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_STATS_YEARS },
  { id: "GUESTS", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_STATS_GUESTS },
  { id: "RATING", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_STATS_RATING },
] as const;

const MOSAIC_ALT_KEYS = [
  { id: "MOSAIC_ALT_1", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_MOSAIC_1 },
  { id: "MOSAIC_ALT_2", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_MOSAIC_2 },
  { id: "MOSAIC_ALT_3", group: (t: CmsTexts) => t.ABOUT_TEXT.GROUP_MOSAIC_3 },
] as const;

const ABOUT_TEXT_FIELDS: CmsFieldConfig[] = [
  { key: "EYEBROW", type: "text", getLabel: (t) => t.ABOUT_TEXT.EYEBROW_LABEL },
  { key: "HEADLINE", type: "text", getLabel: (t) => t.ABOUT_TEXT.HEADLINE_LABEL },
  { key: "BODY", type: "textarea", getLabel: (t) => t.ABOUT_TEXT.BODY_LABEL },
  { key: "QUOTE", type: "textarea", getLabel: (t) => t.ABOUT_TEXT.QUOTE_LABEL },
  { key: "QUOTE_ATTRIBUTION", type: "text", getLabel: (t) => t.ABOUT_TEXT.QUOTE_ATTRIBUTION_LABEL },
  ...MOSAIC_ALT_KEYS.map<CmsFieldConfig>(({ id, group }) => ({
    key: id,
    type: "text",
    getLabel: (t) => t.ABOUT_TEXT.MOSAIC_ALT_LABEL,
    getGroup: group,
  })),
  ...STAT_KEYS.flatMap<CmsFieldConfig>(({ id, group }) => [
    {
      key: `STATS_${id}_VALUE`,
      type: "text",
      getLabel: (t) => t.ABOUT_TEXT.STATS_VALUE_LABEL,
      getGroup: group,
    },
    {
      key: `STATS_${id}_LABEL`,
      type: "text",
      getLabel: (t) => t.ABOUT_TEXT.STATS_LABEL_LABEL,
      getGroup: group,
    },
  ]),
];

const ABOUT_IMAGE_FIELDS: CmsFieldConfig[] = [
  { key: "MOSAIC_URL_1", type: "image-slot", getLabel: (t) => t.ABOUT.IMAGE_SLOT_LABEL },
  { key: "MOSAIC_URL_2", type: "image-slot", getLabel: (t) => t.ABOUT.IMAGE_SLOT_LABEL },
  { key: "MOSAIC_URL_3", type: "image-slot", getLabel: (t) => t.ABOUT.IMAGE_SLOT_LABEL },
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
] as const;

const SERVICES_FIELDS: CmsFieldConfig[] = [
  {
    key: "EYEBROW",
    type: "text",
    getLabel: (t) => t.SERVICES.EYEBROW_LABEL,
    getGroup: (t) => t.SERVICES.GROUP_HEADER,
  },
  {
    key: "HEADLINE",
    type: "text",
    getLabel: (t) => t.SERVICES.HEADLINE_LABEL,
    getGroup: (t) => t.SERVICES.GROUP_HEADER,
  },
  {
    key: "SUBHEADLINE",
    type: "textarea",
    getLabel: (t) => t.SERVICES.SUBHEADLINE_LABEL,
    getGroup: (t) => t.SERVICES.GROUP_HEADER,
  },
  {
    key: "CTA",
    type: "text",
    getLabel: (t) => t.SERVICES.CTA_LABEL,
    getGroup: (t) => t.SERVICES.GROUP_HEADER,
  },
  ...SERVICE_ITEM_IDS.flatMap<CmsFieldConfig>((id) => [
    {
      key: `${id}_TITLE`,
      type: "text",
      getLabel: (t) => t.SERVICES.ITEM_TITLE_LABEL,
      getGroup: (t) => t.SERVICES.ITEMS[id],
    },
    {
      key: `${id}_DESC`,
      type: "textarea",
      getLabel: (t) => t.SERVICES.ITEM_DESC_LABEL,
      getGroup: (t) => t.SERVICES.ITEMS[id],
    },
  ]),
];

const PROPERTY_ITEM_IDS = ["ARENAL", "MONTEVERDE"] as const;

const PROPERTY_ITEM_FIELDS_DEF = [
  { suffix: "NAME", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.NAME_LABEL },
  { suffix: "LOCATION", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.LOCATION_LABEL },
  { suffix: "TAGLINE", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.TAGLINE_LABEL },
  {
    suffix: "DESCRIPTION",
    type: "textarea" as const,
    label: (t: CmsTexts) => t.PROPERTIES.DESCRIPTION_LABEL,
  },
  { suffix: "FEATURE_1", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.FEATURE_1_LABEL },
  { suffix: "FEATURE_2", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.FEATURE_2_LABEL },
  { suffix: "FEATURE_3", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.FEATURE_3_LABEL },
  {
    suffix: "PRICE_LABEL",
    type: "text" as const,
    label: (t: CmsTexts) => t.PROPERTIES.PRICE_LABEL_LABEL,
  },
  { suffix: "PRICE", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.PRICE_LABEL },
  { suffix: "CTA", type: "text" as const, label: (t: CmsTexts) => t.PROPERTIES.CTA_LABEL },
];

const PROPERTIES_FIELDS: CmsFieldConfig[] = [
  {
    key: "EYEBROW",
    type: "text",
    getLabel: (t) => t.PROPERTIES.EYEBROW_LABEL,
    getGroup: (t) => t.PROPERTIES.GROUP_HEADER,
  },
  {
    key: "HEADLINE",
    type: "text",
    getLabel: (t) => t.PROPERTIES.HEADLINE_LABEL,
    getGroup: (t) => t.PROPERTIES.GROUP_HEADER,
  },
  {
    key: "SUBHEADLINE",
    type: "textarea",
    getLabel: (t) => t.PROPERTIES.SUBHEADLINE_LABEL,
    getGroup: (t) => t.PROPERTIES.GROUP_HEADER,
  },
  {
    key: "DRAG_HINT",
    type: "text",
    getLabel: (t) => t.PROPERTIES.DRAG_HINT_LABEL,
    getGroup: (t) => t.PROPERTIES.GROUP_HEADER,
  },
  {
    key: "NAV_PREV",
    type: "text",
    getLabel: (t) => t.PROPERTIES.NAV_PREV_LABEL,
    getGroup: (t) => t.PROPERTIES.GROUP_HEADER,
  },
  {
    key: "NAV_NEXT",
    type: "text",
    getLabel: (t) => t.PROPERTIES.NAV_NEXT_LABEL,
    getGroup: (t) => t.PROPERTIES.GROUP_HEADER,
  },
  ...PROPERTY_ITEM_IDS.flatMap<CmsFieldConfig>((id) =>
    PROPERTY_ITEM_FIELDS_DEF.map<CmsFieldConfig>(({ suffix, type, label }) => ({
      key: `${id}_${suffix}`,
      type,
      getLabel: label,
      getGroup: (t) => t.PROPERTIES.ITEMS[id],
    })),
  ),
];

const GALLERY_ITEM_IDS = ["THERMAL", "CANOPY", "SPA", "VOLCANO", "DINING", "MIST", "SUITE"] as const;

const GALLERY_FIELDS: CmsFieldConfig[] = [
  {
    key: "EYEBROW",
    type: "text",
    getLabel: (t) => t.GALLERY.EYEBROW_LABEL,
    getGroup: (t) => t.GALLERY.GROUP_HEADER,
  },
  {
    key: "HEADLINE",
    type: "text",
    getLabel: (t) => t.GALLERY.HEADLINE_LABEL,
    getGroup: (t) => t.GALLERY.GROUP_HEADER,
  },
  {
    key: "SUBHEADLINE",
    type: "textarea",
    getLabel: (t) => t.GALLERY.SUBHEADLINE_LABEL,
    getGroup: (t) => t.GALLERY.GROUP_HEADER,
  },
  ...GALLERY_ITEM_IDS.flatMap<CmsFieldConfig>((id) => [
    {
      key: `${id}_TITLE`,
      type: "text",
      getLabel: (t) => t.GALLERY.ITEM_TITLE_LABEL,
      getGroup: (t) => t.GALLERY.ITEMS[id],
    },
    {
      key: `${id}_SUBTITLE`,
      type: "text",
      getLabel: (t) => t.GALLERY.ITEM_SUBTITLE_LABEL,
      getGroup: (t) => t.GALLERY.ITEMS[id],
    },
  ]),
];

const TESTIMONIAL_ITEM_IDS = ["T1", "T2", "T3", "T4", "T5", "T6"] as const;

const TESTIMONIALS_FIELDS: CmsFieldConfig[] = [
  {
    key: "EYEBROW",
    type: "text",
    getLabel: (t) => t.TESTIMONIALS.EYEBROW_LABEL,
    getGroup: (t) => t.TESTIMONIALS.GROUP_HEADER,
  },
  {
    key: "HEADLINE",
    type: "text",
    getLabel: (t) => t.TESTIMONIALS.HEADLINE_LABEL,
    getGroup: (t) => t.TESTIMONIALS.GROUP_HEADER,
  },
  {
    key: "SUBHEADLINE",
    type: "textarea",
    getLabel: (t) => t.TESTIMONIALS.SUBHEADLINE_LABEL,
    getGroup: (t) => t.TESTIMONIALS.GROUP_HEADER,
  },
  ...TESTIMONIAL_ITEM_IDS.flatMap<CmsFieldConfig>((id) => [
    {
      key: `${id}_NAME`,
      type: "text",
      getLabel: (t) => t.TESTIMONIALS.NAME_LABEL,
      getGroup: (t) => t.TESTIMONIALS.ITEMS[id],
    },
    {
      key: `${id}_ORIGIN`,
      type: "text",
      getLabel: (t) => t.TESTIMONIALS.ORIGIN_LABEL,
      getGroup: (t) => t.TESTIMONIALS.ITEMS[id],
    },
    {
      key: `${id}_BODY`,
      type: "textarea",
      getLabel: (t) => t.TESTIMONIALS.BODY_LABEL,
      getGroup: (t) => t.TESTIMONIALS.ITEMS[id],
    },
  ]),
];

export const CMS_SECTION_CONFIGS: ReadonlyArray<CmsSectionConfig> = Object.freeze([
  {
    section: CMS_SECTIONS.HERO,
    getLabel: (t) => t.SECTION_HERO,
    localized: true,
    fields: HERO_FIELDS,
  },
  {
    section: CMS_SECTIONS.ABOUT_TEXT,
    getLabel: (t) => t.SECTION_ABOUT_TEXT,
    localized: true,
    fields: ABOUT_TEXT_FIELDS,
  },
  {
    section: CMS_SECTIONS.ABOUT,
    getLabel: (t) => t.SECTION_ABOUT,
    localized: false,
    imageGrid: true,
    getBodyLabel: (t) => t.ABOUT.IMAGES_LABEL,
    fields: ABOUT_IMAGE_FIELDS,
  },
  {
    section: CMS_SECTIONS.SERVICES,
    getLabel: (t) => t.SECTION_SERVICES,
    localized: true,
    fields: SERVICES_FIELDS,
  },
  {
    section: CMS_SECTIONS.PROPERTIES,
    getLabel: (t) => t.SECTION_PROPERTIES,
    localized: true,
    fields: PROPERTIES_FIELDS,
  },
  {
    section: CMS_SECTIONS.GALLERY,
    getLabel: (t) => t.SECTION_GALLERY,
    localized: true,
    fields: GALLERY_FIELDS,
  },
  {
    section: CMS_SECTIONS.TESTIMONIALS,
    getLabel: (t) => t.SECTION_TESTIMONIALS,
    localized: true,
    fields: TESTIMONIALS_FIELDS,
  },
]);
