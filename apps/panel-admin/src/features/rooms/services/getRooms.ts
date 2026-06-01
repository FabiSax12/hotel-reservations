"use server";

import { createSupabaseServiceClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import type { Room } from "@/features/rooms/domain/room.interface";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export const getRooms = async (): Promise<Room[]> => {
  await requirePermission(PERMISSIONS.ROOMS.MANAGE);

  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.ROOMS)
    .select("*")
    .order(DB_COLUMNS.rooms.created_at, { ascending: false });

  if (error) throw new Error(error.message);

  return data as Room[];
};
