"use client";

import { CMS_LOCALES, CMS_LOCALE_LIST } from "@/features/cms/constants/cms-fields";
import { CMS_LOCALE_LABELS } from "@/features/cms/constants/sectionConfigs";
import { CmsSaveFooter } from "@/features/cms/components/CmsSaveFooter/CmsSaveFooter";
import { CMS_SECTION_EDITOR_STYLES as STYLES } from "./CmsSectionEditor.styles";
import { CmsSectionFields } from "./CmsSectionFields";
import type { CmsSectionEditorProps } from "./CmsSectionEditor.interface";

export function CmsSectionEditor({
  config,
  localeValues,
  activeLocale,
  onLocaleChange,
  onChange,
  onSave,
  isSaving,
  isSuccess,
  isError,
  texts,
}: CmsSectionEditorProps) {
  const readLocale = config.localized ? activeLocale : CMS_LOCALES.ES;
  const fieldValues = localeValues[readLocale] ?? {};
  const hasTextFields = config.fields.some((f) => f.type !== "image-slot");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const body = (
    <>
      {config.getBodyLabel && (
        <span className={STYLES.bodyLabel}>{config.getBodyLabel(texts)}</span>
      )}
      <CmsSectionFields
        config={config}
        fieldValues={fieldValues}
        readLocale={readLocale}
        onChange={onChange}
        texts={texts}
      />
    </>
  );

  return (
    <div className={STYLES.wrapper}>
      {config.localized && (
        <div className={STYLES.localeTabs}>
          {CMS_LOCALE_LIST.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${STYLES.localeTab}${activeLocale === locale ? ` ${STYLES.localeTabActive}` : ""}`}
              onClick={() => onLocaleChange(locale)}
            >
              {CMS_LOCALE_LABELS[locale]?.(texts) ?? locale.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {hasTextFields ? (
        <form onSubmit={handleSubmit} className={STYLES.formBody}>
          {body}
          <CmsSaveFooter type="submit" isSaving={isSaving} isSuccess={isSuccess} isError={isError} texts={texts} />
        </form>
      ) : (
        <div className={STYLES.formBody}>
          {body}
          <CmsSaveFooter isSaving={isSaving} isSuccess={isSuccess} isError={isError} texts={texts} onSave={onSave} />
        </div>
      )}
    </div>
  );
}
