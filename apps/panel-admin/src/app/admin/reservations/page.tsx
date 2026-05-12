import { getAllReservations, getRoomNames } from "@/features/reservations/services/reservationService";
import { ReservationsView } from "@/features/reservations/components/list/ReservationsView/ReservationsView";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ReservationsPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const initialPage = Math.max(1, Number(page) || 1);
  const [reservations, rooms] = await Promise.all([getAllReservations(), getRoomNames()]);
  return <ReservationsView reservations={reservations} rooms={rooms} initialPage={initialPage} />;
}
