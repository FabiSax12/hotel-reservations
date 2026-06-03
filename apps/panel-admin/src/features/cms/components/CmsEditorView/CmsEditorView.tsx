"use client";

import { useCmsEditor } from "@/features/cms/hooks/useCmsEditor";
import { CmsSectionEditor } from "@/features/cms/components/CmsSectionEditor/CmsSectionEditor";
import { CMS_SECTION_CONFIGS } from "@/features/cms/constants/sectionConfigs";
import { CMS_EDITOR_VIEW_STYLES as STYLES } from "./CmsEditorView.styles";
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
    <main className={STYLES.wrapper}>
      <div className={STYLES.inner}>
        <h1 className={STYLES.title}>{texts.PAGE_TITLE}</h1>

        <div className={STYLES.card}>
          <div className={STYLES.sectionTabs}>
            {CMS_SECTION_CONFIGS.map((config) => (
              <button
                key={config.section}
                type="button"
                className={`${STYLES.sectionTab}${activeSection === config.section ? ` ${STYLES.sectionTabActive}` : ""}`}
                onClick={() => setActiveSection(config.section)}
              >
                {config.getLabel(texts)}
              </button>
            ))}
          </div>

          <div className={STYLES.body}>
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
