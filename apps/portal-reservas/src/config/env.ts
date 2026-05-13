/**
 * Centralized environment variables for portal-reservas.
 *
 * All env access goes through this frozen object — zero `process.env` inline.
 * Falls back to localhost:3001 (the portal-reservas default port).
 */
export const ENV = Object.freeze({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001",
} as const);
