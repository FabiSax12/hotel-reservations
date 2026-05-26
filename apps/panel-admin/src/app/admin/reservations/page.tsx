import { forbidden } from "next/navigation";
import { ReservationsView } from "@/features/reservations/components/list/ReservationsView/ReservationsView";
import {
  getAllReservations,
  getRoomNames,
} from "@/features/reservations/services/reservationService";
import { AuthenticationRequiredError, PermissionDeniedError } from "@/shared/auth/errors";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ReservationsPage({ searchParams }: PageProps) {
  try {
    const { page } = await searchParams;
    const initialPage = Math.max(1, Number(page) || 1);
    const [reservations, rooms] = await Promise.all([getAllReservations(), getRoomNames()]);
    return <ReservationsView reservations={reservations} rooms={rooms} initialPage={initialPage} />;
  } catch (error) {
    if (error instanceof AuthenticationRequiredError || error instanceof PermissionDeniedError) {
      forbidden();
    }

    throw error;
  }
}
