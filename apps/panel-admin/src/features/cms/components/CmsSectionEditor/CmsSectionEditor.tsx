"use client";

import { CMS_LOCALES, CMS_LOCALE_LIST } from "@/features/cms/constants/cms-fields";
import { CMS_LOCALE_LABELS } from "@/features/cms/constants/sectionConfigs";
import { ImageUploadSlot } from "@/features/cms/components/ImageUploadSlot/ImageUploadSlot";
import { CmsSaveFooter } from "@/features/cms/components/CmsSaveFooter/CmsSaveFooter";
import { CMS_SECTION_EDITOR_STYLES as s } from "./CmsSectionEditor.styles";
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
        <span className={s.bodyLabel}>{config.getBodyLabel(texts)}</span>
      )}

      <div className={config.imageGrid ? s.grid : s.fields}>
        {config.fields.map((field, idx) => {
          const value = fieldValues[field.key] ?? "";

          if (field.type === "image-slot") {
            return (
              <ImageUploadSlot
                key={field.key}
                slot={idx}
                currentUrl={value}
                onUrlChange={(url) => onChange(readLocale, field.key, url)}
                texts={texts}
              />
            );
          }

          return (
            <div key={field.key} className={s.fieldGroup}>
              <label className={s.label}>{field.getLabel(texts)}</label>
              {field.type === "textarea" ? (
                <textarea
                  className={s.textarea}
                  value={value}
                  placeholder={field.getPlaceholder?.(texts) ?? ""}
                  onChange={(e) => onChange(readLocale, field.key, e.target.value)}
                />
              ) : (
                <input
                  className={s.input}
                  value={value}
                  placeholder={field.getPlaceholder?.(texts) ?? ""}
                  onChange={(e) => onChange(readLocale, field.key, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={s.wrapper}>
      {config.localized && (
        <div className={s.localeTabs}>
          {CMS_LOCALE_LIST.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${s.localeTab}${activeLocale === locale ? ` ${s.localeTabActive}` : ""}`}
              onClick={() => onLocaleChange(locale)}
            >
              {CMS_LOCALE_LABELS[locale]?.(texts) ?? locale.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {hasTextFields ? (
        <form onSubmit={handleSubmit} className={s.formBody}>
          {body}
          <CmsSaveFooter type="submit" isSaving={isSaving} isSuccess={isSuccess} isError={isError} texts={texts} />
        </form>
      ) : (
        <div className={s.formBody}>
          {body}
          <CmsSaveFooter isSaving={isSaving} isSuccess={isSuccess} isError={isError} texts={texts} onSave={onSave} />
        </div>
      )}
    </div>
  );
}
