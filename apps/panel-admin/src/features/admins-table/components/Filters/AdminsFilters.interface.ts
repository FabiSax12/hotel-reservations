export type AdminStatusFilter = "all" | "active" | "inactive";

export interface AdminsFiltersProps {
  activeFilter: AdminStatusFilter;
  onFilterChange: (filter: AdminStatusFilter) => void;
  isFiltered: boolean;
  onClear: () => void;
  statusCounts: { active: number; inactive: number; total: number };
}
