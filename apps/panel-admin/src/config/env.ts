import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.url(),
});

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const ENV = Object.freeze(parsedEnv);
