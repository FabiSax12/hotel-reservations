import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";

export interface CmsSaveFooterProps {
  isSaving: boolean;
  isSuccess: boolean;
  isError: boolean;
  texts: Pick<CmsTexts, "ACTIONS">;
  type?: "submit" | "button";
  onSave?: () => void;
}
