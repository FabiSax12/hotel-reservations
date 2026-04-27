import { useActionState, useEffect, useState } from "react";
import {
  REGISTER_FORM_FIELDS,
  type RegisterFormField,
} from "@/features/auth/constants/registerFormFields";
import { registerAction } from "@/features/auth/services/signUp-action";
import { checkPasswordCriteria } from "@/features/auth/utils/checkPasswordCriteria";
import { isPasswordValid } from "@/features/auth/utils/isPasswordValid";

export const useRegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Its necesary for logic
  useEffect(() => {
    setIsDirty(false);
  }, [state]);

  const criteria = checkPasswordCriteria(password);
  const isSubmitDisabled = password.length > 0 && !isPasswordValid(criteria);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    // markDirty();
  };

  const getFieldError = (field: RegisterFormField) =>
    !isDirty && !isPending && state && "fieldErrors" in state
      ? state.fieldErrors[field]?.[0]
      : undefined;

  const markDirty = () => setIsDirty(true);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return {
    formAction,
    isPending,
    showPassword,
    showConfirmPassword,
    handleTogglePassword,
    handleToggleConfirmPassword,
    password,
    handlePasswordChange,
    criteria,
    markDirty,
    isSubmitDisabled,
    fullNameError: getFieldError(REGISTER_FORM_FIELDS.FULL_NAME),
    emailError: getFieldError(REGISTER_FORM_FIELDS.EMAIL),
    passwordError: getFieldError(REGISTER_FORM_FIELDS.PASSWORD),
    confirmPasswordError: getFieldError(REGISTER_FORM_FIELDS.CONFIRM_PASSWORD),
    globalError: !isDirty && !isPending && state && "error" in state ? state.error : undefined,
  };
};
