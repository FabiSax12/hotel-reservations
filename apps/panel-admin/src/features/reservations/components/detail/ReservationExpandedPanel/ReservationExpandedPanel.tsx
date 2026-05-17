"use client";

import { Button } from "@heroui/react";
import { useI18n } from "@/locales";
import { ReservationGuestCard } from "../ReservationGuestCard/ReservationGuestCard";
import { ReservationPaymentCard } from "../ReservationPaymentCard/ReservationPaymentCard";
import { ReservationRoomCard } from "../ReservationRoomCard/ReservationRoomCard";
import type { ReservationExpandedPanelProps } from "./ReservationExpandedPanel.interface";
import { RESERVATION_EXPANDED_PANEL_STYLES as S } from "./ReservationExpandedPanel.styles";

export const ReservationExpandedPanel = ({
  reservation: r,
  isClosing = false,
}: ReservationExpandedPanelProps) => {
  const { t } = useI18n();

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

      <div className={S.footer}>
        <Button variant="outline" size="sm" className={S.cancelButton}>
          {t.RESERVATIONS.DETAIL.BTN_CANCEL}
        </Button>
      </div>
    </div>
  );
};
