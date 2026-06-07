"use server";

import { revalidatePath } from "next/cache";
import {
  sendReservationApprovedEmail,
  sendReservationCancelledEmail,
} from "@hotel/core/email";
import type { ReservationStatus } from "../domain/reservation";
import { updateReservationStatus } from "../services/reservationService";

export async function updateReservationStatusAction(
  id: string,
  status: ReservationStatus,
  cancellationReason?: string,
): Promise<void> {
  const reservation = await updateReservationStatus(id, status, cancellationReason);

  try {
    if (status === "approved") {
      await sendReservationApprovedEmail(
        reservation.guest.email,
        reservation.guest.name,
        reservation.code,
        reservation.checkIn,
        reservation.checkOut,
        reservation.room.name,
        reservation.totalUSD,
      );
    } else if (status === "cancelled" && cancellationReason) {
      await sendReservationCancelledEmail(
        reservation.guest.email,
        reservation.guest.name,
        reservation.code,
        cancellationReason,
      );
    }
  } catch (emailError) {
    console.error("Email notification failed:", emailError);
  }

  revalidatePath("/admin/reservations");
  revalidatePath(`/admin/reservations/${id}`);
}
