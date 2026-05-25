import { notFound } from "next/navigation";
import { getReservationById } from "@/features/reservations/services/reservationService";
import { ReservationDetailPage } from "@/features/reservations/components/detail/ReservationDetailPage/ReservationDetailPage";
import type { PageProps } from "./page.interface";

export default async function ReservationDetailRoute({ params }: PageProps) {
  const { id } = await params;
  const reservation = await getReservationById(id);

  if (!reservation) notFound();

  return <ReservationDetailPage reservation={reservation} />;
}
