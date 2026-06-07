"use server";

import { revalidatePath } from "next/cache";
import {
  sendReservationApprovedEmail,
  sendReservationCancelledEmail,
  sendReservationCompletedEmail,
} from "@hotel/core/email";
import type { ReservationStatus } from "../domain/reservation";
import { RESERVATION_STATUS } from "../constants/reservation-statuses";
import { RESERVATIONS_TEXTS } from "../i18n/reservations.texts";
import { updateReservationStatus } from "../services/reservationService";

const ERRORS = RESERVATIONS_TEXTS.es.ERRORS;

export async function updateReservationStatusAction(
  id: string,
  status: ReservationStatus,
  cancellationReason?: string,
): Promise<void> {
  const reservation = await updateReservationStatus(id, status, cancellationReason);

  try {
    if (status === RESERVATION_STATUS.APPROVED) {
      await sendReservationApprovedEmail(
        reservation.guest.email,
        reservation.guest.name,
        reservation.code,
        reservation.checkIn,
        reservation.checkOut,
        reservation.room.name,
        reservation.totalUSD,
      );
    } else if (status === RESERVATION_STATUS.CANCELLED && cancellationReason) {
      await sendReservationCancelledEmail(
        reservation.guest.email,
        reservation.guest.name,
        reservation.code,
        cancellationReason,
      );
    } else if (status === RESERVATION_STATUS.COMPLETED) {
      await sendReservationCompletedEmail(
        reservation.guest.email,
        reservation.guest.name,
        reservation.code,
        reservation.checkIn,
        reservation.checkOut,
        reservation.room.name,
        reservation.totalUSD,
      );
    }
  } catch (emailError) {
    console.error(ERRORS.EMAIL_NOTIFICATION_FAILED, emailError);
  }

  revalidatePath("/admin/reservations");
  revalidatePath(`/admin/reservations/${id}`);
}
