/**
 * @file HeaderNav.tsx — Navigation controls in the right side of the header.
 *
 * Contains the "Help" button and the "My Reservations" button with an
 * avatar icon. Both are currently presentational placeholders that will
 * be wired to navigation routes in a future iteration.
 */

import { HEADER_STYLES as S } from "../../../theme/layout.theme";
import { useI18n } from "@/locales";

export function HeaderNav() {
  const { t } = useI18n();

  return (
    <div className={S.nav}>
      <button className={S.helpBtn}>{t.LAYOUT.HEADER.HELP}</button>
      <button className={S.myReservationsBtn}>
        <div className={S.myReservationsLabel}>
          <div className={S.myReservationsText}>{t.LAYOUT.HEADER.MY_RESERVATIONS}</div>
        </div>
        {/* Circular avatar placeholder */}
        <div className={S.avatarWrapper}>
          <svg
            className={S.avatarIcon}
            fill="none"
            viewBox={S.icons.avatar.viewBox}
            stroke="currentColor"
            strokeWidth={S.icons.avatar.strokeWidth}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={S.icons.avatar.path} />
          </svg>
        </div>
      </button>
    </div>
  );
}
