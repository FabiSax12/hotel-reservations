import { forbidden } from "next/navigation";
import { CmsEditorView } from "@/features/cms/components/CmsEditorView/CmsEditorView";
import { CMS_LOCALE_LIST, CMS_LOCALES } from "@/features/cms/constants/cms-fields";
import { CMS_SECTION_CONFIGS } from "@/features/cms/constants/sectionConfigs";
import { getCmsSection } from "@/features/cms/services/getCmsContent";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";

export default async function CmsPage() {
  try {
    const entries = await Promise.all(
      CMS_SECTION_CONFIGS.flatMap((config) => {
        const localesToFetch = config.localized ? [...CMS_LOCALE_LIST] : [CMS_LOCALES.ES];
        return localesToFetch.map(async (locale) => {
          const data = await getCmsSection(locale, config.section);
          return { locale, section: config.section, data };
        });
      }),
    );

    const initialValues: Record<string, Record<string, Record<string, string>>> = {};
    for (const { locale, section, data } of entries) {
      if (!initialValues[section]) initialValues[section] = {};
      if (data) initialValues[section][locale] = data;
    }

    return <CmsEditorView initialValues={initialValues} />;
  } catch (e) {
    if (e instanceof AuthenticationRequiredError || e instanceof PermissionDeniedError) {
      forbidden();
    }

    throw e;
  }
}
