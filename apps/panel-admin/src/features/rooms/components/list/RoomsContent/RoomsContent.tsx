"use client";

import { useRoomsContentHandlers } from "../../../hooks/useRoomsContentHandlers";
import { RoomsFilters } from "../RoomsFilters/RoomsFilters";
import { CARD_STYLES } from "../RoomsListView/RoomsListView.styles";
import { RoomsTable } from "../RoomsTable/RoomsTable";

export function RoomsContent() {
  const { filtersProps, filteredRooms } = useRoomsContentHandlers();

  return (
    <>
      <div className={CARD_STYLES.bodySmall}>
        <RoomsFilters {...filtersProps} />
      </div>

      <div className={CARD_STYLES.bodyWithOverflow}>
        <RoomsTable rooms={filteredRooms} />
      </div>
    </>
  );
}
