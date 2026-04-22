import { MOCK_RESERVATIONS } from "@/features/reservaciones/constants/mock-data";
import { ReservationsList } from "@/features/reservaciones/components/ReservationsList";

export default async function ReservationsPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <ReservationsList reservations={MOCK_RESERVATIONS} />;
}
