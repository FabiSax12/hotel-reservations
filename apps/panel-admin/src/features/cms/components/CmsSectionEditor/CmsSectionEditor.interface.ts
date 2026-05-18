import type { CmsSectionConfig, CmsLocale } from "@/features/cms/domain/cms.interface";
import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";

export interface CmsSectionEditorProps {
  config: CmsSectionConfig;
  localeValues: Record<string, Record<string, string>>;
  activeLocale: CmsLocale;
  onLocaleChange: (locale: CmsLocale) => void;
  onChange: (locale: string, field: string, value: string) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
  isSuccess: boolean;
  isError: boolean;
  texts: CmsTexts;
}
