import type { StatusCounts, WeeklyDataPoint } from "../../../domain/metrics.types";

export interface ReservationsByStatusTabProps {
  statusCounts: StatusCounts;
  totalReservations: number;
  weeklyData: WeeklyDataPoint[];
  periodLabel: string;
  statusLabels: {
    PENDING: string;
    APPROVED: string;
    CANCELLED: string;
    COMPLETED: string;
  };
  totalLabel: string;
  periodPrefix: string;
  weeklyTitle: string;
  weeklyEmptyText: string;
  chartAriaLabel: string;
  barAriaLabel: string;
}
