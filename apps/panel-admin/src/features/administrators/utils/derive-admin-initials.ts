import { ADMIN_INITIALS_LENGTH } from "../constants/administrators.constants";

/** Derives display initials from an admin email (characters before the @). */
export function deriveAdminInitials(email: string): string {
  return email.split("@")[0].slice(0, ADMIN_INITIALS_LENGTH).toUpperCase();
}
