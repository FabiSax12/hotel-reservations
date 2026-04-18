export type ActiveSection = "where" | "checkIn" | "checkOut" | "who" | null;

export interface SearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  pets: number;
}

export interface SearchBarProps {
  onSearch?: (state: SearchState) => void;
  className?: string; 
  size?: 'compact' | 'hero';
  initialState?: Partial<SearchState>;
  onHeroCalendarOpen?: () => void;
}
