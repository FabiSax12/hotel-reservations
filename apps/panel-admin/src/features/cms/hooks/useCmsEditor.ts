import { useState } from "react";
import {
  CMS_LOCALE_LIST,
  CMS_LOCALES,
  CMS_SAVE_SUCCESS_RESET_MS,
  CMS_SECTIONS,
} from "@/features/cms/constants/cms-fields";
import { CMS_SECTION_CONFIGS } from "@/features/cms/constants/sectionConfigs";
import type { CmsLocale, CmsSection } from "@/features/cms/domain/cms.interface";
import { saveCmsTextAction } from "@/features/cms/services/saveCmsContentAction";
import { useI18n } from "@/locales";
import type { SaveStatus, UseCmsEditorOptions } from "./useCmsEditor.interface";

function buildInitialState(
  initialValues: UseCmsEditorOptions["initialValues"] = {},
): Record<string, Record<string, Record<string, string>>> {
  const state: Record<string, Record<string, Record<string, string>>> = {};
  for (const config of CMS_SECTION_CONFIGS) {
    state[config.section] = {};
    for (const locale of CMS_LOCALE_LIST) {
      state[config.section][locale] = initialValues?.[config.section]?.[locale] ?? {};
    }
  }
  return state;
}

export function useCmsEditor({ initialValues }: UseCmsEditorOptions = {}) {
  const { t } = useI18n();
  const texts = t.CMS;

  const [activeSection, setActiveSection] = useState<CmsSection>(CMS_SECTIONS.HERO);
  const [activeLocale, setActiveLocale] = useState<CmsLocale>(CMS_LOCALES.ES);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [values, setValues] = useState(() => buildInitialState(initialValues));

  const activeSectionConfig = CMS_SECTION_CONFIGS.find((c) => c.section === activeSection)!;

  const handleChange = (section: string, locale: string, field: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [locale]: { ...prev[section]?.[locale], [field]: value },
      },
    }));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const config = activeSectionConfig;
    let success: boolean;

    if (config.localized) {
      const result = await saveCmsTextAction(
        activeLocale,
        config.section,
        values[config.section][activeLocale],
      );
      success = result.success;
    } else {
      const content = values[config.section][CMS_LOCALES.ES];
      const results = await Promise.all(
        CMS_LOCALE_LIST.map((locale) => saveCmsTextAction(locale, config.section, content)),
      );
      success = results.every((r) => r.success);
    }

    setSaveStatus(success ? "success" : "error");
    if (success) setTimeout(() => setSaveStatus("idle"), CMS_SAVE_SUCCESS_RESET_MS);
  };

  return {
    texts,
    activeSection,
    setActiveSection,
    activeLocale,
    setActiveLocale,
    values,
    handleChange,
    handleSave,
    activeSectionConfig,
    isSaving: saveStatus === "saving",
    isSuccess: saveStatus === "success",
    isError: saveStatus === "error",
  };
}
