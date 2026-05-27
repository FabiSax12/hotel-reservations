import { createSupabaseClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import type { Amenity } from "@/features/rooms/domain/amenity.interface";

export const amenityService = {
  getPredefinedAmenities: async (supabase = createSupabaseClient()): Promise<Amenity[]> => {
    const { data, error } = await supabase
      .from(DB_TABLES.AMENITIES)
      .select("*")
      .order(DB_COLUMNS.amenities.name, { ascending: true });

    if (error) throw new Error(error.message);
    return data as Amenity[];
  },

  getRoomAmenities: async (roomId: string, supabase = createSupabaseClient()): Promise<string[]> => {
    const { data, error } = await supabase
      .from(DB_TABLES.ROOM_AMENITIES)
      .select(DB_COLUMNS.room_amenities.amenity_id)
      .eq(DB_COLUMNS.room_amenities.room_id, roomId);

    if (error) throw new Error(error.message);
    return data.map((row) => row.amenity_id);
  },

  saveRoomAmenities: async (
    roomId: string,
    amenityIds: string[],
    supabase = createSupabaseClient(),
  ): Promise<void> => {
    // 1. Delete existing associations
    const { error: deleteError } = await supabase
      .from(DB_TABLES.ROOM_AMENITIES)
      .delete()
      .eq(DB_COLUMNS.room_amenities.room_id, roomId);

    if (deleteError) throw new Error(deleteError.message);

    // 2. Insert new associations
    if (amenityIds.length > 0) {
      const { error: insertError } = await supabase.from(DB_TABLES.ROOM_AMENITIES).insert(
        amenityIds.map((id) => ({
          [DB_COLUMNS.room_amenities.room_id]: roomId,
          [DB_COLUMNS.room_amenities.amenity_id]: id,
        })),
      );

      if (insertError) throw new Error(insertError.message);
    }
  },

  addCustomAmenity: async (
    name: string,
    icon: string = "Sparkles",
    description: string = "",
    supabase = createSupabaseClient(),
  ): Promise<Amenity> => {
    const { data, error } = await supabase
      .from(DB_TABLES.AMENITIES)
      .insert([{ 
        [DB_COLUMNS.amenities.name]: name, 
        [DB_COLUMNS.amenities.icon]: icon, 
        [DB_COLUMNS.amenities.description]: description 
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Amenity;
  },

  updateCustomAmenity: async (
    id: string,
    name: string,
    icon: string,
    description: string = "",
    supabase = createSupabaseClient(),
  ): Promise<Amenity> => {
    const { data, error } = await supabase
      .from(DB_TABLES.AMENITIES)
      .update({ 
        [DB_COLUMNS.amenities.name]: name, 
        [DB_COLUMNS.amenities.icon]: icon, 
        [DB_COLUMNS.amenities.description]: description 
      })
      .eq(DB_COLUMNS.amenities.id, id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Amenity;
  },

  deleteCustomAmenity: async (id: string, supabase = createSupabaseClient()): Promise<void> => {
    const { error } = await supabase
      .from(DB_TABLES.AMENITIES)
      .delete()
      .eq(DB_COLUMNS.amenities.id, id);

    if (error) throw new Error(error.message);
  },
};
