export interface RoomImage {
  id: string;
  room_id: string;
  storage_path: string;
  url: string;
  position: number;
  created_at?: string;
}

export type LocalImage = {
  id: string;
  url: string;
  isUploading: boolean;
};
