"use client";

import { useI18n } from "@/locales";
import { CHECK_IN_TIME, CHECK_OUT_TIME } from "../../../domain/reservation";
import { formatDetailDate, getTodayISODate } from "../../../utils/format-reservation-date";
import { computeTotalGuests, pluralizeCount } from "../../../utils/reservation-utils";
import { Divider } from "../../shared/Divider/Divider";
import { ReservationDetailCard } from "../ReservationDetailCard/ReservationDetailCard";
import type { ReservationRoomCardProps } from "./ReservationRoomCard.interface";
import { RESERVATION_ROOM_CARD_STYLES as STYLES } from "./ReservationRoomCard.styles";

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
      <p className={STYLES.roomName}>{room.name}</p>
      <p className={STYLES.roomLocation}>{room.location}</p>

      <Divider />
      <div className={STYLES.datesBlock}>
        {arrivesToday && <span className={STYLES.arrivesToday}>{labels.ARRIVES_TODAY}</span>}
        <div className={STYLES.datesRow}>
          <div className={STYLES.dateCard}>
            <span className={STYLES.dateLabel}>{labels.LABEL_CHECKIN}</span>
            <span className={STYLES.dateValue}>{formatDetailDate(checkIn)}</span>
            <span className={STYLES.dateTime}>{CHECK_IN_TIME}</span>
          </div>

          <div className={STYLES.nightsConnector}>
            <div className={STYLES.nightsConnectorLine} />
            <span className={STYLES.nightsBadge}>{nightsBadge}</span>
            <div className={STYLES.nightsConnectorLine} />
          </div>

          <div className={STYLES.dateCard}>
            <span className={STYLES.dateLabel}>{labels.LABEL_CHECKOUT}</span>
            <span className={STYLES.dateValue}>{formatDetailDate(checkOut)}</span>
            <span className={STYLES.dateTime}>{CHECK_OUT_TIME}</span>
          </div>
        </div>
      </div>

      <Divider />
      <span className={STYLES.guestsLabel}>
        {labels.LABEL_GUESTS_TOTAL} · {totalGuests}
      </span>
      <div className={STYLES.guestBreakdown}>
        <span className={STYLES.guestChip}>
          {labels.LABEL_ADULTS}: {guests.adults}
        </span>
        {guests.children != null && guests.children > 0 && (
          <span className={STYLES.guestChip}>
            {labels.LABEL_CHILDREN}: {guests.children}
          </span>
        )}
        {guests.pets != null && guests.pets > 0 && (
          <span className={STYLES.guestChip}>
            {labels.LABEL_PETS}: {guests.pets}
          </span>
        )}
      </div>
    </ReservationDetailCard>
  );
};
