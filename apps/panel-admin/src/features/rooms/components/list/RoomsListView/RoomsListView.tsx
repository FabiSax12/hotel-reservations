"use client";

import { use, useMemo } from "react";
import { RoomsFilterProvider } from "@/features/rooms/context/roomsFilter/RoomsFilterProvider";
import { RoomsContent } from "../RoomsContent/RoomsContent";
import { RoomsPageHeader } from "../RoomsPageHeader/RoomsPageHeader";
import type { RoomsListViewProps } from "./RoomsListView.interface";
import { ROOMS_LIST_VIEW_STYLES as STYLES } from "./RoomsListView.styles";

export const RoomsListView = ({ rooms }: RoomsListViewProps) => {
  const resolvedRooms = use(rooms);

  const statusCounts = useMemo(() => {
    let available = 0;
    let unavailable = 0;

    // Heavy operation O(n)
    for (const room of resolvedRooms) {
      if (room.is_active) available++;
      else unavailable++;
    }
    return { available, unavailable, total: resolvedRooms.length };
  }, [resolvedRooms]);

  return (
    <main className={STYLES.wrapper}>
      <RoomsPageHeader totalCount={resolvedRooms.length} statusCounts={statusCounts} />

      <RoomsFilterProvider rooms={resolvedRooms}>
        <RoomsContent />
      </RoomsFilterProvider>
    </main>
  );
};
