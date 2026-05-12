/**
 * @file PackageCard.tsx — Room package card with expand/collapse (US-DM-04).
 *
 * A package card shows the primary room's info with a clear package indicator.
 * It can be expanded to reveal all component room cards inside.
 * When expanded, component rooms render as regular RoomCards.
 */

"use client";

import { useState } from "react";
import type { PackageCardProps } from "../domain/types";
import { PACKAGE_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { RoomCard } from "./RoomCard";
import { groupSecondaryRooms } from "../domain/grouping";

export function PackageCard({ pkg, index, selectedDest }: PackageCardProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const allRooms = [pkg.primaryRoom, ...pkg.secondaryRooms];
  const grouped = groupSecondaryRooms(pkg.secondaryRooms);
  const roomCount = allRooms.length;

  return (
    <div className={S.wrapper}>
      {/* Package header banner */}
      <div className={S.packageBanner}>
        <span className={S.packageBannerIcon}>⨁</span>
        <span className={S.packageBannerText}>
          {pkg.isHomogeneous
            ? `${roomCount}× ${pkg.primaryRoom.type}`
            : t.ROOMS.PACKAGE_MIXED_LABEL.replace("{count}", String(roomCount))}
        </span>
        <span className={S.packageBannerCapacity}>
          {pkg.totalCapacity} {t.ROOMS.CAPACITY_LABEL.toLowerCase()}
        </span>
      </div>

      {/* Primary room card */}
      <RoomCard
        room={pkg.primaryRoom}
        index={index}
        selectedDest={selectedDest}
      />

      {/* Expand/collapse button */}
      <button
        type="button"
        className={S.expandBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>
          {isExpanded
            ? t.ROOMS.PACKAGE_COLLAPSE
            : t.ROOMS.PACKAGE_EXPAND.replace("{count}", String(roomCount))}
        </span>
        <span className={S.expandIcon(isExpanded)}>▼</span>
      </button>

      {/* Expanded component rooms */}
      <div
        className={S.expansionGrid(isExpanded)}
        aria-hidden={!isExpanded}
      >
        <div className={S.expansionInner}>
          <div className={S.expansionContent}>
            <p className={S.expansionTitle}>{t.ROOMS.PACKAGE_ROOMS_TITLE}</p>
            <div className={S.expansionGridInner}>
              {allRooms.map((room, i) => (
                <RoomCard
                  key={`${pkg.id}-${room.id}-${i}`}
                  room={room}
                  index={i}
                  selectedDest={selectedDest}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
