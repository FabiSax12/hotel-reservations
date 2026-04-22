/**
 * @file HeaderNav.tsx — Navigation controls in the right side of the header.
 *
 * Contains the "Help" button and the "My Reservations" button with an
 * avatar icon. Both are currently presentational placeholders that will
 * be wired to navigation routes in a future iteration.
 */

import { UI_CONSTANTS } from "../../../shared/constants/ui";
import { HEADER_STYLES as S } from "../../../theme/layout.theme";

export function HeaderNav() {
  return (
    <div className={S.nav}>
      <button className={S.helpBtn}>{UI_CONSTANTS.HEADER.HELP}</button>
      <button className={S.myReservationsBtn}>
        <div className={S.myReservationsLabel}>
          <div className={S.myReservationsText}>{UI_CONSTANTS.HEADER.MY_RESERVATIONS}</div>
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
