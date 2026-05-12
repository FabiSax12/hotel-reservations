/**
 * @file loading.tsx — Route-level loading boundary for the home page.
 */

import { LOADING_PAGE_STYLES as S } from "../theme/app-pages.theme";
import { APP_PAGE_STRINGS } from "../constants/app-pages.constants";

export default function Loading() {
  return (
    <main className={S.main}>
      <div className={S.contentWrapper}>
        <div className={S.spinner} />
        <p className={S.text}>
          {APP_PAGE_STRINGS.LOADING_TEXT}
        </p>
      </div>
    </main>
  );
}
