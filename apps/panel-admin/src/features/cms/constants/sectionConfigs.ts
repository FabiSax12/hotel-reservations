import type { CmsSectionConfig } from "@/features/cms/domain/cms.interface";
import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";
import { CMS_LOCALES, CMS_SECTIONS } from "./cms-fields";

export const CMS_LOCALE_LABELS: Record<string, (texts: CmsTexts) => string> = Object.freeze({
  [CMS_LOCALES.ES]: (t: CmsTexts) => t.LOCALE_ES,
  [CMS_LOCALES.EN]: (t: CmsTexts) => t.LOCALE_EN,
});

export const CMS_SECTION_CONFIGS: ReadonlyArray<CmsSectionConfig> = Object.freeze([
  {
    section: CMS_SECTIONS.HERO,
    getLabel: (t) => t.SECTION_HERO,
    localized: true,
    fields: [
      {
        key: "HEADLINE_LINE1",
        type: "text",
        getLabel: (t) => t.HERO.TITLE_LABEL,
        getPlaceholder: (t) => t.HERO.TITLE_PLACEHOLDER,
      },
      {
        key: "SUBHEADLINE",
        type: "textarea",
        getLabel: (t) => t.HERO.SUBTITLE_LABEL,
        getPlaceholder: (t) => t.HERO.SUBTITLE_PLACEHOLDER,
      },
      {
        key: "CTA_PRIMARY",
        type: "text",
        getLabel: (t) => t.HERO.CTA_LABEL,
        getPlaceholder: (t) => t.HERO.CTA_PLACEHOLDER,
      },
    ],
  },
  {
    section: CMS_SECTIONS.ABOUT,
    getLabel: (t) => t.SECTION_ABOUT,
    localized: false,
    imageGrid: true,
    getBodyLabel: (t) => t.ABOUT.IMAGES_LABEL,
    fields: [
      { key: "MOSAIC_URL_1", type: "image-slot", getLabel: (t) => t.ABOUT.IMAGE_SLOT_LABEL },
      { key: "MOSAIC_URL_2", type: "image-slot", getLabel: (t) => t.ABOUT.IMAGE_SLOT_LABEL },
      { key: "MOSAIC_URL_3", type: "image-slot", getLabel: (t) => t.ABOUT.IMAGE_SLOT_LABEL },
    ],
  },
]);
