/**
 * Regression tests for OP-R07 (Fase 3): updateBookingMode is a Server Action,
 * so its argument comes from the client. Values outside the BookingMode enum
 * are rejected before the UPDATE, and every accepted change is audited.
 * Mocks Supabase and the audit writer; does not hit a real project.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { InvalidBookingModeError } from "@/features/reservations/domain/reservation-rules";
import { updateBookingMode } from "@/features/reservations/services/bookingModeService";
import { PermissionDeniedError } from "@/shared/auth/errors";

const { mockRequirePermission, mockLogAuditEvent, mockUpdate, state } = vi.hoisted(() => ({
  mockRequirePermission: vi.fn(),
  mockLogAuditEvent: vi.fn(() => Promise.resolve()),
  mockUpdate: vi.fn(),
  state: { previous: { setting_value: "manual" } as { setting_value: string } | null },
}));

vi.mock("next/headers", () => ({ cookies: vi.fn(() => Promise.resolve({})) }));

vi.mock("@hotel/core/audit", () => ({
  AUDIT_ACTIONS: { SYSTEM_SETTING_CHANGED: "system.setting.changed" },
  AUDIT_ENTITIES: { SYSTEM_SETTING: "system_setting" },
}));

vi.mock("@hotel/core/audit/server", () => ({
  getAuditRequestContext: vi.fn(() => Promise.resolve({ ipAddress: null, userAgent: "ua" })),
  logAuditEvent: mockLogAuditEvent,
}));

vi.mock("@hotel/core/auth", () => ({
  getVerifiedSession: async () => ({
    session: null,
    user: { id: "admin-1", email: "admin@hotel.local" },
  }),
}));

vi.mock("@/shared/auth/requirePermission", () => ({ requirePermission: mockRequirePermission }));

vi.mock("@hotel/db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@hotel/db")>();
  return { ...actual, createSupabaseServerClient: () => ({}) };
});

vi.mock("@hotel/db/client", () => {
  const select = {
    eq: () => select,
    maybeSingle: () => Promise.resolve({ data: state.previous, error: null }),
  };
  return {
    createSupabaseServiceClient: () => ({
      from: () => ({
        select: () => select,
        update: (data: unknown) => {
          mockUpdate(data);
          return { eq: () => Promise.resolve({ error: null }) };
        },
      }),
    }),
  };
});

beforeEach(() => {
  mockRequirePermission.mockReset().mockResolvedValue(undefined);
  mockLogAuditEvent.mockClear();
  mockUpdate.mockClear();
  state.previous = { setting_value: "manual" };
});

describe("updateBookingMode (OP-R07)", () => {
  it("accepts a valid mode and audits the change from → to", async () => {
    await updateBookingMode("automatic");

    expect(mockUpdate).toHaveBeenCalledWith({ setting_value: "automatic" });
    expect(mockLogAuditEvent).toHaveBeenCalledWith({
      actorId: "admin-1",
      actorEmail: "admin@hotel.local",
      action: "system.setting.changed",
      entity: "system_setting",
      entityId: "booking_confirmation_mode",
      metadata: { setting: "booking_confirmation_mode", from: "manual", to: "automatic" },
      ipAddress: null,
      userAgent: "ua",
    });
  });

  it.each([
    "disabled",
    "AUTOMATIC",
    "",
    "manual' OR '1'='1",
    "<img src=x onerror=alert(1)>",
  ])("rejects %j before the UPDATE (PoC: replayed Server Action)", async (value) => {
    await expect(updateBookingMode(value as "manual")).rejects.toBeInstanceOf(
      InvalidBookingModeError,
    );
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockLogAuditEvent).not.toHaveBeenCalled();
  });

  it("rejects non-string payloads", async () => {
    await expect(updateBookingMode(42 as unknown as "manual")).rejects.toBeInstanceOf(
      InvalidBookingModeError,
    );
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("still requires reservations:edit first", async () => {
    mockRequirePermission.mockRejectedValue(new PermissionDeniedError("reservations:edit"));

    await expect(updateBookingMode("automatic")).rejects.toBeInstanceOf(PermissionDeniedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
