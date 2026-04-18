import { MOCK_RESERVACIONES } from "@/features/reservaciones/constants/mock-data";
import { ReservacionesList } from "@/features/reservaciones/components/ReservacionesList";

export default function ReservacionesPage() {
  return <ReservacionesList reservaciones={MOCK_RESERVACIONES} />;
}
