import type { RoomOccupancy } from "../../../domain/metrics.types";

export interface RoomOccupancyTabProps {
  roomOccupancies: RoomOccupancy[];
  title: string;
  subtitle: string;
  emptyText: string;
  reservationsSuffix: string;
  nightsSuffix: string;
  meterAriaLabelSuffix: string;
}
