/**
 * @file CTASpinner.tsx — Reusable loading spinner for CTA buttons.
 */

import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";

export function CTASpinner() {
  return (
    <svg className={S.reserveBtnLoader} viewBox="0 0 24 24" fill="none">
      <circle className={S.ctaSpinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className={S.ctaSpinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
