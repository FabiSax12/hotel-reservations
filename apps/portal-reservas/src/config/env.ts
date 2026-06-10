/**
 * Centralized environment variables for portal-reservas.
 *
 * All env access goes through this frozen object — zero `process.env` inline.
 * Falls back to localhost:3001 (the portal-reservas default port).
 */
export const ENV = Object.freeze({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001",
  /**
   * Stripe TEST secret key (server-only — never exposed to the client).
   * Set it in `.env.local` as `STRIPE_SECRET_KEY=sk_test_...`. When empty, the
   * checkout route falls back to a self-contained mock gateway so the flow stays
   * demoable without credentials.
   */
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
} as const);
