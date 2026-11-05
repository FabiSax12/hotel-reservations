import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockRequirePermission, calls } = vi.hoisted(() => ({
  mockRequirePermission: vi.fn(),
  calls: [] as { method: string; args: unknown[] }[],
}));

vi.mock("@/shared/auth/requirePermission", () => ({
  requirePermission: mockRequirePermission,
}));

vi.mock("@hotel/db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@hotel/db")>();
  const builder: Record<string, unknown> = {};
  for (const method of ["select", "or", "order"]) {
    builder[method] = (...args: unknown[]) => {
      calls.push({ method, args });
      return builder;
    };
  }
  // order() resolves the query in this service.
  builder.order = (...args: unknown[]) => {
    calls.push({ method: "order", args });
    return Promise.resolve({ data: [], error: null });
  };
  return {
    ...actual,
    createSupabaseServiceClient: () => ({ from: () => builder }),
  };
});

const { searchInvitations } = await import("@/features/invitations/services/searchInvitations");

describe("searchInvitations (J2-POC-10, A03 - vulnerabilidad introducida)", () => {
  beforeEach(() => {
    calls.length = 0;
    mockRequirePermission.mockResolvedValue(undefined);
  });

  it("requires admins:invite before querying", async () => {
    mockRequirePermission.mockRejectedValue(new Error("Permission denied: admins:invite"));

    await expect(searchInvitations("x")).rejects.toThrow("admins:invite");
    expect(calls).toHaveLength(0);
  });

  it("lets an attacker-controlled comma add an always-true OR condition", async () => {
    // Payload verificado en vivo contra Supabase local (ver
    // users/evidencias/J2-POC-10-A03-filter-injection.txt): 0 filas de control
    // vs. el 100% de la tabla con este mismo valor de `search`.
    const payload = 'nope,email.neq.""';
    await searchInvitations(payload);

    const orArg = String(calls.find((c) => c.method === "or")?.args[0]);
    // Se espera (en una versión segura) que el valor del usuario quede
    // confinado a UN solo campo ilike, sin que una coma pueda agregar una
    // tercera condición OR. Hoy (vulnerable) el string trae 4 cláusulas:
    // 2 ilike legítimas partidas en 2 por la coma inyectada + email.neq("").
    expect(orArg.split(",")).toHaveLength(4);
    expect(orArg).toContain('email.neq.""');
  });
});
