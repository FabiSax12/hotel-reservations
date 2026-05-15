"use client";

import { Tabs } from "@heroui/react";
import { ReservationsByStatusTab } from "../tabs/ReservationsByStatusTab/ReservationsByStatusTab";
import { RoomOccupancyTab } from "../tabs/RoomOccupancyTab/RoomOccupancyTab";
import { RankingTab } from "../tabs/RankingTab/RankingTab";
import { METRICS_TABS_STYLES as S, METRICS_TAB_KEYS as KEYS } from "./MetricsTabs.styles";
import type { MetricsTabsProps } from "./MetricsTabs.interface";

export function MetricsTabs({ metrics, periodLabel, texts }: MetricsTabsProps) {
  return (
    <Tabs className={S.wrapper} variant="secondary" defaultSelectedKey={KEYS.RESERVATIONS_BY_STATUS}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Secciones del dashboard" className={S.list}>
          <Tabs.Tab id={KEYS.RESERVATIONS_BY_STATUS} className={S.tab}>
            {texts.TABS.RESERVATIONS_BY_STATUS}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id={KEYS.ROOM_OCCUPANCY} className={S.tab}>
            {texts.TABS.ROOM_OCCUPANCY}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id={KEYS.RANKING} className={S.tab}>
            {texts.TABS.RANKING}
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>

      <Tabs.Panel id={KEYS.RESERVATIONS_BY_STATUS} className={S.panel}>
        <p className={S.panelTitle}>{texts.STATUS_TAB.TITLE}</p>
        <ReservationsByStatusTab
          statusCounts={metrics.statusCounts}
          totalReservations={metrics.totalReservations}
          weeklyData={metrics.weeklyData}
          periodLabel={periodLabel}
          statusLabels={texts.STATUS_LABELS}
          totalLabel={texts.STATUS_TAB.TOTAL_LABEL}
          periodPrefix={texts.STATUS_TAB.PERIOD_PREFIX}
          weeklyTitle={texts.STATUS_TAB.WEEKLY_TITLE}
          weeklySubtitle={texts.STATUS_TAB.WEEKLY_SUBTITLE}
        />
      </Tabs.Panel>

      <Tabs.Panel id={KEYS.ROOM_OCCUPANCY} className={S.panel}>
        <p className={S.panelTitle}>{texts.OCCUPANCY_TAB.TITLE}</p>
        <RoomOccupancyTab
          roomOccupancies={metrics.roomOccupancies}
          title={texts.OCCUPANCY_TAB.TITLE}
          subtitle={texts.OCCUPANCY_TAB.SUBTITLE}
          emptyText={texts.OCCUPANCY_TAB.EMPTY}
        />
      </Tabs.Panel>

      <Tabs.Panel id={KEYS.RANKING} className={S.panel}>
        <p className={S.panelTitle}>{texts.RANKING_TAB.TITLE}</p>
        <RankingTab
          ranking={metrics.ranking}
          subtitle={texts.RANKING_TAB.SUBTITLE}
          reservationsSuffix={texts.RANKING_TAB.RESERVATIONS_SUFFIX}
          emptyText={texts.RANKING_TAB.EMPTY}
        />
      </Tabs.Panel>
    </Tabs>
  );
}
