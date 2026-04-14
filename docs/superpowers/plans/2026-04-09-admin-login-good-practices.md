# Admin Login — Good Practices Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the admin login flow to comply with GOOD_PRACTICES.md — feature-based folder structure, route constants, single responsibility, typed components, and pure domain functions.

**Architecture:** Extract UI into `features/auth/components/LoginForm`, move server action to `features/auth/services/loginAction`, isolate pure validation into `features/auth/domain/credentials`. App Router pages become thin wrappers that compose feature components.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, HeroUI, Vitest (to be added), Supabase SSR.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `apps/panel-admin/src/config/routes.ts` | App-wide frozen route constants |
| Create | `packages/core/src/auth/config/constants.ts` | Auth role, table, and column constants |
| Modify | `packages/core/src/auth/index.ts` | Replace magic strings with constants |
| Create | `apps/panel-admin/vitest.config.ts` | Vitest config for domain unit tests |
| Create | `apps/panel-admin/src/features/auth/domain/credentials.ts` | Pure email/password validators |
| Create | `apps/panel-admin/src/features/auth/domain/credentials.test.ts` | Unit tests for validators |
| Create | `apps/panel-admin/src/features/auth/components/LoginForm.tsx` | Client Component — UI only |
| Create | `apps/panel-admin/src/features/auth/services/loginAction.ts` | Server Action — I/O only |
| Modify | `apps/panel-admin/src/app/admin/login/page.tsx` | Thin Server Component (~5 lines) |
| Modify | `apps/panel-admin/src/middleware.ts` | Use ROUTES, remove console.log |
| Delete | `apps/panel-admin/src/app/admin/login/actions.ts` | Replaced by services/loginAction.ts |

---

## Task 1: Route constants

**Files:**
- Create: `apps/panel-admin/src/config/routes.ts`

- [ ] **Step 1: Create the file**

```ts
// apps/panel-admin/src/config/routes.ts
export const ROUTES = Object.freeze({
  ADMIN: Object.freeze({
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
  }),
})
```

- [ ] **Step 2: Update middleware to use ROUTES and remove console.log**

Replace the full content of `apps/panel-admin/src/middleware.ts`:

```ts
import { createSupabaseServerClient } from "@hotel/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTES } from "@/config/routes";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createSupabaseServerClient({
    getAll: () => request.cookies.getAll(),
    set: (name, value, options) => response.cookies.set(name, value, options),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === ROUTES.ADMIN.LOGIN;

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN.LOGIN, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 3: Commit**

```bash
git add apps/panel-admin/src/config/routes.ts apps/panel-admin/src/middleware.ts
git commit -m "refactor(middleware): use ROUTES constants, remove console.log"
```

---

## Task 2: Auth constants in @hotel/core

**Files:**
- Create: `packages/core/src/auth/config/constants.ts`
- Modify: `packages/core/src/auth/index.ts`

- [ ] **Step 1: Create the constants file**

```ts
// packages/core/src/auth/config/constants.ts
export const AUTH_ROLES = Object.freeze({
  ADMIN: "admin",
} as const)

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES]

export const AUTH_TABLE = "users" as const

export const AUTH_COLUMNS = Object.freeze({
  ID: "id",
  EMAIL: "email",
  ROLE: "role",
  IS_ACTIVE: "is_active",
} as const)
```

- [ ] **Step 2: Update auth/index.ts to use the new constants**

Replace the full content of `packages/core/src/auth/index.ts`:

```ts
import { createSupabaseClient, createSupabaseServiceClient } from "@hotel/db";
import type { AdminUser } from "@hotel/db/types";
import { AUTH_COLUMNS, AUTH_ROLES, AUTH_TABLE } from "./config/constants";

export async function signInWithPassword(email: string, password: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const supabase = createSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getSession() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data;
}

