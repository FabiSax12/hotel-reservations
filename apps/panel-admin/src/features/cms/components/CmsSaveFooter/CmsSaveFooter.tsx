import type { CmsSaveFooterProps } from "./CmsSaveFooter.interface";
import { CMS_SAVE_FOOTER_STYLES as STYLES } from "./CmsSaveFooter.styles";

export function CmsSaveFooter({
  isSaving,
  isSuccess,
  isError,
  texts,
  type = "button",
  onSave,
}: CmsSaveFooterProps) {
  return (
    <div className={STYLES.footer}>
      <button type={type} className={STYLES.saveBtn} disabled={isSaving} onClick={onSave}>
        {isSaving ? texts.ACTIONS.SAVING : texts.ACTIONS.SAVE}
      </button>

      {isSuccess && (
        <span className={`${STYLES.feedback} ${STYLES.feedbackSuccess}`} role="status">
          {texts.ACTIONS.SUCCESS}
        </span>
      )}
      {isError && (
        <span className={`${STYLES.feedback} ${STYLES.feedbackError}`} role="alert">
          {texts.ACTIONS.ERROR}
        </span>
      )}
    </div>
  );
}
