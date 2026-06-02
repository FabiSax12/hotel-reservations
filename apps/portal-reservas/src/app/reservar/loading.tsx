/**
 * @file loading.tsx — Loading boundary for the reservation routes.
 *
 * Server Component (CSS-only). Renders outside the I18nProvider boundary, so
 * strings come from APP_PAGE_STRINGS and styles from app-pages.theme.ts.
 */

import { APP_PAGE_STRINGS } from "@/constants/app-pages.constants";
import { LOADING_PAGE_STYLES } from "@/theme/app-pages.theme";

export default function Loading() {
  return (
    <main className={LOADING_PAGE_STYLES.main}>
      <div className={LOADING_PAGE_STYLES.contentWrapper}>
        <div className={LOADING_PAGE_STYLES.spinner} />
        <p className={LOADING_PAGE_STYLES.text}>{APP_PAGE_STRINGS.LOADING_TEXT}</p>
      </div>
    </main>
  );
}
