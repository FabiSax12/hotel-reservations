import type { AdminUser, User } from "@hotel/db";
import type { Session } from "@supabase/supabase-js";

export type AuthContextValue = {
  session: Session | null;
  user: Session["user"] | null;
  profile: AdminUser | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
