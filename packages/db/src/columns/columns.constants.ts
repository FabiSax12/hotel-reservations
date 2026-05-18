import type { Database } from "../database.types";
import type { DBTablesWithColumns } from "./columns.types";

export const DB_COLUMNS: DBTablesWithColumns = {
  cms_content: {
    id: "id",
    locale: "locale",
    section: "section",
    content: "content",
    updated_at: "updated_at",
  },
  pending_invitations: {
    accepted_at: "accepted_at",
    created_at: "created_at",
    email: "email",
    expires_at: "expires_at",
    id: "id",
    invited_by: "invited_by",
    revoked_at: "revoked_at",
    revoked_by: "revoked_by",
    status: "status",
    user_id: "user_id",
  },
  profiles: {
    full_name: "full_name",
    id: "id",
    is_active: "is_active",
  },
  reservations: {
    id: "id",
    code: "code",
    user_id: "user_id",
    guest_name: "guest_name",
    guest_email: "guest_email",
    guest_phone: "guest_phone",
    room_id: "room_id",
    check_in: "check_in",
    check_out: "check_out",
    adults: "adults",
    children: "children",
    pets: "pets",
    price_per_night: "price_per_night",
    total_amount: "total_amount",
    currency: "currency",
    status: "status",
    cancellation_reason: "cancellation_reason",
    created_at: "created_at",
    updated_at: "updated_at",
  },
  rooms: {
    capacity_adults: "capacity_adults",
    capacity_kids: "capacity_kids",
    category: "category",
    created_at: "created_at",
    description: "description",
    high_season_fee: "high_season_fee",
    id: "id",
    is_active: "is_active",
    is_pet_friendly: "is_pet_friendly",
    name: "name",
    regular_fee: "regular_fee",
    updated_at: "updated_at",
  },
  user_roles: {
    role: "role",
    user_id: "user_id",
  },
} as const;

type _AssertAllColumnsCovered = {
  [Table in keyof Database["public"]["Tables"]]: keyof Database["public"]["Tables"][Table]["Row"] extends keyof (typeof DB_COLUMNS)[Table]
    ? true
    : never;
};

const _assertAllColumnsCovered: _AssertAllColumnsCovered = {
  cms_content: true,
  pending_invitations: true,
  profiles: true,
  reservations: true,
  rooms: true,
  user_roles: true,
};
