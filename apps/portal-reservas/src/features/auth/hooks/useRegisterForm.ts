"use client";

import { useActionState, useState } from "react";
import { REGISTER_FIELDS, type RegisterField } from "@/features/auth/constants/fields";
import { registerAction } from "@/features/auth/services/signUp-action";

export const useRegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getFieldError = (field: RegisterField) =>
    state && "fieldErrors" in state ? state.fieldErrors[field]?.[0] : undefined;

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return {
    formAction,
    isPending,
    showPassword,
    showConfirmPassword,
    handleTogglePassword,
    handleToggleConfirmPassword,
    fullNameError: getFieldError(REGISTER_FIELDS.FULL_NAME),
    emailError: getFieldError(REGISTER_FIELDS.EMAIL),
    passwordError: getFieldError(REGISTER_FIELDS.PASSWORD),
    confirmPasswordError: getFieldError(REGISTER_FIELDS.CONFIRM_PASSWORD),
    globalError: state && "error" in state ? state.error : undefined,
  };
};
