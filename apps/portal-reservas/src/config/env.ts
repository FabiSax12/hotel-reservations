export const ENV = Object.freeze({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001",
} as const);
