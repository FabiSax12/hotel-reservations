import { ReservationsList } from "@/features/reservaciones/components/ReservationsList";
import { MOCK_RESERVATIONS } from "@/features/reservaciones/constants/mock-data";

export default function ReservationsPage() {
  return <ReservationsList reservations={MOCK_RESERVATIONS} />;
}
