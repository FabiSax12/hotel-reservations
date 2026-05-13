import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";

export interface ImageUploadSlotProps {
  slot: number;
  currentUrl: string;
  onUrlChange: (url: string) => void;
  texts: CmsTexts;
}
