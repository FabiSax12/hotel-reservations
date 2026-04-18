/**
 * @file RoomImagePanel.tsx — Room card image with urgency overlay.
 *
 * Renders the room's hero photograph as a background-cover div.
 * When the room is scarce (≤ 2 available), a red urgency badge is
 * overlaid in the top-left corner showing either "¡Última habitación!"
 * or "Solo quedan N habitaciones".
 */

import type { Room } from '../domain/types';
import { UI_CONSTANTS } from '../../../shared/constants/ui';
import { ROOM_CARD_STYLES as S } from '../../../theme/rooms.theme';

interface RoomImagePanelProps {
  /** URL for the room's hero image. */
  image: string;
  /** Number of rooms currently available. */
  inventory: number;
  /** Whether the inventory level is low enough to warrant an urgency badge. */
  isScarce: boolean;
}

export function RoomImagePanel({ image, inventory, isScarce }: RoomImagePanelProps) {
  return (
    <div className={S.imageWrapper}>
      <div className={S.image} style={{ backgroundImage: `url('${image}')` }} />

      {/* Red urgency badge — only visible for scarce rooms */}
      {isScarce && (
        <div className={S.urgencyBadge}>
          <svg className={S.urgencyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {inventory === 1
            ? UI_CONSTANTS.ROOMS.LAST_ROOM
            : `${UI_CONSTANTS.ROOMS.ONLY_REMAINING} ${inventory} ${UI_CONSTANTS.ROOMS.ROOMS_PLURAL}`}
        </div>
      )}
    </div>
  );
}
