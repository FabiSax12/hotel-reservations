/**
 * @file PackageCardSummary.tsx — Package body with Booking.com-style room tree.
 *
 * Mirrors RoomCard's body layout:
 * - Header: package label + capacity chips
 * - Room tree: vertical list of rooms with bed config (max 4, then "+N more")
 * - Price tier: total price + CTA inline
 */

"use client";

import type { PackageCardSummaryProps } from "../../domain/types";
import { PACKAGE_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { groupRoomsByType } from "../../domain/grouping";
import { RoomTreeItem } from "./RoomTreeItem";

const MAX_VISIBLE_ROOMS = 4;
const AMENITY_VISIBILITY_ROOM_COUNT_THRESHOLD = 3;
const SVG_VIEW_BOX = "0 0 24 24";
const USERS_GROUP_ICON_PATH =
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z";

interface ExtendedSummaryProps extends PackageCardSummaryProps {
  children?: React.ReactNode;
}

export function PackageCardSummary({
  rooms,
  totalCapacity,
  totalPricePerNight,
  children,
}: ExtendedSummaryProps) {
  const { t } = useI18n();
  const grouped = groupRoomsByType(rooms);

  // Limit visible rooms and calculate overflow
  const visibleRooms = grouped.slice(0, MAX_VISIBLE_ROOMS);
  const overflowCount = grouped.length > MAX_VISIBLE_ROOMS
    ? grouped.slice(MAX_VISIBLE_ROOMS).reduce((sum, g) => sum + g.count, 0)
    : 0;

  return (
    <div className={PACKAGE_CARD_STYLES.body}>
      {/* Header row: package label + capacity chips */}
      <div className={PACKAGE_CARD_STYLES.bodyHeader}>
        <div>
          <div className={PACKAGE_CARD_STYLES.packageLabel}>
            {t.ROOMS.PACKAGE_LABEL.replace("{count}", String(rooms.length))}
          </div>
        </div>
        <div className={PACKAGE_CARD_STYLES.chipRow}>
          <span className={PACKAGE_CARD_STYLES.capacityChip}>
            <svg className={PACKAGE_CARD_STYLES.chipIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={USERS_GROUP_ICON_PATH} />
            </svg>
            {totalCapacity}
          </span>
        </div>
      </div>

      {/* Room tree: vertical list with bed counts */}
      <div className={PACKAGE_CARD_STYLES.roomTree}>
        {visibleRooms.map(({ type, room, count }) => (
          <RoomTreeItem
            key={type}
            room={room}
            count={count}
            currency={t.ROOMS.CURRENCY}
            showAmenities={rooms.length < AMENITY_VISIBILITY_ROOM_COUNT_THRESHOLD}
          />
        ))}
        {overflowCount > 0 && (
          <div className={PACKAGE_CARD_STYLES.roomTreeOverflow}>
            +{overflowCount} {t.ROOMS.MORE_ROOMS}
          </div>
        )}
      </div>

      {/* Price tier + CTA */}
      <div className={PACKAGE_CARD_STYLES.priceTier}>
        <div className={PACKAGE_CARD_STYLES.priceBlock}>
          <div className={PACKAGE_CARD_STYLES.priceLabel}>{t.ROOMS.PACKAGE_TOTAL_LABEL}</div>
          <div className={PACKAGE_CARD_STYLES.priceRow}>
            <span className={PACKAGE_CARD_STYLES.priceAmount}>${totalPricePerNight}</span>
            <span className={PACKAGE_CARD_STYLES.priceCurrency}>{t.ROOMS.CURRENCY}</span>
          </div>
        </div>

        {/* CTA slot — rendered by parent PackageCard */}
        {children}
      </div>
    </div>
  );
}
