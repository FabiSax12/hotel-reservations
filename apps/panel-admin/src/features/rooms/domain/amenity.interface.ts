export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RoomAmenity {
  room_id: string;
  amenity_id: string;
  created_at?: string;
}

export interface RoomWithAmenities extends RoomAmenity {
  amenity: Amenity;
}
