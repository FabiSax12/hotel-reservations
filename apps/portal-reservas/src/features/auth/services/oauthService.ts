import { createSupabaseClient } from "@hotel/db/client";
import { ROUTES } from "@/config/routes";
import { CALLBACK_SEARCH_PARAMS } from "../constants/callback-search-params";
import { EMPTY_STRING } from "../constants/common";
import { OAUTH_PROVIDERS } from "../constants/ui";

export const signInWithGoogle = async (callbackUrl: string = EMPTY_STRING): Promise<void> => {
  const supabase = createSupabaseClient();

  const searchParams = callbackUrl
    ? `?${CALLBACK_SEARCH_PARAMS.CALLBACK_URL}=${encodeURIComponent(callbackUrl)}`
    : EMPTY_STRING;

  const redirectTo = `${window.location.origin}${ROUTES.AUTH.CALLBACK}${searchParams}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: OAUTH_PROVIDERS.GOOGLE,
    options: { redirectTo },
  });

  if (error) {
    throw error;
  }
};
