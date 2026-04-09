"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useActionState } from "react";
import { loginAction } from "./actions";

type ActionState = { error: string } | null;

export default function LoginPage() {
  const [state, action, isPending] = useActionState<ActionState, FormData>(loginAction, null);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Panel de Administración</h1>

        <Form className="flex flex-col gap-4" action={action}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" autoComplete="email" />
            <FieldError />
          </TextField>
          <TextField isRequired minLength={8} name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter your password" autoComplete="current-password" />
            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>

          {state?.error && (
            <p className="text-danger bg-danger-soft border border-danger py-2 px-3 rounded-md text-sm">
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
}
