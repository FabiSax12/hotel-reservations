/**
 * @file error.tsx — Route-level error boundary for the home page.
 */

"use client";

import { APP_PAGE_STRINGS } from "../constants/app-pages.constants";
import { ERROR_PAGE_STYLES as S } from "../theme/app-pages.theme";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={S.main}>
      <div className={S.contentWrapper}>
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
        <button type="button" onClick={reset} className={S.retryBtn}>
          {APP_PAGE_STRINGS.ERROR_RETRY}
        </button>
      </div>
    </main>
  );
}
