/**
 * @file RoomImagePanel.tsx — Room card image with badges.
 *
 * Shows:
 * - Last room badge: top-left (only when inventory is 1)
 * - Capacity badge: top-right (person icon + count)
 */

import type { Room } from "../domain/types";
import { ROOM_CARD_STYLES } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";

const SVG_VIEW_BOX = "0 0 24 24";

const URGENCY_CLOCK_ICON_PATH =
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";

const CAPACITY_PERSON_ICON_PATH =
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";

interface RoomImagePanelProps {
  room: Room;
}

export function RoomImagePanel({ room }: RoomImagePanelProps) {
  const { t } = useI18n();

  return (
    <div className={ROOM_CARD_STYLES.imageWrapper}>
      <div className={ROOM_CARD_STYLES.image} style={{ backgroundImage: `url('${room.image}')` }} />

      {/* Last room badge — top-left, only when inventory is 1 */}
      {room.inventory === 1 && (
        <div className={ROOM_CARD_STYLES.urgencyBadge} role="status">
          <svg className={ROOM_CARD_STYLES.urgencyIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d={URGENCY_CLOCK_ICON_PATH} />
          </svg>
          {t.ROOMS.LAST_ROOM}
        </div>
      )}

      {/* Capacity badge — top-right */}
      <div className={ROOM_CARD_STYLES.capacityBadge}>
        <svg className={ROOM_CARD_STYLES.capacityBadgeIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={CAPACITY_PERSON_ICON_PATH} />
        </svg>
        {room.capacity}
      </div>
    </div>
  );
}
