/**
 * @file QuickSearchDialog.tsx — Inline date + guest picker inside a room card.
 *
 * Renders as a collapsible panel using grid-template-rows animation.
 * Collects guest counts and fires `onSearch` on the page orchestrator.
 */

"use client";

import { ROOM_CARD_STYLES } from "../../../../theme/rooms.theme";
import { useI18n } from "@/locales";
import { GuestStepper } from "./GuestStepper";
import { useQuickSearchDialog } from "../../hooks/useQuickSearchDialog";
import type { QuickSearchDialogProps } from "../../domain/types";

export function QuickSearchDialog({ isOpen, location, onClose }: QuickSearchDialogProps) {
  const { t } = useI18n();
  const R = t.ROOMS;
  const {
    adults,
    children,
    minAdults,
    minChildren,
    decrementAdults,
    incrementAdults,
    decrementChildren,
    incrementChildren,
    handleConfirm,
  } = useQuickSearchDialog({ location, onClose });

  return (
    <div
      className={`${ROOM_CARD_STYLES.dialogGrid} ${isOpen ? ROOM_CARD_STYLES.dialogGridOpen : ROOM_CARD_STYLES.dialogGridClosed}`}
      aria-hidden={!isOpen}
    >
      <div className={ROOM_CARD_STYLES.dialogInner}>
        <div className={ROOM_CARD_STYLES.dialogContent}>
          <p className={ROOM_CARD_STYLES.dialogTitle}>{R.QUICK_SEARCH_TITLE}</p>

          <div role="group" aria-label={R.GUESTS_LABEL}>
            <GuestStepper
              label={R.ADULTS_LABEL} subtitle={R.ADULTS_AGE}
              value={adults} min={minAdults}
              onDecrement={decrementAdults}
              onIncrement={incrementAdults}
              decrementLabel={R.DECREASE_ADULTS} incrementLabel={R.INCREASE_ADULTS}
            />
            <GuestStepper
              label={R.CHILDREN_LABEL} subtitle={R.CHILDREN_AGE}
              value={children} min={minChildren}
              onDecrement={decrementChildren}
              onIncrement={incrementChildren}
              decrementLabel={R.DECREASE_CHILDREN} incrementLabel={R.INCREASE_CHILDREN}
            />
          </div>

          <div className={ROOM_CARD_STYLES.dialogActions}>
            <button type="button" className={ROOM_CARD_STYLES.dialogCancelBtn} onClick={onClose}>
              {R.CANCEL}
            </button>
            <button type="button" className={ROOM_CARD_STYLES.dialogConfirmBtn} onClick={handleConfirm}>
              {R.CONFIRM_SEARCH}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
