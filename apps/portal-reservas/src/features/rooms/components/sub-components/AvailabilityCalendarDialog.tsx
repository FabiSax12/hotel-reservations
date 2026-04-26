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

import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";

interface AvailabilityCalendarDialogProps {
  /** Whether the inline panel is currently open. */
  isOpen: boolean;
  /** ISO date strings (YYYY-MM-DD) representing available check-in days. */
  availableDates: string[];
  /** Callback to close the panel. */
  onClose: () => void;
}

/** Formats an ISO date string into a readable short date (e.g. "15 oct"). */
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CR", { day: "numeric", month: "short" });
}

/** Groups dates by "Month Year" label. */
function groupByMonth(dates: string[]): Record<string, string[]> {
  return dates.reduce<Record<string, string[]>>((acc, iso) => {
    const d = new Date(iso + "T00:00:00");
    const key = d.toLocaleDateString("es-CR", { month: "long", year: "numeric" });
    (acc[key] ??= []).push(iso);
    return acc;
  }, {});
}

export function AvailabilityCalendarDialog({
  isOpen,
  availableDates,
  onClose,
}: AvailabilityCalendarDialogProps) {
  const { t } = useI18n();
  const groups = groupByMonth(availableDates.slice(0, 12)); // Show first 12 slots

  return (
    <div
      className={`${S.dialogGrid} ${isOpen ? S.dialogGridOpen : S.dialogGridClosed}`}
      aria-hidden={!isOpen}
    >
      <div className={S.dialogInner}>
        <div className={S.dialogContent}>
          <div className="flex items-center justify-between mb-4">
            <p className={S.dialogTitle}>{t.ROOMS.AVAIL_CALENDAR_TITLE}</p>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-700 transition-colors"
              aria-label="Cerrar calendario"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {availableDates.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-4">
              No hay fechas disponibles por el momento.
            </p>
          ) : (
            <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
              {Object.entries(groups).map(([month, dates]) => (
                <div key={month}>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 capitalize">
                    {month}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dates.map((iso) => (
                      <span
                        key={iso}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-100 capitalize"
                      >
                        {formatDate(iso)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={S.dialogActions}>
            <button type="button" className={S.dialogCancelBtn} onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
