export interface RoomsPageHeaderProps {
  totalCount: number;
  statusCounts: {
    available: number;
    unavailable: number;
    total: number;
  };
}
