"use server";

import { createSupabaseServerClient } from "@hotel/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ROUTES } from "@/config/routes";
import type { CreateRoomDTO, UpdateRoomDTO } from "../domain/room.interface";
import { roomService } from "./roomService";

/**
 * Server Action to create a new room.
 * Validates admin/owner role via RLS on the server side using the session cookie.
 */
export async function createRoomAction(data: CreateRoomDTO) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  try {
    const newRoom = await roomService.createRoom(data, supabase);
    revalidatePath(ROUTES.ADMIN.DASHBOARD);
    return { data: newRoom, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Server Action to update an existing room.
 */
export async function updateRoomAction(id: string, data: UpdateRoomDTO) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  try {
    const updatedRoom = await roomService.updateRoom(id, data, supabase);
    revalidatePath(ROUTES.ADMIN.DASHBOARD);
    return { data: updatedRoom, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Server Action to toggle room active state.
 */
export async function toggleRoomStateAction(id: string) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  try {
    const updatedRoom = await roomService.toggleRoomState(id, supabase);
    revalidatePath(ROUTES.ADMIN.DASHBOARD);
    return { data: updatedRoom, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
