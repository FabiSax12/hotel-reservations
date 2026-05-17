"use client";

import { useI18n } from "@/locales";
import { CHECK_IN_TIME, CHECK_OUT_TIME } from "../../../domain/reservation";
import { formatDetailDate, getTodayISODate } from "../../../utils/format-reservation-date";
import { computeTotalGuests, pluralizeCount } from "../../../utils/reservation-utils";
import { Divider } from "../../shared/Divider/Divider";
import { ReservationDetailCard } from "../ReservationDetailCard/ReservationDetailCard";
import type { ReservationRoomCardProps } from "./ReservationRoomCard.interface";
import { RESERVATION_ROOM_CARD_STYLES as S } from "./ReservationRoomCard.styles";

export const ReservationRoomCard = ({
  room,
  guests,
  checkIn,
  checkOut,
  nights,
}: ReservationRoomCardProps) => {
  const { t } = useI18n();
  const labels = t.RESERVATIONS.DETAIL;

  const arrivesToday = checkIn === getTodayISODate();
  const totalGuests = computeTotalGuests(guests);
  const nightsBadge = pluralizeCount(nights, labels.LABEL_NIGHT, labels.LABEL_NIGHTS);

  return (
    <ReservationDetailCard title={labels.SECTION_ROOM}>
      <p className={S.roomName}>{room.name}</p>
      <p className={S.roomLocation}>{room.location}</p>

      <Divider />
      <div className={S.datesBlock}>
        {arrivesToday && <span className={S.arrivesToday}>{labels.ARRIVES_TODAY}</span>}
        <div className={S.datesRow}>
          <div className={S.dateCard}>
            <span className={S.dateLabel}>{labels.LABEL_CHECKIN}</span>
            <span className={S.dateValue}>{formatDetailDate(checkIn)}</span>
            <span className={S.dateTime}>{CHECK_IN_TIME}</span>
          </div>

          <div className={S.nightsConnector}>
            <div className={S.nightsConnectorLine} />
            <span className={S.nightsBadge}>{nightsBadge}</span>
            <div className={S.nightsConnectorLine} />
          </div>

          <div className={S.dateCard}>
            <span className={S.dateLabel}>{labels.LABEL_CHECKOUT}</span>
            <span className={S.dateValue}>{formatDetailDate(checkOut)}</span>
            <span className={S.dateTime}>{CHECK_OUT_TIME}</span>
          </div>
        </div>
      </div>

      <Divider />
      <span className={S.guestsLabel}>
        {labels.LABEL_GUESTS_TOTAL} · {totalGuests}
      </span>
      <div className={S.guestBreakdown}>
        <span className={S.guestChip}>
          {labels.LABEL_ADULTS}: {guests.adults}
        </span>
        {guests.children != null && guests.children > 0 && (
          <span className={S.guestChip}>
            {labels.LABEL_CHILDREN}: {guests.children}
          </span>
        )}
        {guests.pets != null && guests.pets > 0 && (
          <span className={S.guestChip}>
            {labels.LABEL_PETS}: {guests.pets}
          </span>
        )}
      </div>
    </ReservationDetailCard>
  );
};
