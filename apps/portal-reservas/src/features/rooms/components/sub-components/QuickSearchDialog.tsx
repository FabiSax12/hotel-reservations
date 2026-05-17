/**
 * @file QuickSearchDialog.tsx — Inline date + guest picker inside a room card.
 *
 * Renders as a collapsible panel using grid-template-rows animation.
 * Collects guest counts and fires `onSearch` on the page orchestrator.
 */

"use client";

import { useState } from "react";
import { useI18n } from "@/locales";
import { ROOM_CARD_STYLES as S } from "../../../../theme/rooms.theme";
import { ROOM_MOCK } from "../../constants/rooms.constants";
import { useRoomsContext } from "../../context/RoomsContext";
import type { QuickSearchDialogProps } from "../../domain/types";
import { GuestStepper } from "./GuestStepper";

export function QuickSearchDialog({ isOpen, location, onClose }: QuickSearchDialogProps) {
  const { t } = useI18n();
  const R = t.ROOMS;
  const { onSearch } = useRoomsContext();

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const today = new Date();
  const defaultCheckIn = new Date(
    today.getTime() + ROOM_MOCK.QUICK_SEARCH_DAYS_OFFSET_IN * ROOM_MOCK.MS_PER_DAY,
  )
    .toISOString()
    .slice(0, 10);
  const defaultCheckOut = new Date(
    today.getTime() + ROOM_MOCK.QUICK_SEARCH_DAYS_OFFSET_OUT * ROOM_MOCK.MS_PER_DAY,
  )
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
          <p className={S.dialogTitle}>{R.QUICK_SEARCH_TITLE}</p>

          <div role="group" aria-label={R.GUESTS_LABEL}>
            <GuestStepper
              label={R.ADULTS_LABEL}
              subtitle={R.ADULTS_AGE}
              value={adults}
              min={1}
              onDecrement={() => setAdults((v) => Math.max(1, v - 1))}
              onIncrement={() => setAdults((v) => v + 1)}
              decrementLabel={R.DECREASE_ADULTS}
              incrementLabel={R.INCREASE_ADULTS}
            />
            <GuestStepper
              label={R.CHILDREN_LABEL}
              subtitle={R.CHILDREN_AGE}
              value={children}
              min={0}
              onDecrement={() => setChildren((v) => Math.max(0, v - 1))}
              onIncrement={() => setChildren((v) => v + 1)}
              decrementLabel={R.DECREASE_CHILDREN}
              incrementLabel={R.INCREASE_CHILDREN}
            />
          </div>

          <div className={S.dialogActions}>
            <button type="button" className={S.dialogCancelBtn} onClick={onClose}>
              {R.CANCEL}
            </button>
            <button type="button" className={S.dialogConfirmBtn} onClick={handleConfirm}>
              {R.CONFIRM_SEARCH}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
