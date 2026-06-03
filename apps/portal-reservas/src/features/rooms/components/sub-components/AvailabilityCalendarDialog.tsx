/**
 * @file AvailabilityCalendarDialog.tsx — Read-only calendar showing free days for a room.
 *
 * Opens as an inline collapsible panel below the "Ver fechas libres" button.
 * Displays the room's pre-computed `availableDates` as a simple highlighted list
 * grouped by month, since @hotel/ui Calendar's read-only mode will be wired up
 * when the full calendar API is finalized.
 *
 * This is a mock-friendly implementation: the full @hotel/ui Calendar integration
 * will replace the date list in the backend integration phase.
 */

"use client";

import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import type { AvailabilityCalendarDialogProps } from "../../domain/types";

const MAX_AVAILABLE_DATES_PREVIEW = 12;
const SVG_VIEW_BOX = "0 0 24 24";
const CLOSE_ICON_PATH = "M6 18L18 6M6 6l12 12";

/** Formats an ISO date string into a readable short date (e.g. "15 oct"). */
function formatDate(iso: string, locale: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(locale, { day: "numeric", month: "short" });
}

/** Groups dates by "Month Year" label. */
function groupByMonth(dates: string[], locale: string): Record<string, string[]> {
  return dates.reduce<Record<string, string[]>>((acc, iso) => {
    const d = new Date(iso + "T00:00:00");
    const key = d.toLocaleDateString(locale, { month: "long", year: "numeric" });
    (acc[key] ??= []).push(iso);
    return acc;
  }, {});
}

export function AvailabilityCalendarDialog({
  isOpen,
  availableDates,
  onClose,
}: AvailabilityCalendarDialogProps) {
  const { t, locale } = useI18n();
  const groups = groupByMonth(availableDates.slice(0, MAX_AVAILABLE_DATES_PREVIEW), locale);

  return (
    <div
      className={`${ROOM_CARD_STYLES.dialogGrid} ${isOpen ? ROOM_CARD_STYLES.dialogGridOpen : ROOM_CARD_STYLES.dialogGridClosed}`}
      aria-hidden={!isOpen}
    >
      <div className={ROOM_CARD_STYLES.dialogInner}>
        <div className={ROOM_CARD_STYLES.dialogContent}>
          <div className={ROOM_CARD_STYLES.dialogHeader}>
            <p className={ROOM_CARD_STYLES.dialogTitle}>{t.ROOMS.AVAIL_CALENDAR_TITLE}</p>
            <button
              type="button"
              onClick={onClose}
              className={ROOM_CARD_STYLES.dialogCloseBtn}
              aria-label={t.ROOMS.AVAIL_DIALOG_CLOSE}
            >
              <svg className={ROOM_CARD_STYLES.dialogCloseBtnIcon} fill="none" viewBox={SVG_VIEW_BOX} stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={CLOSE_ICON_PATH} />
              </svg>
            </button>
          </div>

          {availableDates.length === 0 ? (
            <p className={ROOM_CARD_STYLES.dialogEmptyMsg}>
              {t.ROOMS.AVAIL_DIALOG_EMPTY}
            </p>
          ) : (
            <div className={ROOM_CARD_STYLES.dialogMonthList}>
              {Object.entries(groups).map(([month, dates]) => (
                <div key={month}>
                  <p className={ROOM_CARD_STYLES.dialogMonthLabel}>{month}</p>
                  <div className={ROOM_CARD_STYLES.dialogDatesWrapper}>
                    {dates.map((iso) => (
                      <span key={iso} className={ROOM_CARD_STYLES.dialogDateBadge}>
                        {formatDate(iso, locale)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={ROOM_CARD_STYLES.dialogActions}>
            <button type="button" className={ROOM_CARD_STYLES.dialogCancelBtn} onClick={onClose}>
              {t.ROOMS.AVAIL_DIALOG_CLOSE}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
