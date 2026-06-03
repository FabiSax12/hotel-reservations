import { forbidden, notFound } from "next/navigation";
import { ReservationDetailPage } from "@/features/reservations/components/detail/ReservationDetailPage/ReservationDetailPage";
import { getReservationById } from "@/features/reservations/services/reservationService";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";
import type { PageProps } from "./page.interface";

export default async function ReservationDetailRoute({ params }: PageProps) {
  try {
    const { id } = await params;
    const reservation = await getReservationById(id);

    if (!reservation) notFound();

    return <ReservationDetailPage reservation={reservation} />;
  } catch (error) {
    if (error instanceof AuthenticationRequiredError || error instanceof PermissionDeniedError) {
      forbidden();
    }
    throw error;
  }
}
