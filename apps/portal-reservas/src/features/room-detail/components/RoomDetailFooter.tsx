/**
 * @file RoomDetailFooter.tsx — Pinned price + reserve CTA for the detail panel.
 *
 * Price follows the same rule as the cards: hidden until dates are selected.
 * For packages the label switches to the total-per-night and the CTA reserves
 * the package (availability driven by the primary room).
 */

"use client";

import { useRoomsContext } from "@/features/rooms";
import { useI18n } from "@/locales";
import type { RoomDetailFooterProps } from "../domain/types";
import { ROOM_DETAIL_STYLES } from "../theme/room-detail.theme";
import { RoomDetailCta } from "./RoomDetailCta";

export function RoomDetailFooter({ room, price, isPackage }: RoomDetailFooterProps) {
  const { t } = useI18n();
  const { hasDates } = useRoomsContext();

  return (
    <footer className={ROOM_DETAIL_STYLES.footer}>
      <div className={ROOM_DETAIL_STYLES.priceBlock}>
        <span className={ROOM_DETAIL_STYLES.priceLabel}>{isPackage ? t.ROOMS.PACKAGE_TOTAL_LABEL : t.ROOMS.PRICE_LABEL}</span>
        {hasDates ? (
          <span className={ROOM_DETAIL_STYLES.priceRow}>
            <span className={ROOM_DETAIL_STYLES.priceAmount}>${price}</span>
            <span className={ROOM_DETAIL_STYLES.priceCurrency}>{t.ROOMS.CURRENCY}</span>
          </span>
        ) : (
          <span className={ROOM_DETAIL_STYLES.pricePlaceholder}>{t.ROOM_DETAIL.PRICE_PLACEHOLDER}</span>
        )}
      </div>

      <RoomDetailCta room={room} isPackage={isPackage} />
    </footer>
  );
}
