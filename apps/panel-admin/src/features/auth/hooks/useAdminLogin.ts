import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { LOGIN_FORM_ERROR_KEYS } from "../constants/loginFormErrorKeys";
import { LOGIN_FORM_SEARCH_PARAMS } from "../constants/loginFormSearchParams";
import type { LoginActionState, LoginErrorKey } from "../domain/credentials";

export const useAdminLogin = (
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>,
) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(action, null);
  const searchParams = useSearchParams();

  const urlError = searchParams.get(LOGIN_FORM_SEARCH_PARAMS.ERROR);
  const urlErrorKey: LoginErrorKey | null =
    urlError && Object.keys(LOGIN_FORM_ERROR_KEYS).includes(urlError)
      ? (urlError as LoginErrorKey)
      : null;

  const activeError = state?.error ?? urlErrorKey;

  return {
    formAction,
    isPending,
    activeError,
  };
};
