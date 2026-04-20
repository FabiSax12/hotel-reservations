"use client";

import { Button, ListBox, Select } from "@heroui/react";
import { useI18n } from "@/locales";
import type { ReservationStatus } from "../domain/reservation";
import type { ReservationFilters } from "../domain/reservation-filters";
import { DEFAULT_FILTERS } from "../domain/reservation-filters";
import { STATUS_I18N_KEY } from "../constants/status-i18n";
import { ROOM_LIST } from "../constants/room-list";
import { FILTERS as S } from "../constants/styles";
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
    <div className={S.WRAPPER}>
      <div className={S.BAR}>
        {/* Status pills — left side */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            aria-pressed={filters.statuses.length === 0}
            className={`${S.PILL} ${filters.statuses.length === 0 ? S.PILL_ON : S.PILL_OFF}`}
            onClick={() => update({ statuses: [] })}
          >
            {t.RESERVATIONS.FILTERS.ALL}
            <span className={S.PILL_COUNT}>{totalCount}</span>
          </button>

          {STATUSES.map((status) => {
            const isOn = filters.statuses.includes(status);
            return (
              <button
                key={status}
                type="button"
                aria-pressed={isOn}
                className={`${S.PILL} ${isOn ? S.PILL_ON : S.PILL_OFF}`}
                onClick={() => toggleStatus(status)}
              >
                <span className={`${S.PILL_DOT} ${STATUS_DOT_COLOR[status]}`} />
                {t.RESERVATIONS.STATUS[STATUS_I18N_KEY[status]]}
                <span className={S.PILL_COUNT}>{statusCounts[status]}</span>
              </button>
            );
          })}
        </div>

        <div className={S.SPACER} />

        {/* Right filters */}
        <div className={S.RIGHT}>
          <Select value={selectedRoomKey} onChange={handleRoomChange}>
            <Select.Trigger>
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
            isDisabled={!isFiltered}
            onPress={() => onFiltersChange({ ...DEFAULT_FILTERS })}
          >
            {t.RESERVATIONS.FILTERS.CLEAR}
          </Button>
        </div>
      </div>

      {isFiltered && (
        <p className={S.RESULTS}>
          <span className={S.RESULTS_COUNT}>{filteredCount}</span>
          {` ${t.RESERVATIONS.FILTERS.RESULTS_OF} ${totalCount} ${t.RESERVATIONS.FILTERS.RESULTS_SUFFIX}`}
        </p>
      )}
    </div>
  );
};
