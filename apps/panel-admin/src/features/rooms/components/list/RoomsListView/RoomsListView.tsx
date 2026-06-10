"use client";

import { use } from "react";
import { RoomsFilterProvider } from "@/features/rooms/context/roomsFilter/RoomsFilterProvider";
import { countRoomsByStatus } from "@/features/rooms/domain/countRoomsByStatus";
import { useI18n } from "@/locales";
import { PageHeader } from "@/shared/components/PageHeader";
import { RoomsContent } from "../RoomsContent/RoomsContent";
import type { RoomsListViewProps } from "./RoomsListView.interface";
import { ROOMS_LIST_VIEW_STYLES as STYLES } from "./RoomsListView.styles";

export const RoomsListView = ({ rooms }: RoomsListViewProps) => {
  const { t } = useI18n();
  const resolvedRooms = use(rooms);
  const statusCounts = countRoomsByStatus(resolvedRooms);

  return (
    <main className={STYLES.wrapper}>
      <PageHeader.Root>
        <PageHeader.Heading>
          <PageHeader.Title>
            {t.ROOMS.LIST.PAGE_TITLE}{" "}
            <PageHeader.TitleHighlight>{t.ROOMS.LIST.PAGE_TITLE_ACCENT}</PageHeader.TitleHighlight>
          </PageHeader.Title>
          <PageHeader.Description>{t.ROOMS.LIST.PAGE_DESCRIPTION}</PageHeader.Description>
        </PageHeader.Heading>
        <PageHeader.Stats>
          <PageHeader.StatCard
            label={t.ROOMS.LIST.STATS.AVAILABLE_LABEL}
            value={statusCounts.available}
            note={t.ROOMS.LIST.STATS.AVAILABLE_NOTE}
          />
          <PageHeader.StatCard
            label={t.ROOMS.LIST.STATS.UNAVAILABLE_LABEL}
            value={statusCounts.unavailable}
            note={t.ROOMS.LIST.STATS.UNAVAILABLE_NOTE}
          />
          <PageHeader.StatCard
            label={t.ROOMS.LIST.STATS.TOTAL_LABEL}
            value={resolvedRooms.length}
            note={t.ROOMS.LIST.STATS.TOTAL_NOTE}
          />
        </PageHeader.Stats>
      </PageHeader.Root>

      <RoomsFilterProvider rooms={resolvedRooms}>
        <RoomsContent />
      </RoomsFilterProvider>
    </main>
  );
};
