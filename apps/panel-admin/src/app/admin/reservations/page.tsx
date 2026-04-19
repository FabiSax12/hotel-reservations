import { MOCK_RESERVATIONS } from "@/features/reservaciones/constants/mock-data";
import { ReservationsList } from "@/features/reservaciones/components/ReservationsList";

export default function ReservationsPage() {
  return <ReservationsList reservations={MOCK_RESERVATIONS} />;
}
