/**
 * @file CTASpinner.tsx — Reusable loading spinner for CTA buttons.
 */

import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";

const SVG_VIEW_BOX = "0 0 24 24";
const SPINNER_ARC_PATH = "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z";

export function CTASpinner() {
  return (
    <svg className={ROOM_CARD_STYLES.reserveBtnLoader} viewBox={SVG_VIEW_BOX} fill="none">
      <circle className={ROOM_CARD_STYLES.ctaSpinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className={ROOM_CARD_STYLES.ctaSpinnerPath} fill="currentColor" d={SPINNER_ARC_PATH} />
    </svg>
  );
}
