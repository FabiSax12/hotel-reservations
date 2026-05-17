"use client";

import { ReservationGuestCard } from "../ReservationGuestCard/ReservationGuestCard";
import { ReservationPaymentCard } from "../ReservationPaymentCard/ReservationPaymentCard";
import { ReservationStatusFooter } from "../../status/ReservationStatusFooter/ReservationStatusFooter";
import { RESERVATION_EXPANDED_PANEL_STYLES as S } from "./ReservationExpandedPanel.styles";
import type { ReservationExpandedPanelProps } from "./ReservationExpandedPanel.interface";
import { RESERVATION_EXPANDED_PANEL_STYLES as S } from "./ReservationExpandedPanel.styles";

const noop = () => {};
const noopRegister = (_id: string, _handler: () => void) => noop;

export const ReservationExpandedPanel = ({
  reservation: r,
  isClosing = false,
  onSave,
  onRequestClose = noop,
  onRegisterClose = noopRegister,
}: ReservationExpandedPanelProps) => {
  const wrapperClassName = `${S.wrapperBase} ${isClosing ? S.wrapperExit : S.wrapperEnter}`;

  return (
    <div className={wrapperClassName}>
      <div className={S.body}>
        <ReservationGuestCard guest={r.guest} />
        <ReservationRoomCard
          room={r.room}
          guests={r.guests}
          checkIn={r.checkIn}
          checkOut={r.checkOut}
          nights={r.nights}
        />
        <ReservationPaymentCard
          pricePerNight={r.pricePerNight}
          nights={r.nights}
          totalUSD={r.totalUSD}
          currency={r.currency}
        />
      </div>

      <ReservationStatusFooter
        key={`${r.id}-${r.status}-${r.cancellationReason ?? ""}`}
        reservationId={r.id}
        currentSavedStatus={r.status}
        originalCancellationReason={r.cancellationReason ?? ""}
        onRequestClose={onRequestClose}
        onRegisterClose={onRegisterClose}
        onSave={onSave}
      />
    </div>
  );
};
