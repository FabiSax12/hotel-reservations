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

describe("searchInvitations", () => {
  beforeEach(() => {
    calls.length = 0;
    mockRequirePermission.mockResolvedValue(undefined);
  });

  it("requires admins:invite before querying", async () => {
    mockRequirePermission.mockRejectedValue(new Error("Permission denied: admins:invite"));

    await expect(searchInvitations("x")).rejects.toThrow("admins:invite");
    expect(calls).toHaveLength(0);
  });

  it("does not let the search payload add filter conditions (J2-POC-10)", async () => {
    // Mismo payload que inyectaba antes del parche (ver
    // users/evidencias/J2-POC-10-A03-filter-injection.txt): la coma y las
    // comillas ahora se eliminan por el allowlist de `sanitizeInvitationsSearch`
    // antes de llegar al `.or()`.
    const payload = 'nope,email.neq.""';
    await searchInvitations(payload);

    const orArg = String(calls.find((c) => c.method === "or")?.args[0]);
    // Exactamente 2 condiciones (una coma, la que separa los dos ilike legítimos),
    // sin comillas ni paréntesis, y cada condición matcheando solo el campo email.
    expect(orArg.split(",")).toHaveLength(2);
    expect(orArg).not.toContain('"');
    const [prefixCondition, containsCondition] = orArg.split(",");
    expect(prefixCondition).toMatch(/^email\.ilike\.[^%]*%$/);
    expect(containsCondition).toMatch(/^email\.ilike\.%[^%]*%$/);
    expect(orArg).not.toMatch(/[()"\\]/);
  });

  it("strips characters outside the allowlist from the search term", async () => {
    await searchInvitations('a"b\\c(d)e%f');

    const orArg = String(calls.find((c) => c.method === "or")?.args[0]);
    expect(orArg).toBe("email.ilike.abcdef%,email.ilike.%abcdef%");
  });
});
