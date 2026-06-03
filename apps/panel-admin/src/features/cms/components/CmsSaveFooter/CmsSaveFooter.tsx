import type { CmsSaveFooterProps } from "./CmsSaveFooter.interface";
import { CMS_SAVE_FOOTER_STYLES as s } from "./CmsSaveFooter.styles";

export function CmsSaveFooter({
  isSaving,
  isSuccess,
  isError,
  texts,
  type = "button",
  onSave,
}: CmsSaveFooterProps) {
  return (
    <div className={s.footer}>
      <button type={type} className={s.saveBtn} disabled={isSaving} onClick={onSave}>
        {isSaving ? texts.ACTIONS.SAVING : texts.ACTIONS.SAVE}
      </button>

      {isSuccess && (
        <span className={`${s.feedback} ${s.feedbackSuccess}`} role="status">
          {texts.ACTIONS.SUCCESS}
        </span>
      )}
      {isError && (
        <span className={`${s.feedback} ${s.feedbackError}`} role="alert">
          {texts.ACTIONS.ERROR}
        </span>
      )}
    </div>
  );
}
