"use server";

import { AUDIT_ACTIONS, AUDIT_ENTITIES } from "@hotel/core/audit";
import { getAuditRequestContext, logAuditEvent } from "@hotel/core/audit/server";
import { getVerifiedSession } from "@hotel/core/auth";
import { createSupabaseServerClient, DB_COLUMNS, DB_TABLES } from "@hotel/db";
import { createSupabaseServiceClient } from "@hotel/db/client";
import { cookies } from "next/headers";
import { requirePermission } from "@/shared/auth/requirePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { BOOKING_MODE_SETTING_KEY } from "../constants/booking-mode";
import type { BookingMode } from "../domain/reservation";
import { InvalidBookingModeError, isBookingMode } from "../domain/reservation-rules";
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

  // OP-R07: this is a Server Action, so `mode` is whatever the client sent; the
  // BookingMode type does not exist at runtime. Reject anything off the enum.
  if (!isBookingMode(mode)) throw new InvalidBookingModeError();

  const supabase = createSupabaseServiceClient();

  const { data: previous } = await supabase
    .from(DB_TABLES.SYSTEM_SETTINGS)
    .select(DB_COLUMNS.system_settings.setting_value)
    .eq(DB_COLUMNS.system_settings.setting_key, BOOKING_MODE_SETTING_KEY)
    .maybeSingle();

  const { error } = await supabase
    .from(DB_TABLES.SYSTEM_SETTINGS)
    .update({ [DB_COLUMNS.system_settings.setting_value]: mode })
    .eq(DB_COLUMNS.system_settings.setting_key, BOOKING_MODE_SETTING_KEY);

  if (error) throw new Error(`${ERRORS.UPDATE_BOOKING_MODE}: ${error.message}`);

  // OP-R07: the change of confirmation mode is now traceable (who, from → to).
  const { user } = await getVerifiedSession(createSupabaseServerClient(await cookies()));
  const { ipAddress, userAgent } = await getAuditRequestContext();

  await logAuditEvent({
    actorId: user?.id ?? null,
    actorEmail: user?.email ?? null,
    action: AUDIT_ACTIONS.SYSTEM_SETTING_CHANGED,
    entity: AUDIT_ENTITIES.SYSTEM_SETTING,
    entityId: BOOKING_MODE_SETTING_KEY,
    metadata: {
      setting: BOOKING_MODE_SETTING_KEY,
      from: (previous as { setting_value: string } | null)?.setting_value ?? null,
      to: mode,
    },
    ipAddress,
    userAgent,
  });
}
