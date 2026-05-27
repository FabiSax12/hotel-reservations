"use client";

import { useCmsEditor } from "@/features/cms/hooks/useCmsEditor";
import { CmsSectionEditor } from "@/features/cms/components/CmsSectionEditor/CmsSectionEditor";
import { CMS_SECTION_CONFIGS } from "@/features/cms/constants/sectionConfigs";
import { CMS_EDITOR_VIEW_STYLES as s } from "./CmsEditorView.styles";
import type { CmsEditorViewProps } from "./CmsEditorView.interface";

export function CmsEditorView({ initialValues }: CmsEditorViewProps) {
  const {
    texts,
    activeSection,
    setActiveSection,
    activeLocale,
    setActiveLocale,
    values,
    handleChange,
    handleSave,
    activeSectionConfig,
    isSaving,
    isSuccess,
    isError,
  } = useCmsEditor({ initialValues });

  return (
    <main className={s.wrapper}>
      <div className={s.inner}>
        <h1 className={s.title}>{texts.PAGE_TITLE}</h1>

        <div className={s.card}>
          <div className={s.sectionTabs}>
            {CMS_SECTION_CONFIGS.map((config) => (
              <button
                key={config.section}
                type="button"
                className={`${s.sectionTab}${activeSection === config.section ? ` ${s.sectionTabActive}` : ""}`}
                onClick={() => setActiveSection(config.section)}
              >
                {config.getLabel(texts)}
              </button>
            ))}
          </div>

          <div className={s.body}>
            <CmsSectionEditor
              config={activeSectionConfig}
              localeValues={values[activeSection] ?? {}}
              activeLocale={activeLocale}
              onLocaleChange={setActiveLocale}
              onChange={(locale, field, value) => handleChange(activeSection, locale, field, value)}
              onSave={handleSave}
              isSaving={isSaving}
              isSuccess={isSuccess}
              isError={isError}
              texts={texts}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
