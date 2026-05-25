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
import { RESERVATION_DETAIL_PAGE_STYLES as STYLES } from "./ReservationDetailPage.styles";
import type { ReservationStatus } from "../../../domain/reservation";
import { RESERVATIONS_LIST_PATH } from "../../../constants/routes";
import type { ReservationDetailPageProps } from "./ReservationDetailPage.interface";

export const ReservationDetailPage = ({ reservation: r }: ReservationDetailPageProps) => {
  const router = useRouter();
  const { t } = useI18n();
  const texts = t.RESERVATIONS.DETAIL_PAGE;

  const { onRegisterClose, onRequestClose, handleBack, onPendingChangesChange } =
    useNavigationGuard({ listPath: RESERVATIONS_LIST_PATH });

  const handleSave = (status: ReservationStatus, cancellationReason?: string) => {
    updateReservationStatusAction(r.id, status, cancellationReason).then(() => {
      router.refresh();
    });
  };

  return (
    <div className={STYLES.page}>
      <div className={STYLES.headerCard}>
        <div className={STYLES.headerLayout}>
          <div className={STYLES.headerLeft}>
            <button className={STYLES.backLink} onClick={handleBack} type="button">
              <ChevronLeft className={STYLES.backIcon} />
              <span>{texts.BACK_TO_LIST}</span>
            </button>
            <h1 className={STYLES.title}>{texts.PAGE_TITLE}</h1>
            <span className={STYLES.codeChip}>{r.code}</span>
          </div>
        </div>
      </div>

      <div className={STYLES.cardsGrid}>
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

      <div className={STYLES.footerWrapper}>
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
