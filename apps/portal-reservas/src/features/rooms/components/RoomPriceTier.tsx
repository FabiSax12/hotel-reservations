/**
 * @file RoomPriceTier.tsx — Price block and primary call-to-action.
 *
 * Updated in US-DM-02:
 *  - Price is only shown when `hasDates` is true (prices depend on date range).
 *  - When no dates: shows a "— / noche" placeholder to maintain layout.
 *  - CTA is now delegated to RoomCardCTA which handles the three states.
 */

import { ROOM_CARD_STYLES as S } from "../../../theme/rooms.theme";
import { useRoomsContext } from "../context/RoomsContext";
import { useI18n } from "@/locales";
import { RoomCardCTA } from "./sub-components/RoomCardCTA";
import type { Room } from "../domain/types";

interface RoomPriceTierProps {
  room: Room;
}

export function RoomPriceTier({ room }: RoomPriceTierProps) {
  const { t } = useI18n();
  const { hasDates } = useRoomsContext();

  return (
    <div className={`${S.priceTier} relative`}>
      {/* Price block — only shown when dates are selected */}
      {hasDates && (
        <div className={S.priceBlock}>
          <div className={S.priceLabel}>{t.ROOMS.PRICE_LABEL}</div>
          <div className={S.priceRow}>
            <span className={S.priceAmount}>${room.price}</span>
            <span className={S.priceCurrency}>{t.ROOMS.CURRENCY}</span>
          </div>
          {room.inventory > 2 && (
            <div className={S.availRow}>
              <span className={S.availDot} />
              {room.inventory} {t.ROOMS.AVAILABLE_DATES}
            </div>
          )}
        </div>
      )}

      {/* Conditional CTA — delegates to RoomCardCTA */}
      <RoomCardCTA room={room} />
    </div>
  );
}
