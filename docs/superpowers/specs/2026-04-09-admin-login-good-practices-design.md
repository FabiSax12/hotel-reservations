# Design: Admin Login — Good Practices Refactor

**Date:** 2026-04-09  
**Branch:** feature/US-F-016-admin-login  
**Scope:** Apply GOOD_PRACTICES.md to the admin login flow (excluding i18n)

---

## Context

The admin login feature was implemented functionally but without applying the project's
architectural good practices. This refactor brings the code into compliance without changing
any behavior.

**Out of scope:**
- i18n / translation strings (separate branch)
- `packages/db/` internals
- Supabase client configuration
- Dashboard page (placeholder, no refactorable logic)

---

## Problems Being Solved

| File | Problem |
|---|---|
| `app/admin/login/page.tsx` | Mixes UI rendering with email validation logic (inline regex) |
| `app/admin/login/actions.ts` | Mixes authentication, authorization, and routing; magic strings |
| `middleware.ts` | Hardcoded route strings; `console.log` in production |
| `packages/core/src/auth/index.ts` | Magic strings: `"admin"`, `"users"`, `"role"`, `"is_active"` |

---

## Target Structure

```
apps/panel-admin/src/
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx              ← thin: imports LoginForm only (~5 lines)
│       └── dashboard/
│           └── page.tsx              ← unchanged
├── features/
│   └── auth/
│       ├── domain/
│       │   └── credentials.ts        ← pure validation functions (no JSX, no fetch, no hooks)
│       ├── components/
│       │   └── LoginForm.tsx         ← UI only; receives state + action as props
│       └── services/
│           └── loginAction.ts        ← 'use server'; calls @hotel/core; handles redirect
└── config/
    └── routes.ts                     ← ROUTES = Object.freeze({...})

packages/core/src/auth/
├── config/
│   └── constants.ts                  ← AUTH_ROLES, AUTH_TABLE, AUTH_COLUMNS
└── index.ts                          ← updated to use constants (no behavior change)
```

---

## Changes Per Section

### §1 — Folder Structure

- Create `features/auth/domain/`, `features/auth/components/`, `features/auth/services/`
- Move server action from `app/admin/login/actions.ts` → `features/auth/services/loginAction.ts`
- Extract `LoginForm` component from page → `features/auth/components/LoginForm.tsx`
- Thin out `app/admin/login/page.tsx` to ~5 lines (compose only)

### §2 — Constants

Create `apps/panel-admin/src/config/routes.ts`:
```ts
export const ROUTES = Object.freeze({
  ADMIN: Object.freeze({
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
  }),
})
```

Create `packages/core/src/auth/config/constants.ts`:
```ts
export const AUTH_ROLES = Object.freeze({ ADMIN: 'admin' } as const)
export const AUTH_TABLE = 'users'
export const AUTH_COLUMNS = Object.freeze({
  ID: 'id',
  EMAIL: 'email',
  ROLE: 'role',
  IS_ACTIVE: 'is_active',
} as const)
```

### §3 — Single Responsibility

| File | Single responsibility |
|---|---|
| `features/auth/domain/credentials.ts` | Pure validation: `validateEmail()`, `validatePassword()` |
| `features/auth/components/LoginForm.tsx` | Render form UI; no business logic |
| `features/auth/services/loginAction.ts` | Server action: I/O only (auth + redirect) |
| `app/admin/login/page.tsx` | Compose `LoginForm`; nothing else |

### §7 — Component Patterns

`LoginForm` receives explicit typed props:
```ts
interface LoginFormProps {
  state: LoginActionState
  action: (payload: FormData) => void
  isPending: boolean
}
```

### §8 — Pure Functions

`domain/credentials.ts` exports:
```ts
export const validateEmail = (email: string): string | null => { ... }
export const validatePassword = (password: string): string | null => { ... }
```

No JSX, no hooks, no fetch. Fully testable with Vitest.

### §10 — Separation of Concerns

- Remove inline regex from `LoginForm` JSX
- Use `validateEmail` / `validatePassword` from domain layer
- No logic inside JSX event handlers

### §11 — Accessibility

- Verify `<label htmlFor>` matches input `id` on all fields
- Verify error display uses `role="alert"`
- Verify submit button has `type="submit"` (not missing)

### §12 — Clean Code

- Remove `console.log` from `middleware.ts`
- Replace all hardcoded route strings in middleware with `ROUTES` constants

---

## What Does NOT Change

- Authentication behavior (Supabase calls remain identical)
- UI appearance (no visual changes)
- `packages/db/` (separate scope)
- All string literals in Spanish (i18n deferred)
- Error return shape from server action (keeps `{ error: string }`)

---

## Checklist

- [ ] `config/routes.ts` created with frozen ROUTES
- [ ] `packages/core/src/auth/config/constants.ts` created
- [ ] `packages/core/src/auth/index.ts` uses AUTH_ROLES / AUTH_TABLE / AUTH_COLUMNS
- [ ] `features/auth/domain/credentials.ts` created with pure validation
- [ ] `features/auth/components/LoginForm.tsx` created (UI only, typed props)
- [ ] `features/auth/services/loginAction.ts` created ('use server', uses ROUTES)
- [ ] `app/admin/login/page.tsx` thinned to compose-only
- [ ] `middleware.ts` uses ROUTES, no console.log
- [ ] All old files deleted / moved (no dead code)
