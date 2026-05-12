import { ReservationsView } from "@/features/reservations/components/list/ReservationsView/ReservationsView";
import { MOCK_RESERVATIONS } from "@/features/reservations/constants/mock-data";

export default function ReservationsPage() {
  return <ReservationsView reservations={MOCK_RESERVATIONS} />;
}
