/**
 * @file RoomPriceTier.tsx — Price block and primary call-to-action.
 *
 * Displays at the bottom of each room card:
 *  - "Precio Promedio Por Noche" label
 *  - Large bold price in USD
 *  - Availability count (only shown for non-scarce rooms; scarce rooms
 *    use the urgency badge in {@link RoomImagePanel} instead).
 *  - "Seleccionar y Continuar" CTA button.
 */

import { UI_CONSTANTS } from '../../../shared/constants/ui';
import { ROOM_CARD_STYLES as S } from '../../../theme/rooms.theme';

interface RoomPriceTierProps {
  /** Average nightly price in USD. */
  price: number;
  /** Number of rooms available for the user's dates. */
  inventory: number;
  /** True if inventory ≤ 2 (availability count is hidden; badge shows instead). */
  isScarce: boolean;
}

export function RoomPriceTier({ price, inventory, isScarce }: RoomPriceTierProps) {
  return (
    <div className={S.priceTier}>

      <div className={S.priceBlock}>
        <div className={S.priceLabel}>{UI_CONSTANTS.ROOMS.PRICE_LABEL}</div>
        <div className={S.priceRow}>
          <span className={S.priceAmount}>${price}</span>
          <span className={S.priceCurrency}>{UI_CONSTANTS.ROOMS.CURRENCY}</span>
        </div>
        {/* Subdued availability count — hidden when scarcity badge is active */}
        {!isScarce && (
          <div className={S.availRow}>
            <span className={S.availDot}></span>
            {inventory} {UI_CONSTANTS.ROOMS.AVAILABLE_DATES}
          </div>
        )}
      </div>

      {/* Primary CTA */}
      <button className={S.selectBtn}>
        {UI_CONSTANTS.ROOMS.SELECT_ACTION}
        <svg className={S.selectBtnIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}
