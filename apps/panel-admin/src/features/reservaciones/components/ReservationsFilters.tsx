"use client";

import { Button, ListBox, Select } from "@heroui/react";
import { useI18n } from "@/locales";
import type { ReservationStatus } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { DEFAULT_FILTERS } from "../domain/reservation-filters";
import { STATUS_I18N_KEY } from "../constants/status-i18n";
import { ROOM_LIST } from "../constants/room-list";
import { FILTER_BAR_STYLES as S } from "@/themes/reservations-filters.theme";
import { DateRangePicker } from "./DateRangePicker";

const STATUSES: readonly ReservationStatus[] = [
  "pending",
  "approved",
  "cancelled",
  "completed",
] as const;

const STATUS_DOT_COLOR: Record<ReservationStatus, string> = Object.freeze({
  pending: "bg-amber-400",
  approved: "bg-green-500",
  cancelled: "bg-red-500",
  completed: "bg-blue-500",
} as const);

const ROOM_ALL_KEY = "__ALL__";

interface ReservationsFiltersProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: ReservationFilters) => void;
  totalCount: number;
  filteredCount: number;
  statusCounts: Record<ReservationStatus, number>;
}


export const ReservationsFilters = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  statusCounts,
}: ReservationsFiltersProps) => {
  const { t } = useI18n();

  const update = (partial: Partial<ReservationFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const toggleStatus = (status: ReservationStatus) => {
    const current = filters.statuses;
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    update({ statuses: next });
  };

  const isFiltered =
    filters.statuses.length > 0 ||
    filters.roomName !== "" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

  const selectedRoomKey = filters.roomName === "" ? ROOM_ALL_KEY : filters.roomName;

  const handleRoomChange = (key: string | number | null) => {
    if (key === null) return;
    update({ roomName: key === ROOM_ALL_KEY ? "" : String(key) });
  };

  return (
    <div className={S.wrapper}>
      <div className={S.bar}>
        {/* Status pills — left side */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={filters.statuses.length === 0}
            className={`${S.pill} ${filters.statuses.length === 0 ? S.pillActive : S.pillInactive}`}
            onClick={() => update({ statuses: [] })}
          >
            {t.RESERVATIONS.FILTERS.ALL}
            <span className={S.pillCount}>{totalCount}</span>
          </button>

          {STATUSES.map((status) => {
            const isOn = filters.statuses.includes(status);
            return (
              <button
                key={status}
                type="button"
                aria-pressed={isOn}
                className={`${S.pill} ${isOn ? S.pillActive : S.pillInactive}`}
                onClick={() => toggleStatus(status)}
              >
                <span className={`${S.pillStatusDot} ${STATUS_DOT_COLOR[status]}`} />
                {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
                <span className={S.pillCount}>{statusCounts[status]}</span>
              </button>
            );
          })}
        </div>

        <div className={S.spacer} />

        {/* Right filters */}
        <div className={S.rightSection}>
          <Select
            value={selectedRoomKey}
            onChange={handleRoomChange}
          >
            <Select.Trigger className={`${S.pill} ${S.pillInactive} min-w-48 justify-between gap-2`}>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id={ROOM_ALL_KEY}>
                  {t.RESERVATIONS.FILTERS.PLACEHOLDER_ROOM}
                </ListBox.Item>
                {ROOM_LIST.map((room) => (
                  <ListBox.Item id={room} key={room}>
                    {room}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <DateRangePicker
            checkIn={filters.dateFrom}
            checkOut={filters.dateTo}
            labelFrom={t.RESERVATIONS.FILTERS.LABEL_DATE_FROM}
            labelTo={t.RESERVATIONS.FILTERS.LABEL_DATE_TO}
            placeholder={t.RESERVATIONS.FILTERS.DATE_PLACEHOLDER}
            onChange={(checkIn, checkOut) => update({ dateFrom: checkIn, dateTo: checkOut })}
          />

          <Button
            variant="ghost"
            size="sm"
            className={`${S.pill} ${S.pillInactive}`}
            isDisabled={!isFiltered}
            onPress={() => onFiltersChange({ ...DEFAULT_FILTERS })}
          >
            {t.RESERVATIONS.FILTERS.CLEAR}
          </Button>
        </div>
      </div>

      {isFiltered && (
        <p className={S.resultsText}>
          <span className={S.resultsCount}>{filteredCount}</span>
          {` ${t.RESERVATIONS.FILTERS.RESULTS_OF} ${totalCount} ${t.RESERVATIONS.FILTERS.RESULTS_SUFFIX}`}
        </p>
      )}
    </div>
  );
};
