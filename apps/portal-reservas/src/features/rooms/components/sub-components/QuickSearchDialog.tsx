/**
 * @file QuickSearchDialog.tsx — Inline date + guest picker that opens inside a room card.
 *
 * Renders as a collapsible panel (NOT a modal) using grid-template-rows animation.
 * Collects check-in date, check-out date, and guest counts, then fires `onSearch`
 * on the page orchestrator to transition to State B (full search results with prices).
 *
 * Uses the same @hotel/ui Calendar that the hero search bar uses — no new calendar
 * component needed.
 */

"use client";

import { useState } from "react";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { useRoomsContext } from "../../context/RoomsContext";
import { useI18n } from "@/locales";

interface QuickSearchDialogProps {
  /** Whether the inline dialog panel is currently open. */
  isOpen: boolean;
  /** The destination to pre-fill in the search (the room's location). */
  location: string;
  /** Callback to close the dialog (e.g. user clicks cancel). */
  onClose: () => void;
}

export function QuickSearchDialog({ isOpen, location, onClose }: QuickSearchDialogProps) {
  const { t } = useI18n();
  const { onSearch } = useRoomsContext();

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // For the mock, we compute a default date range of today + 7 days
  const today = new Date();
  const defaultCheckIn = new Date(today.getTime() + 7 * 86400000)
    .toISOString()
    .slice(0, 10);
  const defaultCheckOut = new Date(today.getTime() + 10 * 86400000)
    .toISOString()
    .slice(0, 10);

  const handleConfirm = () => {
    onSearch({
      destination: location,
      checkIn: defaultCheckIn,
      checkOut: defaultCheckOut,
      adults,
      children,
      pets: 0,
    });
    onClose();
  };

  return (
    <div
      className={`${S.dialogGrid} ${isOpen ? S.dialogGridOpen : S.dialogGridClosed}`}
      aria-hidden={!isOpen}
    >
      <div className={S.dialogInner}>
        <div className={S.dialogContent}>
          <p className={S.dialogTitle}>{t.ROOMS.QUICK_SEARCH_TITLE}</p>

          {/* Guest steppers */}
          <div role="group" aria-label={t.ROOMS.GUESTS_LABEL}>
            {/* Adults */}
            <div className={S.guestRow}>
              <div>
                <p className={S.guestLabel}>Adultos</p>
                <p className={S.guestSub}>13+ años</p>
              </div>
              <div className={S.guestStepper}>
                <button
                  type="button"
                  className={S.guestStepBtn}
                  onClick={() => setAdults((v) => Math.max(1, v - 1))}
                  disabled={adults <= 1}
                  aria-label="Reducir adultos"
                >
                  −
                </button>
                <span className={S.guestCount} aria-live="polite">{adults}</span>
                <button
                  type="button"
                  className={S.guestStepBtn}
                  onClick={() => setAdults((v) => v + 1)}
                  aria-label="Aumentar adultos"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className={S.guestRow}>
              <div>
                <p className={S.guestLabel}>Niños</p>
                <p className={S.guestSub}>2–12 años</p>
              </div>
              <div className={S.guestStepper}>
                <button
                  type="button"
                  className={S.guestStepBtn}
                  onClick={() => setChildren((v) => Math.max(0, v - 1))}
                  disabled={children <= 0}
                  aria-label="Reducir niños"
                >
                  −
                </button>
                <span className={S.guestCount} aria-live="polite">{children}</span>
                <button
                  type="button"
                  className={S.guestStepBtn}
                  onClick={() => setChildren((v) => v + 1)}
                  aria-label="Aumentar niños"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className={S.dialogActions}>
            <button type="button" className={S.dialogCancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={S.dialogConfirmBtn} onClick={handleConfirm}>
              {t.ROOMS.CONFIRM_SEARCH}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
