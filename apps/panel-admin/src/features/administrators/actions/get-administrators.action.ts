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
  const othersFrom = page === ADMIN_DEFAULT_PAGE ? 0 : (page - 1) * ADMIN_PAGE_SIZE - 1;
  const othersTo   = page === ADMIN_DEFAULT_PAGE ? ADMIN_PAGE_SIZE - 2 : page * ADMIN_PAGE_SIZE - 2;

  const [
    { data: sessionData },
    { data, error, count },
    { count: activeCount },
    { count: inactiveCount },
  ] = await Promise.all([
    supabase.from("users").select(ADMIN_SELECT_FIELDS).eq("id", sessionUserId).single(),
    supabase
      .from("users")
      .select(ADMIN_SELECT_FIELDS, { count: "exact" })
      .eq("role", ADMIN_ROLE)
      .neq("id", sessionUserId)
      .order("created_at", { ascending: true })
      .range(othersFrom, othersTo),
    supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", ADMIN_ROLE)
      .eq("is_active", true),
    supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", ADMIN_ROLE)
      .eq("is_active", false),
  ]);

  if (error) throw new Error(error.message);

  const otherAdmins  = (data ?? []) as Administrator[];
  const otherCount   = count ?? 0;
  const sessionAdmin = sessionData ? [sessionData as Administrator] : [];
  const totalCount   = otherCount + sessionAdmin.length;
  const totalPages   = Math.ceil(totalCount / ADMIN_PAGE_SIZE);

  const administrators =
    page === ADMIN_DEFAULT_PAGE
      ? [...sessionAdmin, ...otherAdmins]
      : otherAdmins;

  return {
    administrators,
    sessionUserId,
    totalCount,
    activeCount:  activeCount  ?? 0,
    inactiveCount: inactiveCount ?? 0,
    page,
    totalPages,
  };
}
