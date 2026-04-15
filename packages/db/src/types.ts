// Auto-generated types will go in database.types.ts via `pnpm generate-types`
// Re-export and extend them here

export type { Database } from "./database.types";

export type AdminUser = {
  id: string;
  email: string;
  role: "admin";
  is_active: boolean;
};

export type ClientUser = {
  id: string;
  email: string;
  role: "client";
  is_active: boolean;
  created_at: string;
};

export type UserProfile = AdminUser | ClientUser;

export type SignUpPayload = {
  email: string;
  password: string;
};
