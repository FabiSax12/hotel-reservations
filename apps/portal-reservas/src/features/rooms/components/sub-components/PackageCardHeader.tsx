/**
 * @file PackageCardHeader.tsx — Portrait image collage for room packages (US-DM-04).
 *
 * Same dimensions as RoomCard's image panel (w-[380px] h-auto on desktop).
 * Displays room images in a portrait-oriented grid:
 * - Homogeneous: Single image with ×N badge
 * - 2 rooms: Stacked vertically (50% each)
 * - 3 rooms: 2×2 grid with 3 cells filled
 * - 4 rooms: 2×2 grid
 */

"use client";

import type { PackageCardHeaderProps } from "../../domain/types";
import { PACKAGE_CARD_STYLES } from "../../../../theme/rooms.theme";

export function PackageCardHeader({ rooms, isHomogeneous }: PackageCardHeaderProps) {
  const roomCount = rooms.length;

  return (
    <div className={PACKAGE_CARD_STYLES.imageWrapper}>
      {isHomogeneous || roomCount === 1 ? (
        <div className={PACKAGE_CARD_STYLES.imageSingle}>
          <div
            className={PACKAGE_CARD_STYLES.image}
            style={{ backgroundImage: `url(${rooms[0].image})` }}
          />
        </div>
      ) : roomCount === 2 ? (
        <div className={PACKAGE_CARD_STYLES.imageGrid2}>
          {rooms.map((room, i) => (
            <div key={`${room.id}-${i}`} className={PACKAGE_CARD_STYLES.imageCell}>
              <div
                className={PACKAGE_CARD_STYLES.image}
                style={{ backgroundImage: `url(${room.image})` }}
              />
            </div>
          ))}
        </div>
      ) : roomCount === 3 ? (
        <div className={PACKAGE_CARD_STYLES.imageGrid3}>
          <div className={PACKAGE_CARD_STYLES.imageCell}>
            <div
              className={PACKAGE_CARD_STYLES.image}
              style={{ backgroundImage: `url(${rooms[0].image})` }}
            />
          </div>
          <div className={PACKAGE_CARD_STYLES.imageCell}>
            <div
              className={PACKAGE_CARD_STYLES.image}
              style={{ backgroundImage: `url(${rooms[1].image})` }}
            />
          </div>
          <div className="col-span-2 relative overflow-hidden">
            <div
              className={PACKAGE_CARD_STYLES.image}
              style={{ backgroundImage: `url(${rooms[2].image})` }}
            />
          </div>
        </div>
      ) : (
        <div className={PACKAGE_CARD_STYLES.imageGrid4}>
          {rooms.slice(0, 4).map((room, i) => (
            <div key={`${room.id}-${i}`} className={PACKAGE_CARD_STYLES.imageCell}>
              <div
                className={PACKAGE_CARD_STYLES.image}
                style={{ backgroundImage: `url(${room.image})` }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Room count badge */}
      <div className={PACKAGE_CARD_STYLES.roomCountBadge}>
        <span>×{roomCount}</span>
      </div>
    </div>
  );
}
