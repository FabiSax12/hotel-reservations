/**
 * @file PackageCardSummary.tsx — Package body matching RoomCard structure (US-DM-04).
 *
 * Mirrors RoomCard's body layout:
 * - Header: package label + capacity chips
 * - Meta: room summary list (like admin tip area)
 * - Price tier: total price + CTA inline
 */

"use client";

import type { PackageCardSummaryProps, Room } from "../../domain/types";
import { PACKAGE_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { groupRoomsByType } from "../../domain/grouping";

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

  return (
    <div className={S.body}>
      {/* Header row: package label + capacity chips */}
      <div className={S.bodyHeader}>
        <div>
          <div className={S.packageLabel}>
            {t.ROOMS.PACKAGE_LABEL.replace("{count}", String(rooms.length))}
          </div>
        </div>
        <div className={S.chipRow}>
          <span className={S.capacityChip}>
            <svg className={S.chipIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {totalCapacity}
          </span>
        </div>
      </div>

      {/* Room summary list (replaces admin tip area) */}
      <div className={S.summaryList}>
        {grouped.map(({ type, room, count }) => (
          <div key={type} className={S.summaryItem}>
            <span className={S.summaryRoomName}>
              {count > 1 ? `${count}× ` : ""}{room.title}
            </span>
            <span className={S.summaryRoomPrice}>
              ${room.price * count} {t.ROOMS.CURRENCY}
            </span>
          </div>
        ))}
      </div>

      {/* Price tier + CTA (same structure as RoomCard) */}
      <div className={S.priceTier}>
        <div className={S.priceBlock}>
          <div className={S.priceLabel}>{t.ROOMS.PACKAGE_TOTAL_LABEL}</div>
          <div className={S.priceRow}>
            <span className={S.priceAmount}>${totalPricePerNight}</span>
            <span className={S.priceCurrency}>{t.ROOMS.CURRENCY}</span>
          </div>
        </div>

        {/* CTA slot — rendered by parent PackageCard */}
        {children}
      </div>
    </div>
  );
}
