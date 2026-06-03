export interface StatCardsProps {
  totalReservations: number;
  totalRevenue: number;
  averageOccupancy: number;
  activeRooms: number;
  totalRooms: number;
  labels: {
    TOTAL_RESERVATIONS: string;
    TOTAL_REVENUE: string;
    AVG_OCCUPANCY: string;
    ACTIVE_ROOMS: string;
  };
}
