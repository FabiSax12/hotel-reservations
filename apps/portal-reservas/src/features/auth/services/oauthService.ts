import { createSupabaseClient } from "@hotel/db/client";
import { ROUTES } from "@/config/routes";

export const signInWithGoogle = async (callbackUrl: string = ""): Promise<void> => {
  const supabase = createSupabaseClient();
  const searchParams = callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : "";
  const redirectTo = `${window.location.origin}${ROUTES.AUTH.CALLBACK}${searchParams}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    throw error;
  }
};
