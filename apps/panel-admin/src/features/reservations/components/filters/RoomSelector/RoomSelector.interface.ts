export interface RoomSelectorProps {
  value: string;
  rooms: readonly string[];
  onChange: (key: string | number | null) => void;
}
