import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";

export type SaveCmsResult = { success: true } | { success: false; error: string };
export type UploadCmsImageResult =
  | { success: true; url: string }
  | { success: false; error: string };

export type CmsFieldType = "text" | "textarea" | "image-slot";
export type CmsSection =
  | "hero"
  | "about"
  | "about-text"
  | "services"
  | "properties"
  | "gallery"
  | "testimonials";
export type CmsLocale = "es" | "en";

export interface CmsFieldConfig {
  key: string;
  type: CmsFieldType;
  getLabel: (texts: CmsTexts) => string;
  getPlaceholder?: (texts: CmsTexts) => string;
  getGroup?: (texts: CmsTexts) => string;
}

export interface CmsSectionConfig {
  section: CmsSection;
  getLabel: (texts: CmsTexts) => string;
  localized: boolean;
  imageGrid?: boolean;
  getBodyLabel?: (texts: CmsTexts) => string;
  fields: CmsFieldConfig[];
}
