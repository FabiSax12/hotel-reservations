/**
 * @file loading.tsx — Root-level Loading Boundary for the entire app.
 *
 * Displayed by Next.js Suspense while the root page's async data fetching is in progress.
 * This is a Server Component (no "use client" directive — it only uses CSS, no hooks).
 *
 * Renders outside the I18nProvider boundary, so strings come from APP_PAGE_STRINGS.
 * Styles come from app-pages.theme.ts.
 */

import { APP_PAGE_STRINGS } from "../constants/app-pages.constants";
import { LOADING_PAGE_STYLES as S } from "../theme/app-pages.theme";

export default function Loading() {
  return (
    <main className={S.main}>
      <div className={S.contentWrapper}>
        {/* CSS-only spinner — no JavaScript needed. */}
        <div className={S.spinner} />
        <p className={S.text}>{APP_PAGE_STRINGS.LOADING_TEXT}</p>
      </div>
    </main>
  );
}
