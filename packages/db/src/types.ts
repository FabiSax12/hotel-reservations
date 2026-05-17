// Auto-generated types will go in database.types.ts via `pnpm generate-types`
// Re-export and extend them here

import type { Database } from "./database.types";

export interface AdminProfile {
  id: string;
  is_active: boolean;
  full_name: string | null;
}

export interface ClientProfile {
  id: string;
  is_active: boolean;
  full_name: string | null;
}

export type UserProfile = AdminProfile | ClientProfile;

export interface AdminUser extends AdminProfile {
  role: "admin";
}

export interface ClientUser extends ClientProfile {
  role: "client";
}

export type User = AdminUser | ClientUser;

export type SignUpPayload = {
  email: string;
  password: string;
};

export type AdminsList = Database["public"]["Functions"]["get_admins"]["Returns"];

export interface PendingInvitation {
  id: string;
  email: string;
  invited_by: string | null;
  user_id: string | null;
  status: "pending" | "accepted" | "revoked" | "expired";
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
  revoked_at: string | null;
  revoked_by: string | null;
}
