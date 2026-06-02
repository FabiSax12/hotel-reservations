/**
 * @file error.tsx — Error boundary for the reservation routes.
 *
 * Client component (required by Next.js for error boundaries). Renders outside
 * the I18nProvider boundary, so strings come from APP_PAGE_STRINGS and styles
 * from app-pages.theme.ts.
 */

"use client";

import { APP_PAGE_STRINGS } from "@/constants/app-pages.constants";
import { ERROR_PAGE_STYLES } from "@/theme/app-pages.theme";

export default function ReserveError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={ERROR_PAGE_STYLES.main}>
      <div className={ERROR_PAGE_STYLES.contentWrapper}>
        <div className={ERROR_PAGE_STYLES.iconCircle}>
          <svg
            className={ERROR_PAGE_STYLES.icon}
            fill="none"
            viewBox={ERROR_PAGE_STYLES.icons.error.viewBox}
            stroke="currentColor"
            strokeWidth={ERROR_PAGE_STYLES.icons.error.strokeWidth}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={ERROR_PAGE_STYLES.icons.error.path}
            />
          </svg>
        </div>
        <h2 className={ERROR_PAGE_STYLES.title}>{APP_PAGE_STRINGS.ERROR_TITLE}</h2>
        <p className={ERROR_PAGE_STYLES.message}>{APP_PAGE_STRINGS.ERROR_MESSAGE}</p>
        <button type="button" onClick={reset} className={ERROR_PAGE_STYLES.retryBtn}>
          {APP_PAGE_STRINGS.ERROR_RETRY}
        </button>
      </div>
    </main>
  );
}
