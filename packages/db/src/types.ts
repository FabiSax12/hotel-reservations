// Auto-generated types will go in database.types.ts via `pnpm generate-types`
// Re-export and extend them here

export type { Database } from "./database.types";

export type AdminUser = {
  id: string;
  email: string;
  role: "admin";
  is_active: boolean;
};
