import type { ReservationStatus } from "@/features/reservations/domain/reservation";

export type { ReservationStatus };

export interface MetricsReservation {
  id: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: ReservationStatus;
  roomName: string;
  roomId: string;
}

export interface MetricsRoom {
  id: string;
  name: string;
  isActive: boolean;
}

export interface MetricsDateRange {
  start: string;
  end: string;
}

export interface StatusCounts {
  pending: number;
  approved: number;
  cancelled: number;
  completed: number;
}

export interface WeeklyDataPoint {
  weekLabel: string;
  pending: number;
  approved: number;
  cancelled: number;
  completed: number;
  total: number;
}

export interface RoomOccupancy {
  roomId: string;
  roomName: string;
  occupancyPct: number;
  revenue: number;
  reservationCount: number;
}

export interface RankingEntry {
  rank: number;
  roomId: string;
  roomName: string;
  reservationCount: number;
  revenue: number;
  proportionPct: number;
}

export interface DashboardMetrics {
  totalReservations: number;
  totalRevenue: number;
  averageOccupancy: number;
  activeRooms: number;
  totalRooms: number;
  statusCounts: StatusCounts;
  weeklyData: WeeklyDataPoint[];
  roomOccupancies: RoomOccupancy[];
  ranking: RankingEntry[];
}
