/**
 * @file PackageCardSummary.tsx — Room list and price breakdown for packages (US-DM-04).
 *
 * Displays:
 * - Package label: "PAQUETE DE 3 HABITACIONES"
 * - Total capacity: "6 huéspedes"
 * - Room summary list with per-room prices
 * - Total price with "Total por noche" label
 */

"use client";

import type { PackageCardSummaryProps } from "../../domain/types";
import { PACKAGE_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { groupRoomsByType } from "../../domain/grouping";

export function PackageCardSummary({
  rooms,
  totalCapacity,
  totalPricePerNight,
}: PackageCardSummaryProps) {
  const { t } = useI18n();
  const grouped = groupRoomsByType(rooms);

  return (
    <div className={S.body}>
      {/* Package label + capacity */}
      <div className={S.labelRow}>
        <span className={S.labelText}>
          {t.ROOMS.PACKAGE_LABEL.replace("{count}", String(rooms.length))}
        </span>
        <span className={S.labelCapacity}>
          {t.ROOMS.PACKAGE_CAPACITY.replace("{count}", String(totalCapacity))}
        </span>
      </div>

      <div className={S.divider} />

      {/* Room summary list */}
      <div className={S.summaryTitle}>{t.ROOMS.PACKAGE_INCLUDES}</div>
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

      {/* Total price */}
      <div className={S.priceSection}>
        <div className={S.priceTotalLabel}>{t.ROOMS.PACKAGE_TOTAL_LABEL}</div>
        <div className={S.priceTotalRow}>
          <span className={S.priceTotalAmount}>${totalPricePerNight}</span>
          <span className={S.priceTotalCurrency}>{t.ROOMS.CURRENCY}</span>
        </div>
      </div>
    </div>
  );
}
