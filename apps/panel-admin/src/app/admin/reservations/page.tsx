import { MOCK_RESERVATIONS } from "@/features/reservations/constants/mock-data";
import { ReservationsView } from "@/features/reservations/components/ReservationsView/ReservationsView";

export default function ReservationsPage() {
  return <ReservationsView reservations={MOCK_RESERVATIONS} />;
}
