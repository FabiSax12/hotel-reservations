export type CreateAdminSuccess = { success: true; email: string };
export type CreateAdminError = { error: "EMAIL_ALREADY_INVITED" | "UNKNOWN_ERROR" };
export type CreateAdminActionState = null | CreateAdminSuccess | CreateAdminError;
