/**
 * @file RoomDetailFooter.tsx — Pinned price + reserve CTA for the detail panel.
 *
 * Price follows the same rule as the cards: hidden until dates are selected.
 * For packages the label switches to the total-per-night and the CTA reserves
 * the package (availability driven by the primary room).
 */

"use client";

import { ROOM_DETAIL_STYLES as S } from "@/theme/room-detail.theme";
import { useI18n } from "@/locales";
import { useRoomsContext } from "../../../context/RoomsContext";
import type { RoomDetailFooterProps } from "../../../domain/types";
import { RoomDetailCta } from "./RoomDetailCta";

export function RoomDetailFooter({ room, price, isPackage }: RoomDetailFooterProps) {
  const { t } = useI18n();
  const { hasDates } = useRoomsContext();

  return (
    <footer className={S.footer}>
      <div className={S.priceBlock}>
        <span className={S.priceLabel}>{isPackage ? t.ROOMS.PACKAGE_TOTAL_LABEL : t.ROOMS.PRICE_LABEL}</span>
        {hasDates ? (
          <span className={S.priceRow}>
            <span className={S.priceAmount}>${price}</span>
            <span className={S.priceCurrency}>{t.ROOMS.CURRENCY}</span>
          </span>
        ) : (
          <span className={S.pricePlaceholder}>{t.ROOMS.DETAIL_PRICE_PLACEHOLDER}</span>
        )}
      </div>

      <RoomDetailCta room={room} isPackage={isPackage} />
    </footer>
  );
}
