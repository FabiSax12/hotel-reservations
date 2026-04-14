"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useActionState } from "react";
import type { LoginActionState } from "@/features/auth/domain/credentials";
import { validateEmail, validatePassword } from "@/features/auth/domain/credentials";

interface LoginFormProps {
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>;
}

export const LoginForm = ({ action }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(action, null);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Panel de Administración</h1>

        <Form className="flex flex-col gap-4" action={formAction}>
          <TextField isRequired name="email" type="email" validate={validateEmail}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john@example.com" autoComplete="email" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password" validate={validatePassword}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <Description>Must be at least 8 characters</Description>
            <FieldError />
          </TextField>

          {state?.error && (
            <p
              role="alert"
              className="text-danger bg-danger-soft border border-danger py-2 px-3 rounded-md text-sm"
            >
              {state.error}
            </p>
          )}

          <Button type="submit" isDisabled={isPending} fullWidth>
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </main>
  );
};
