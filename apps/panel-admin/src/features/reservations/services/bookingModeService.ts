"use server";

import { DB_COLUMNS, DB_TABLES } from "@hotel/db";
import { createSupabaseServiceClient } from "@hotel/db/client";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { BOOKING_MODE_SETTING_KEY } from "../constants/booking-mode";
import type { BookingMode } from "../domain/reservation";
import { RESERVATIONS_TEXTS } from "../i18n/reservations.texts";

const ERRORS = RESERVATIONS_TEXTS.es.ERRORS;

export async function getBookingMode(): Promise<BookingMode> {
  await requirePermission(PERMISSIONS.RESERVATIONS.VIEW);

  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(DB_TABLES.SYSTEM_SETTINGS)
    .select(DB_COLUMNS.system_settings.setting_value)
    .eq(DB_COLUMNS.system_settings.setting_key, BOOKING_MODE_SETTING_KEY)
    .single();

  if (error) throw new Error(`${ERRORS.FETCH_BOOKING_MODE}: ${error.message}`);

  return data.setting_value as BookingMode;
}

export async function updateBookingMode(mode: BookingMode): Promise<void> {
  await requirePermission(PERMISSIONS.RESERVATIONS.EDIT);

  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from(DB_TABLES.SYSTEM_SETTINGS)
    .update({ [DB_COLUMNS.system_settings.setting_value]: mode })
    .eq(DB_COLUMNS.system_settings.setting_key, BOOKING_MODE_SETTING_KEY);

  if (error) throw new Error(`${ERRORS.UPDATE_BOOKING_MODE}: ${error.message}`);
}
