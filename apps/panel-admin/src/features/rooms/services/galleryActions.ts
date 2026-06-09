"use server";

import { createSupabaseServerClient } from "@hotel/db";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { GALLERY_CONFIG } from "../constants/gallery.constants";
import type { RoomImage } from "../domain/roomImage.interface";

// Cast required until `pnpm db:types` is run after applying the migration.
type AnyClient = SupabaseClient<any>;

export async function uploadImage(
  roomId: string,
  file: File,
): Promise<{ id: string; url: string; storagePath: string } | null> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore) as unknown as AnyClient;

  const ext = file.name.split(".").pop();
  const storagePath = `${roomId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_CONFIG.BUCKET)
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) return null;

  const {
    data: { publicUrl },
  } = supabase.storage.from(GALLERY_CONFIG.BUCKET).getPublicUrl(storagePath);

  const { data: existing } = await supabase
    .from("room_images")
    .select("position")
    .eq("room_id", roomId)
    .order("position", { ascending: false })
    .limit(1);

  const position = existing?.[0]?.position != null ? existing[0].position + 1 : 0;

  const { data, error: insertError } = await supabase
    .from("room_images")
    .insert({ room_id: roomId, storage_path: storagePath, url: publicUrl, position })
    .select()
    .single();

  if (insertError) {
    await supabase.storage.from(GALLERY_CONFIG.BUCKET).remove([storagePath]);
    return null;
  }

  return { id: data.id, url: data.url, storagePath: data.storage_path };
}

export async function deleteImage(imageId: string): Promise<boolean> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore) as unknown as AnyClient;

  const { data, error: fetchError } = await supabase
    .from("room_images")
    .select("storage_path")
    .eq("id", imageId)
    .single();

  if (fetchError || !data) return false;

  const { error: deleteError } = await supabase
    .from("room_images")
    .delete()
    .eq("id", imageId);

  if (deleteError) return false;

  await supabase.storage.from(GALLERY_CONFIG.BUCKET).remove([data.storage_path]);
  return true;
}

export async function reorderImages(orderedIds: string[]): Promise<boolean> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore) as unknown as AnyClient;

  const results = await Promise.all(
    orderedIds.map((id, position) =>
      supabase.from("room_images").update({ position }).eq("id", id),
    ),
  );

  return results.every(({ error }) => !error);
}

export async function getRoomImages(roomId: string): Promise<RoomImage[]> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore) as unknown as AnyClient;

  const { data, error } = await supabase
    .from("room_images")
    .select("*")
    .eq("room_id", roomId)
    .order("position", { ascending: true });

  if (error) return [];
  return data as RoomImage[];
}
