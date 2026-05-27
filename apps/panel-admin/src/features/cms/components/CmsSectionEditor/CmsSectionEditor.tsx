"use client";

import type { CmsFieldConfig } from "@/features/cms/domain/cms.interface";
import { CMS_LOCALES, CMS_LOCALE_LIST } from "@/features/cms/constants/cms-fields";
import { CMS_LOCALE_LABELS } from "@/features/cms/constants/sectionConfigs";
import { ImageUploadSlot } from "@/features/cms/components/ImageUploadSlot/ImageUploadSlot";
import { CmsSaveFooter } from "@/features/cms/components/CmsSaveFooter/CmsSaveFooter";
import { CMS_SECTION_EDITOR_STYLES as s } from "./CmsSectionEditor.styles";
import type { CmsSectionEditorProps } from "./CmsSectionEditor.interface";

const UNGROUPED = "__ungrouped__";

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

  const renderField = (field: CmsFieldConfig, idx: number) => {
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
  };

  const hasGroups = config.fields.some((f) => f.getGroup);

  const renderFields = () => {
    if (config.imageGrid) {
      return (
        <div className={s.grid}>
          {config.fields.map((field, idx) => renderField(field, idx))}
        </div>
      );
    }

    if (!hasGroups) {
      return (
        <div className={s.fields}>
          {config.fields.map((field, idx) => renderField(field, idx))}
        </div>
      );
    }

    const groups: { key: string; label: string | null; fields: { field: CmsFieldConfig; idx: number }[] }[] = [];
    config.fields.forEach((field, idx) => {
      const label = field.getGroup?.(texts) ?? null;
      const key = label ?? UNGROUPED;
      const existing = groups.find((g) => g.key === key);
      if (existing) {
        existing.fields.push({ field, idx });
      } else {
        groups.push({ key, label, fields: [{ field, idx }] });
      }
    });

    return (
      <div className={s.fields}>
        {groups.map((group) => (
          <div key={group.key} className={s.groupWrapper}>
            {group.label && <div className={s.groupHeader}>{group.label}</div>}
            <div className={s.groupFields}>
              {group.fields.map(({ field, idx }) => renderField(field, idx))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const body = (
    <>
      {config.getBodyLabel && <span className={s.bodyLabel}>{config.getBodyLabel(texts)}</span>}
      {renderFields()}
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
