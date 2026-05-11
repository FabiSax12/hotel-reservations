export interface Administrator {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface AdministratorsData {
  administrators: Administrator[];
  sessionUserId: string;
  totalCount:    number;
  page:          number;
  totalPages:    number;
}
