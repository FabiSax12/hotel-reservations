"use server";
import { type AdminsList, createSupabaseServiceClient } from "@hotel/db";

export const getAdmins = async () => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase.rpc("get_admins");
  if (error) throw new Error(error.message);

  return data as AdminsList;
};
