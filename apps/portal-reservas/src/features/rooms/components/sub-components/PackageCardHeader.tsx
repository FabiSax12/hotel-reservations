/**
 * @file PackageCardHeader.tsx — Image collage for room packages (US-DM-04).
 *
 * Displays room images in a grid layout:
 * - 2 rooms: 50/50 split
 * - 3 rooms: 50/50 top row + 100% bottom
 * - 4+ rooms: 50/50 grid
 * - Homogeneous: Single image with room count overlay
 */

"use client";

import type { PackageCardHeaderProps } from "../../domain/types";
import { PACKAGE_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";

export function PackageCardHeader({ rooms, isHomogeneous }: PackageCardHeaderProps) {
  const { t } = useI18n();
  const roomCount = rooms.length;

  if (isHomogeneous || roomCount === 1) {
    return (
      <div className={S.imageCollage}>
        <div className={S.imageSingle}>
          <img
            src={rooms[0].image}
            alt={rooms[0].title}
            className={S.image}
          />
        </div>
        <div className={S.roomCountBadge}>
          <span>×{roomCount}</span>
        </div>
      </div>
    );
  }

  // Mixed package: show grid of room images
  const displayRooms = rooms.slice(0, 4);

  return (
    <div className={S.imageCollage}>
      {roomCount === 2 && (
        <div className={S.imageGrid2}>
          {displayRooms.map((room, i) => (
            <div key={room.id} className={S.imageCell}>
              <img src={room.image} alt={room.title} className={S.image} />
            </div>
          ))}
        </div>
      )}

      {roomCount === 3 && (
        <div className={S.imageGrid3}>
          <div className={S.imageCell}>
            <img src={displayRooms[0].image} alt={displayRooms[0].title} className={S.image} />
          </div>
          <div className={S.imageCell}>
            <img src={displayRooms[1].image} alt={displayRooms[1].title} className={S.image} />
          </div>
          <div className="col-span-2 relative overflow-hidden">
            <img src={displayRooms[2].image} alt={displayRooms[2].title} className={S.image} />
          </div>
        </div>
      )}

      {roomCount >= 4 && (
        <div className={S.imageGrid4}>
          {displayRooms.slice(0, 4).map((room, i) => (
            <div key={room.id} className={S.imageCell}>
              <img src={room.image} alt={room.title} className={S.image} />
            </div>
          ))}
        </div>
      )}

      <div className={S.roomCountBadge}>
        <span>{roomCount} {t.ROOMS.ROOMS_PLURAL}</span>
      </div>
    </div>
  );
}
