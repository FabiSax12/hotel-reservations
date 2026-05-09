"use server";

import { revalidatePath } from "next/cache";
import { updateReservationStatus } from "../services/reservationService";
import type { ReservationStatus } from "../domain/reservation";

export async function updateReservationStatusAction(
  id: string,
  status: ReservationStatus,
  cancellationReason?: string,
): Promise<void> {
  await updateReservationStatus(id, status, cancellationReason);
  revalidatePath("/admin/reservations");
}