export async function verifyAdminRole(userId: string): Promise<AdminUser | null> {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from(AUTH_TABLE)
    .select(
      `${AUTH_COLUMNS.ID}, ${AUTH_COLUMNS.EMAIL}, ${AUTH_COLUMNS.ROLE}, ${AUTH_COLUMNS.IS_ACTIVE}`
    )
    .eq(AUTH_COLUMNS.ID, userId)
    .single();

  if (error) throw new Error(error.message);

  if (data.role === AUTH_ROLES.ADMIN && data.is_active) {
    return data as AdminUser;
  }

  return null;
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/auth/config/constants.ts packages/core/src/auth/index.ts
git commit -m "refactor(core/auth): replace magic strings with typed constants"
```

---

## Task 3: Domain validation layer (TDD)

**Files:**
- Create: `apps/panel-admin/vitest.config.ts`
- Create: `apps/panel-admin/src/features/auth/domain/credentials.ts`
- Create: `apps/panel-admin/src/features/auth/domain/credentials.test.ts`

> Vitest is not yet installed. The first two steps add it.

- [ ] **Step 1: Add Vitest as dev dependency**

```bash
cd apps/panel-admin && pnpm add -D vitest
```

- [ ] **Step 2: Create vitest config**

```ts
// apps/panel-admin/vitest.config.ts
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

- [ ] **Step 3: Write the failing tests first**

```ts
// apps/panel-admin/src/features/auth/domain/credentials.test.ts
import { describe, expect, it } from "vitest"
import { validateEmail, validatePassword } from "./credentials"

describe("validateEmail", () => {
  it("returns null for a valid email", () => {
    expect(validateEmail("admin@hotel.com")).toBeNull()
  })

  it("returns an error string for an email without @", () => {
    expect(validateEmail("notanemail")).toBe("Please enter a valid email address")
  })

  it("returns an error string for an email without domain", () => {
    expect(validateEmail("admin@")).toBe("Please enter a valid email address")
  })

  it("returns an error string for an empty string", () => {
    expect(validateEmail("")).toBe("Please enter a valid email address")
  })
})

describe("validatePassword", () => {
  it("returns null for a password with 8 characters", () => {
    expect(validatePassword("12345678")).toBeNull()
  })

  it("returns null for a password longer than 8 characters", () => {
    expect(validatePassword("averylongpassword")).toBeNull()
  })

  it("returns an error string for a password shorter than 8 characters", () => {
    expect(validatePassword("1234567")).toBe("La contraseña debe tener al menos 8 caracteres")
  })

  it("returns an error string for an empty password", () => {
    expect(validatePassword("")).toBe("La contraseña debe tener al menos 8 caracteres")
  })
})
```

- [ ] **Step 4: Run tests — expect FAIL (function not found)**

```bash
cd apps/panel-admin && pnpm vitest run src/features/auth/domain/credentials.test.ts
```

Expected: `Error: Cannot find module './credentials'`

- [ ] **Step 5: Implement the pure validation functions**

> Also export `LoginActionState` here — it's a domain type used by both the component and the service layer. Defining it here avoids a cross-layer type import.

```ts
// apps/panel-admin/src/features/auth/domain/credentials.ts
export type LoginActionState = { error: string } | null

export const validateEmail = (value: string): string | null => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Please enter a valid email address"
  }
  return null
}

export const validatePassword = (value: string): string | null => {
  if (value.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres"
  }
  return null
}
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
cd apps/panel-admin && pnpm vitest run src/features/auth/domain/credentials.test.ts
```

Expected: `8 passed`

- [ ] **Step 7: Commit**

```bash
git add apps/panel-admin/vitest.config.ts apps/panel-admin/src/features/auth/domain/
git commit -m "feat(auth/domain): add pure credential validators with Vitest tests"
```

---

## Task 4: LoginForm component

**Files:**
- Create: `apps/panel-admin/src/features/auth/components/LoginForm.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/panel-admin/src/features/auth/components/LoginForm.tsx
"use client"

import { validateEmail, validatePassword } from "@/features/auth/domain/credentials"
import type { LoginActionState } from "@/features/auth/domain/credentials"
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react"
import { useActionState } from "react"

interface LoginFormProps {
  action: (prevState: LoginActionState, formData: FormData) => Promise<LoginActionState>
}

export const LoginForm = ({ action }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(
    action,
    null
  )

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
  )
}
```

> Note: `LoginActionState` is imported from `domain/credentials` — both the component and the service layer consume this domain type. No circular dependency.

- [ ] **Step 2: Commit**

```bash
git add apps/panel-admin/src/features/auth/components/LoginForm.tsx
git commit -m "feat(auth/components): add LoginForm component with typed props and a11y fixes"
```

---

## Task 5: Server action (service layer)

**Files:**
- Create: `apps/panel-admin/src/features/auth/services/loginAction.ts`

- [ ] **Step 1: Create the server action**

```ts
// apps/panel-admin/src/features/auth/services/loginAction.ts
"use server"

import { verifyAdminRole } from "@hotel/core/auth"
import { createSupabaseServerClient } from "@hotel/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ROUTES } from "@/config/routes"
import type { LoginActionState } from "@/features/auth/domain/credentials"

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const cookieStore = await cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    return { error: "Credenciales inválidas" }
  }

  const admin = await verifyAdminRole(data.user.id)

  if (!admin) {
    await supabase.auth.signOut()
    return { error: "Acceso denegado" }
  }

  redirect(ROUTES.ADMIN.DASHBOARD)
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/panel-admin/src/features/auth/services/loginAction.ts
git commit -m "feat(auth/services): add loginAction server action using ROUTES constants"
```

---

## Task 6: Thin page + cleanup

**Files:**
- Modify: `apps/panel-admin/src/app/admin/login/page.tsx`
- Delete: `apps/panel-admin/src/app/admin/login/actions.ts`

- [ ] **Step 1: Replace login page with thin Server Component**

Replace the full content of `apps/panel-admin/src/app/admin/login/page.tsx`:

```tsx
// apps/panel-admin/src/app/admin/login/page.tsx
import { LoginForm } from "@/features/auth/components/LoginForm"
import { loginAction } from "@/features/auth/services/loginAction"

export default function LoginPage() {
  return <LoginForm action={loginAction} />
}
```

- [ ] **Step 2: Delete the old actions file**

```bash
rm apps/panel-admin/src/app/admin/login/actions.ts
```

- [ ] **Step 3: Verify no remaining imports of the deleted file**

```bash
grep -r "from.*admin/login/actions" apps/panel-admin/src/
```

Expected: no output (zero matches).

- [ ] **Step 4: Commit**

```bash
git add apps/panel-admin/src/app/admin/login/page.tsx
git rm apps/panel-admin/src/app/admin/login/actions.ts
git commit -m "refactor(auth): thin login page, remove old actions file"
```

---

## Self-Review Checklist

After all tasks are complete, verify:

- [ ] `config/routes.ts` — `ROUTES.ADMIN.LOGIN` and `ROUTES.ADMIN.DASHBOARD` exist and are frozen
- [ ] `middleware.ts` — zero hardcoded strings, zero `console.log`
- [ ] `packages/core/src/auth/index.ts` — zero magic string literals (`"admin"`, `"users"`, `"role"`, `"is_active"`)
- [ ] `credentials.ts` — zero JSX, zero imports from React or Next.js
- [ ] `LoginForm.tsx` — has `LoginFormProps` interface, `role="alert"` on error, `htmlFor` on labels
- [ ] `loginAction.ts` — uses `ROUTES.ADMIN.DASHBOARD`, no hardcoded paths
- [ ] `app/admin/login/page.tsx` — no `"use client"`, no `useActionState`, ≤6 lines
- [ ] `app/admin/login/actions.ts` — deleted, not referenced anywhere
- [ ] All 8 Vitest tests pass
