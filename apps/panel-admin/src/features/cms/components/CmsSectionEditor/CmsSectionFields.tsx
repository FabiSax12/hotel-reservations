"use client";

import type { CmsFieldConfig, CmsSectionConfig } from "@/features/cms/domain/cms.interface";
import type { CmsTexts } from "@/features/cms/i18n/cmsTexts.type";
import { ImageUploadSlot } from "@/features/cms/components/ImageUploadSlot/ImageUploadSlot";
import { CMS_SECTION_EDITOR_STYLES as STYLES } from "./CmsSectionEditor.styles";

const UNGROUPED = "__ungrouped__";

interface CmsSectionFieldsProps {
  config: CmsSectionConfig;
  fieldValues: Record<string, string>;
  readLocale: string;
  onChange: (locale: string, field: string, value: string) => void;
  texts: CmsTexts;
}

interface FieldGroup {
  key: string;
  label: string | null;
  fields: { field: CmsFieldConfig; idx: number }[];
}

function buildGroups(fields: CmsFieldConfig[], texts: CmsTexts): FieldGroup[] {
  const groups: FieldGroup[] = [];
  fields.forEach((field, idx) => {
    const label = field.getGroup?.(texts) ?? null;
    const key = label ?? UNGROUPED;
    const existing = groups.find((g) => g.key === key);
    if (existing) {
      existing.fields.push({ field, idx });
    } else {
      groups.push({ key, label, fields: [{ field, idx }] });
    }
  });
  return groups;
}

export function CmsSectionFields({
  config,
  fieldValues,
  readLocale,
  onChange,
  texts,
}: CmsSectionFieldsProps) {
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
      <div key={field.key} className={STYLES.fieldGroup}>
        <label className={STYLES.label}>{field.getLabel(texts)}</label>
        {field.type === "textarea" ? (
          <textarea
            className={STYLES.textarea}
            value={value}
            placeholder={field.getPlaceholder?.(texts) ?? ""}
            onChange={(e) => onChange(readLocale, field.key, e.target.value)}
          />
        ) : (
          <input
            className={STYLES.input}
            value={value}
            placeholder={field.getPlaceholder?.(texts) ?? ""}
            onChange={(e) => onChange(readLocale, field.key, e.target.value)}
          />
        )}
      </div>
    );
  };

  if (config.imageGrid) {
    return (
      <div className={STYLES.grid}>
        {config.fields.map((field, idx) => renderField(field, idx))}
      </div>
    );
  }

  const hasGroups = config.fields.some((f) => f.getGroup);
  if (!hasGroups) {
    return (
      <div className={STYLES.fields}>
        {config.fields.map((field, idx) => renderField(field, idx))}
      </div>
    );
  }

  const groups = buildGroups(config.fields, texts);

  return (
    <div className={STYLES.fields}>
      {groups.map((group) => (
        <div key={group.key} className={STYLES.groupWrapper}>
          {group.label && <div className={STYLES.groupHeader}>{group.label}</div>}
          <div className={STYLES.groupFields}>
            {group.fields.map(({ field, idx }) => renderField(field, idx))}
          </div>
        </div>
      ))}
    </div>
  );
}
