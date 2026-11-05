/**
 * Regression tests for updateReservationStatus:
 * - A3.4 (OP-POC-6): a status change is recorded in the audit trail with the
 *   verified admin as actor.
 * - OP-R05 (Fase 3): the server enforces the reservation state machine; a
 *   replayed request with an invalid transition never reaches the UPDATE.
 * Mocks Supabase and the audit writer; does not hit a real project.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  InvalidStatusTransitionError,
  ReservationNotFoundError,
} from "@/features/reservations/domain/reservation-rules";
import { updateReservationStatus } from "@/features/reservations/services/reservationService";
import { PermissionDeniedError } from "@/shared/auth/errors";

const { mockRequirePermission, mockLogAuditEvent, mockGetUser, mockUpdate, state } = vi.hoisted(
  () => ({
    mockRequirePermission: vi.fn(),
    mockLogAuditEvent: vi.fn(() => Promise.resolve()),
    mockGetUser: vi.fn(),
    mockUpdate: vi.fn(),
    state: {
      previous: null as { status: string } | null,
      updateError: null as { message: string } | null,
      updatedRows: [{ id: "res-1" }] as { id: string }[],
      updateFilters: [] as [string, unknown][],
    },
  }),
);

vi.mock("next/headers", () => ({ cookies: vi.fn(() => Promise.resolve({})) }));

vi.mock("@hotel/core/audit", () => ({
  AUDIT_ACTIONS: {
    RESERVATION_UPDATED: "reservation.updated",
    RESERVATION_CANCELLED: "reservation.cancelled",
  },
  AUDIT_ENTITIES: { RESERVATION: "reservation" },
}));

vi.mock("@hotel/core/audit/server", () => ({
  getAuditRequestContext: vi.fn(() => Promise.resolve({ ipAddress: null, userAgent: "ua" })),
  logAuditEvent: mockLogAuditEvent,
}));

vi.mock("@hotel/core/auth", () => ({
  getVerifiedSession: async () => ({ session: null, user: await mockGetUser() }),
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
  const updateChain = {
    eq: (column: string, value: unknown) => {
      state.updateFilters.push([column, value]);
      return updateChain;
    },
    select: () => Promise.resolve({ data: state.updatedRows, error: state.updateError }),
  };
  return {
    createSupabaseServiceClient: () => ({
      from: () => ({
        select: () => select,
        update: (data: unknown) => {
          mockUpdate(data);
          return updateChain;
        },
      }),
    }),
  };
});

beforeEach(() => {
  mockRequirePermission.mockReset().mockResolvedValue(undefined);
  mockLogAuditEvent.mockClear();
  mockUpdate.mockClear();
  mockGetUser.mockResolvedValue({ id: "admin-1", email: "admin@hotel.local" });
  state.previous = { status: "pending" };
  state.updateError = null;
  state.updatedRows = [{ id: "res-1" }];
  state.updateFilters = [];
});

describe("updateReservationStatus audit (A3.4)", () => {
  it("records an approval as reservation.updated with from/to and the real actor", async () => {
    await updateReservationStatus("res-1", "approved");

    expect(mockLogAuditEvent).toHaveBeenCalledWith({
      actorId: "admin-1",
      actorEmail: "admin@hotel.local",
      action: "reservation.updated",
      entity: "reservation",
      entityId: "res-1",
      metadata: { from: "pending", to: "approved" },
      ipAddress: null,
      userAgent: "ua",
    });
  });

  it("records a cancellation as reservation.cancelled with its reason", async () => {
    await updateReservationStatus("res-1", "cancelled", "guest request");

    expect(mockLogAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "reservation.cancelled",
        metadata: { from: "pending", to: "cancelled", cancellation_reason: "guest request" },
      }),
    );
  });

  it("does not log when the caller lacks reservations:edit", async () => {
    mockRequirePermission.mockRejectedValue(new PermissionDeniedError("reservations:edit"));

    await expect(updateReservationStatus("res-1", "approved")).rejects.toBeInstanceOf(
      PermissionDeniedError,
    );
    expect(mockLogAuditEvent).not.toHaveBeenCalled();
  });

  it("does not log when the update fails", async () => {
    state.updateError = { message: "boom" };

    await expect(updateReservationStatus("res-1", "approved")).rejects.toThrow();
    expect(mockLogAuditEvent).not.toHaveBeenCalled();
  });

  it("rejects an unknown reservation id without updating or logging", async () => {
    state.previous = null;

    await expect(updateReservationStatus("missing", "approved")).rejects.toBeInstanceOf(
      ReservationNotFoundError,
    );
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockLogAuditEvent).not.toHaveBeenCalled();
  });
});

describe("updateReservationStatus state machine (OP-R05)", () => {
  it.each([
    ["pending", "approved"],
    ["pending", "cancelled"],
    ["approved", "completed"],
    ["approved", "cancelled"],
  ])("allows %s → %s", async (from, to) => {
    state.previous = { status: from };

    await updateReservationStatus("res-1", to as "approved", "reason");
    expect(mockUpdate).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["cancelled", "approved"],
    ["cancelled", "pending"],
    ["completed", "pending"],
    ["completed", "cancelled"],
    ["pending", "completed"],
    ["approved", "pending"],
    ["pending", "pending"],
  ])("rejects %s → %s before the UPDATE (PoC: replayed Server Action)", async (from, to) => {
    state.previous = { status: from };

    await expect(updateReservationStatus("res-1", to as "approved")).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    );
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockLogAuditEvent).not.toHaveBeenCalled();
  });

  it("rejects a status outside the enum sent by a forged request", async () => {
    await expect(
      updateReservationStatus("res-1", "refunded" as unknown as "approved"),
    ).rejects.toBeInstanceOf(InvalidStatusTransitionError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("only updates the row while it still has the status that was validated", async () => {
    await updateReservationStatus("res-1", "approved");

    expect(state.updateFilters).toContainEqual(["status", "pending"]);
  });

  it("rejects the change when the status moved in between (no row matched)", async () => {
    state.updatedRows = [];

    await expect(updateReservationStatus("res-1", "approved")).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    );
    expect(mockLogAuditEvent).not.toHaveBeenCalled();
  });
});
