"use server";

import { createSupabaseServiceClient } from "@hotel/db";
import { getServerAuthContext } from "@hotel/core/auth";
import {
  ADMIN_ROLE,
  ADMIN_SELECT_FIELDS,
  ADMIN_PAGE_SIZE,
  ADMIN_DEFAULT_PAGE,
} from "../constants/administrators.constants";
import type { Administrator, AdministratorsData } from "../domain/administrator.types";

export async function getAdministratorsAction(
  page: number = ADMIN_DEFAULT_PAGE,
): Promise<AdministratorsData> {
  const { user } = await getServerAuthContext();
  const supabase   = createSupabaseServiceClient();
  const sessionUserId = user?.id ?? "";

  // Fetch session admin separately — always pinned on page 1
  const { data: sessionData } = await supabase
    .from("users")
    .select(ADMIN_SELECT_FIELDS)
    .eq("id", sessionUserId)
    .single();

  // Paginate "other" admins:
  //   Page 1 → others[0..pageSize-2]   (9 slots, session fills slot 0)
  //   Page N → others[(N-1)*pageSize-1..N*pageSize-2]
  const othersFrom = page === ADMIN_DEFAULT_PAGE ? 0 : (page - 1) * ADMIN_PAGE_SIZE - 1;
  const othersTo   = page === ADMIN_DEFAULT_PAGE ? ADMIN_PAGE_SIZE - 2 : page * ADMIN_PAGE_SIZE - 2;

  const { data, error, count } = await supabase
    .from("users")
    .select(ADMIN_SELECT_FIELDS, { count: "exact" })
    .eq("role", ADMIN_ROLE)
    .neq("id", sessionUserId)
    .order("created_at", { ascending: true })
    .range(othersFrom, othersTo);

  if (error) throw new Error(error.message);

  const otherAdmins = (data ?? []) as Administrator[];
  const otherCount  = count ?? 0;
  const sessionAdmin = sessionData ? [sessionData as Administrator] : [];
  const totalCount   = otherCount + sessionAdmin.length;
  const totalPages   = Math.ceil(totalCount / ADMIN_PAGE_SIZE);

  const administrators =
    page === ADMIN_DEFAULT_PAGE
      ? [...sessionAdmin, ...otherAdmins]
      : otherAdmins;

  return { administrators, sessionUserId, totalCount, page, totalPages };
}
