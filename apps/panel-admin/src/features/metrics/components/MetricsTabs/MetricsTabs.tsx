"use client";

import { Tabs } from "@heroui/react";
import { ReservationsByStatusTab } from "../tabs/ReservationsByStatusTab/ReservationsByStatusTab";
import { RoomOccupancyTab } from "../tabs/RoomOccupancyTab/RoomOccupancyTab";
import { RankingTab } from "../tabs/RankingTab/RankingTab";
import { METRICS_TABS_STYLES as STYLES, METRICS_TAB_KEYS as KEYS } from "./MetricsTabs.styles";
import type { MetricsTabsProps } from "./MetricsTabs.interface";

export function MetricsTabs({ metrics, periodLabel, texts }: MetricsTabsProps) {
  return (
    <Tabs className={STYLES.wrapper} variant="secondary" defaultSelectedKey={KEYS.RESERVATIONS_BY_STATUS}>
      <Tabs.ListContainer>
        <Tabs.List aria-label={texts.TABS.LIST_ARIA_LABEL} className={STYLES.list}>
          <Tabs.Tab id={KEYS.RESERVATIONS_BY_STATUS} className={STYLES.tab}>
            {texts.TABS.RESERVATIONS_BY_STATUS}
            <Tabs.Indicator className={STYLES.indicator} />
          </Tabs.Tab>
          <Tabs.Tab id={KEYS.ROOM_OCCUPANCY} className={STYLES.tab}>
            {texts.TABS.ROOM_OCCUPANCY}
            <Tabs.Indicator className={STYLES.indicator} />
          </Tabs.Tab>
          <Tabs.Tab id={KEYS.RANKING} className={STYLES.tab}>
            {texts.TABS.RANKING}
            <Tabs.Indicator className={STYLES.indicator} />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>

      <Tabs.Panel id={KEYS.RESERVATIONS_BY_STATUS} className={STYLES.panel}>
        <p className={STYLES.panelTitle}>{texts.STATUS_TAB.TITLE}</p>
        <ReservationsByStatusTab
          statusCounts={metrics.statusCounts}
          totalReservations={metrics.totalReservations}
          weeklyData={metrics.weeklyData}
          periodLabel={periodLabel}
          statusLabels={texts.STATUS_LABELS}
          totalLabel={texts.STATUS_TAB.TOTAL_LABEL}
          periodPrefix={texts.STATUS_TAB.PERIOD_PREFIX}
          weeklyTitle={texts.STATUS_TAB.WEEKLY_TITLE}
          weeklyEmptyText={texts.STATUS_TAB.WEEKLY_EMPTY}
          chartAriaLabel={texts.STATUS_TAB.CHART_ARIA_LABEL}
          barAriaLabel={texts.STATUS_TAB.BAR_ARIA_LABEL}
        />
      </Tabs.Panel>

      <Tabs.Panel id={KEYS.ROOM_OCCUPANCY} className={STYLES.panel}>
        <p className={STYLES.panelTitle}>{texts.OCCUPANCY_TAB.TITLE}</p>
        <RoomOccupancyTab
          roomOccupancies={metrics.roomOccupancies}
          title={texts.OCCUPANCY_TAB.TITLE}
          subtitle={texts.OCCUPANCY_TAB.SUBTITLE}
          emptyText={texts.OCCUPANCY_TAB.EMPTY}
        />
      </Tabs.Panel>

      <Tabs.Panel id={KEYS.RANKING} className={STYLES.panel}>
        <p className={STYLES.panelTitle}>{texts.RANKING_TAB.TITLE}</p>
        <RankingTab
          ranking={metrics.ranking}
          subtitle={texts.RANKING_TAB.SUBTITLE}
          reservationsSuffix={texts.RANKING_TAB.RESERVATIONS_SUFFIX}
          meterAriaLabelSuffix={texts.RANKING_TAB.METER_ARIA_LABEL_SUFFIX}
          emptyText={texts.RANKING_TAB.EMPTY}
        />
      </Tabs.Panel>
    </Tabs>
  );
}
