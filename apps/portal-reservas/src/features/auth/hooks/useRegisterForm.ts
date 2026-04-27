import { useActionState, useEffect, useState } from "react";
import { REGISTER_FIELDS, type RegisterField } from "@/features/auth/constants/fields";
import { registerAction } from "@/features/auth/services/signUp-action";
import { checkPasswordCriteria } from "@/features/auth/utils/checkPasswordCriteria";
import { isPasswordValid } from "@/features/auth/utils/isPasswordValid";

export const useRegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(false);
  }, [state]);

  const criteria = checkPasswordCriteria(password);
  const isSubmitDisabled = password.length > 0 && !isPasswordValid(criteria);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    // markDirty();
  };

  const getFieldError = (field: RegisterField) =>
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
    fullNameError: getFieldError(REGISTER_FIELDS.FULL_NAME),
    emailError: getFieldError(REGISTER_FIELDS.EMAIL),
    passwordError: getFieldError(REGISTER_FIELDS.PASSWORD),
    confirmPasswordError: getFieldError(REGISTER_FIELDS.CONFIRM_PASSWORD),
    globalError: !isDirty && !isPending && state && "error" in state ? state.error : undefined,
  };
};
