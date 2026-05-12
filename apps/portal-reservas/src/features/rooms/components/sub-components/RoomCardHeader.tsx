/**
 * @file RoomCardHeader.tsx — Room name, capacity chip, and inventory chip.
 *
 * US-DM-02 fixes:
 *  - Inventory chip only shows count without "for your dates" text when no
 *    dates are selected (hasDates = false from RoomsContext).
 *  - When hasDates = true, shows inventory relative to selected dates.
 */

import type { RoomCardHeaderProps } from "../../domain/types";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { useRoomsContext } from "../../context/RoomsContext";
import { SEARCH_VALS } from "../../../search/components/search-bar/constants/search.constants";
import { ROOM_THRESHOLDS } from "../../constants/rooms.constants";

export function RoomCardHeader({ room, selectedDest }: RoomCardHeaderProps) {
  const { t } = useI18n();
  const { hasDates } = useRoomsContext();
  const isScarce = room.inventory <= ROOM_THRESHOLDS.SCARCE;

  /** Inventory label — only mentions dates when dates are actually selected. */
  const inventoryLabel = (() => {
    if (isScarce && room.inventory === 1) return t.ROOMS.LAST_ROOM;
    if (isScarce) return `${t.ROOMS.ONLY_REMAINING} ${room.inventory} ${t.ROOMS.ROOMS_PLURAL}`;
    // No dates: plain count without "for your dates"
    if (!hasDates) return `${room.inventory} ${t.ROOMS.ROOMS_PLURAL}`;
    // Dates selected: full "available for your dates" label
    return `${room.inventory} ${t.ROOMS.AVAILABLE_DATES}`;
  })();

  return (
    <div>
      {(!selectedDest || selectedDest === SEARCH_VALS.DESTINATION_ALL) && (
        <p className={S.locationLabel}>{room.location}</p>
      )}
      <h3 className={S.title}>{room.title}</h3>

      <div className={S.chipRow}>
        {/* Capacity chip */}
        <span className={S.capacityChip}>
          <svg className={S.chipIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {room.capacity} {t.ROOMS.CAPACITY_LABEL}
        </span>

        {/* Inventory chip */}
        <span className={S.inventoryChip(isScarce)}>
          <svg className={S.chipIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {inventoryLabel}
        </span>
      </div>
    </div>
  );
}
