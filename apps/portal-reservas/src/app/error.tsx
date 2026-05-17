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

import { APP_PAGE_STRINGS } from "../constants/app-pages.constants";
import { ERROR_PAGE_STYLES as S } from "../theme/app-pages.theme";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={S.main}>
      <div className={S.contentWrapper}>
        {/* Warning icon */}
        <div className={S.iconCircle}>
          <svg
            className={S.icon}
            fill="none"
            viewBox={S.icons.error.viewBox}
            stroke="currentColor"
            strokeWidth={S.icons.error.strokeWidth}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.error.path} />
          </svg>
        </div>
        <h2 className={S.title}>{APP_PAGE_STRINGS.ERROR_TITLE}</h2>
        <p className={S.message}>{APP_PAGE_STRINGS.ERROR_MESSAGE}</p>
        {/* Retry button — calls reset() to re-render the errored segment. */}
        <button type="button" onClick={reset} className={S.retryBtn}>
          {APP_PAGE_STRINGS.ERROR_RETRY}
        </button>
      </div>
    </main>
  );
}
