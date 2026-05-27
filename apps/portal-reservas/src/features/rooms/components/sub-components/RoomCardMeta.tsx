/**
 * @file RoomCardMeta.tsx — Admin tip quote and short description.
 *
 * US-DM-02 redesign: removed room type chip and sqft label (per product decision).
 * Replaced with an editorial quote element displaying the administrator's tip
 * for this room — the same content that was previously overlaid on the image.
 *
 * The adminTip now lives in the card body as a stylized pull-quote, giving it
 * proper reading context and removing clutter from the image panel.
 */

import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import type { RoomCardMetaProps } from "../../domain/types";

export function RoomCardMeta({ room }: RoomCardMetaProps) {
  return (
    <>
      {/* Admin tip — editorial pull-quote style */}
      {room.adminTip && (
        <figure className={S.adminTipQuote}>
          <svg
            className={S.adminTipQuoteIcon}
            viewBox="0 0 32 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {/* Decorative open-quote glyph */}
            <path d="M0 24V14.4C0 6.48 4.32 1.44 12.96 0l1.44 2.64C9.6 3.84 7.2 6.72 6.48 11.28H12V24H0Zm18 0V14.4C18 6.48 22.32 1.44 30.96 0l1.44 2.64C27.6 3.84 25.2 6.72 24.48 11.28H30V24H18Z" />
          </svg>
          <blockquote className={S.adminTipQuoteText}>{room.adminTip}</blockquote>
        </figure>
      )}

      <p className={S.description}>{room.description}</p>
    </>
  );
}
