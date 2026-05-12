/**
 * @file PackageShadow.tsx — Decorative shadow card (US-DM-04).
 *
 * Renders a dark semi-transparent rectangle that peeks from behind the
 * primary RoomCard to create a "stacked envelopes" visual effect.
 * Border-based depth (no box-shadow), consistent with landing page aesthetics.
 *
 * ZERO data loaded — no images, no amenities, no price, no description.
 * Non-interactive: cursor-default, no hover effects, no click handlers.
 */

import { PACKAGE_CARD_STYLES as S } from "../../../../theme/rooms.theme";

interface PackageShadowProps {
  /** Room type label displayed in muted text (e.g. "Standard", "Suite"). */
  roomType: string;
  /** Position index: 0 = first shadow, 1 = second, etc. Controls offset. */
  peekIndex: number;
}

export function PackageShadow({ roomType, peekIndex }: PackageShadowProps) {
  return (
    <div
      className={S.shadowCard(peekIndex)}
      aria-hidden="true"
    >
      <span className={S.shadowLabel}>{roomType}</span>
    </div>
  );
}
