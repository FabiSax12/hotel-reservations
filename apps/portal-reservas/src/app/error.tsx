/**
 * @file error.tsx — Root-level Error Boundary for the entire app.
 *
 * Catches any unhandled error thrown during rendering of the root page or layout.
 * Renders outside the I18nProvider boundary, so strings come from APP_PAGE_STRINGS
 * (not from the i18n system). Styles come from app-pages.theme.ts.
 *
 * This is a "use client" component as required by Next.js for error boundaries.
 */

"use client";

import { ERROR_PAGE_STYLES } from "../theme/app-pages.theme";
import { APP_PAGE_STRINGS } from "../constants/app-pages.constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={ERROR_PAGE_STYLES.main}>
      <div className={ERROR_PAGE_STYLES.contentWrapper}>
        {/* Warning icon */}
        <div className={ERROR_PAGE_STYLES.iconCircle}>
          <svg className={ERROR_PAGE_STYLES.icon} fill="none" viewBox={ERROR_PAGE_STYLES.icons.error.viewBox} stroke="currentColor" strokeWidth={ERROR_PAGE_STYLES.icons.error.strokeWidth}>
            <path strokeLinecap="round" strokeLinejoin="round" d={ERROR_PAGE_STYLES.icons.error.path} />
          </svg>
        </div>
        <h2 className={ERROR_PAGE_STYLES.title}>{APP_PAGE_STRINGS.ERROR_TITLE}</h2>
        <p className={ERROR_PAGE_STYLES.message}>
          {APP_PAGE_STRINGS.ERROR_MESSAGE}
        </p>
        {/* Retry button — calls reset() to re-render the errored segment. */}
        <button
          type="button"
          onClick={reset}
          className={ERROR_PAGE_STYLES.retryBtn}
        >
          {APP_PAGE_STRINGS.ERROR_RETRY}
        </button>
      </div>
    </main>
  );
}
