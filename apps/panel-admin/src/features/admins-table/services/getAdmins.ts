"use server";
import { type AdminsList, createSupabaseServiceClient, RPC_FUNCTIONS } from "@hotel/db";

export const getAdmins = async () => {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.rpc(RPC_FUNCTIONS.GET_ADMINS);
  if (error) throw new Error(error.message);

  return data as AdminsList;
};
