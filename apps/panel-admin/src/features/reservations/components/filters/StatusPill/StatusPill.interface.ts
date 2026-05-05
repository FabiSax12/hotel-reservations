import type { ReservationStatus } from "../../../domain/reservation";

export interface StatusPillProps {
  status: ReservationStatus;
  isOn: boolean;
  count: number;
  onStatusToggle: (status: ReservationStatus) => void;
}
