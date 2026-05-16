"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useI18n } from "@/locales";
import { useNavigationGuard } from "../../../hooks/useNavigationGuard";
import { ReservationGuestCard } from "../ReservationGuestCard/ReservationGuestCard";
import { ReservationRoomCard } from "../ReservationRoomCard/ReservationRoomCard";
import { ReservationPaymentCard } from "../ReservationPaymentCard/ReservationPaymentCard";
import { ReservationStatusFooter } from "../../status/ReservationStatusFooter/ReservationStatusFooter";
import { updateReservationStatusAction } from "../../../actions/updateStatus";
import { RESERVATION_DETAIL_PAGE_STYLES as S } from "./ReservationDetailPage.styles";
import type { Reservation, ReservationStatus } from "../../../domain/reservation";

interface ReservationDetailPageProps {
  reservation: Reservation;
}

const LIST_PATH = "/admin/reservations";

export const ReservationDetailPage = ({ reservation: r }: ReservationDetailPageProps) => {
  const router = useRouter();
  const { t } = useI18n();
  const texts = t.RESERVATIONS.DETAIL_PAGE;

  const { onRegisterClose, onRequestClose, handleBack, onPendingChangesChange } =
    useNavigationGuard({ listPath: LIST_PATH });

  const handleSave = (status: ReservationStatus, cancellationReason?: string) => {
    updateReservationStatusAction(r.id, status, cancellationReason).then(() => {
      router.refresh();
    });
  };

  return (
    <div className={S.page}>
      <div className={S.headerCard}>
        <div className={S.headerLayout}>
          <div className={S.headerLeft}>
            <button className={S.backLink} onClick={handleBack} type="button">
              <ChevronLeft className={S.backIcon} />
              <span>{texts.BACK_TO_LIST}</span>
            </button>
            <h1 className={S.title}>{texts.PAGE_TITLE}</h1>
            <span className={S.codeChip}>{r.code}</span>
          </div>
        </div>
      </div>

      <div className={S.cardsGrid}>
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

      <div className={S.footerWrapper}>
        <ReservationStatusFooter
          key={`${r.id}-${r.status}-${r.cancellationReason ?? ""}`}
          reservationId={r.id}
          currentSavedStatus={r.status}
          originalCancellationReason={r.cancellationReason ?? ""}
          onRequestClose={onRequestClose}
          onRegisterClose={onRegisterClose}
          onPendingChangesChange={onPendingChangesChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};
