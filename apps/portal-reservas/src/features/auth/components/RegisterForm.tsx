"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";

import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";

export const RegisterForm = () => {
  const {
    formAction,
    isPending,
    showPassword,
    showConfirmPassword,
    handleTogglePassword,
    handleToggleConfirmPassword,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    globalError,
  } = useRegisterForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Crear cuenta</h1>

        <Form action={formAction} className="flex flex-col gap-5">
          <TextField name="fullName" autoComplete="name" isInvalid={!!fullNameError} fullWidth>
            <Label>Nombre completo</Label>
            <Input placeholder="Juan Pérez" />
            {fullNameError && <FieldError>{fullNameError}</FieldError>}
          </TextField>

          <TextField
            name="email"
            type="email"
            autoComplete="email"
            isInvalid={!!emailError}
            fullWidth
          >
            <Label>Correo electrónico</Label>
            <Input placeholder="juan@ejemplo.com" />
            {emailError && <FieldError>{emailError}</FieldError>}
          </TextField>

          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            isInvalid={!!passwordError}
            fullWidth
          >
            <Label>Contraseña</Label>
            <div className="relative w-full">
              <Input placeholder="Mínimo 8 caracteres" className="pr-10" />
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onPress={handleTogglePassword}
                className="absolute inset-y-0 right-0 h-full"
              >
                {showPassword ? "🙈" : "👁"}
              </Button>
            </div>
            {passwordError && <FieldError>{passwordError}</FieldError>}
          </TextField>

          <TextField
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            isInvalid={!!confirmPasswordError}
            fullWidth
          >
            <Label>Confirmar contraseña</Label>
            <div className="relative w-full">
              <Input placeholder="Repetí tu contraseña" className="pr-10" />
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación de contraseña"
                    : "Mostrar confirmación de contraseña"
                }
                onPress={handleToggleConfirmPassword}
                className="absolute inset-y-0 right-0 h-full"
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </Button>
            </div>
            {confirmPasswordError && <FieldError>{confirmPasswordError}</FieldError>}
          </TextField>

          {globalError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {globalError}
            </p>
          )}

          <Button type="submit" variant="primary" fullWidth isPending={isPending} className="mt-1">
            {isPending ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
