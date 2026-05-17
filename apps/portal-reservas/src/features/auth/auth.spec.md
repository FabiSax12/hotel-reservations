# Feature Specification: Authentication

**Status:** scaffolded (Phase 0 — UI skeleton only)
**Version:** 1.1
**Depends on:** `@hotel/ui` (Button, form elements), `@hotel/i18n`

---

## 1. Objective

Provide the UI and client-side validation layer for user registration, login, and email verification workflows. Backend integration (session management, JWT, OAuth) is explicitly deferred and will be plugged in when the authentication provider is chosen.

---

## 2. Scope & Boundaries

### In Scope (Phase 0 — current)
* Route scaffolding: `/auth/login`, `/auth/register`, `/auth/verify-email`, `/auth/error`, `/auth/callback`.
* UI forms: `RegisterForm`, `LoginForm` (inputs, labels, submit buttons).
* Client-side validation hooks: `useRegisterForm`, `useLoginForm`.
* i18n: all visible auth strings in `auth.texts.ts`, type-safe via `AuthTexts`.
* Error display: `aria-live="polite"` error messages below each field.

### In Scope (Phase 1 — future, not yet started)
* Integration with authentication provider (NextAuth.js v5 or Supabase Auth — TBD).
* Server Actions for `signUp`, `signIn`, `signOut`.
* Middleware-based route protection (`middleware.ts`).
* Session-aware header: user avatar + dropdown in `HeaderNav`.

### Out of Scope (Do Not Modify)
* Do not implement JWT, session cookies, or OAuth flows until the auth provider is chosen.
* Do not connect forms to any real backend endpoints.
* Do not touch `features/layout` — user-aware header changes belong in layout feature scope.

---

## 3. Architecture & Context

### File Map
```
features/auth/
├── components/
│   ├── RegisterForm.tsx
│   └── LoginForm.tsx
├── hooks/
│   ├── useRegisterForm.ts
│   └── useLoginForm.ts
├── services/
│   └── signUp-action.ts    (stub)
├── i18n/
│   ├── auth.texts.ts
│   └── authTexts.type.ts
└── auth.spec.md

app/auth/
├── login/page.tsx
├── register/page.tsx
├── verify-email/page.tsx
├── error/page.tsx
└── callback/page.tsx
```

### System Constraints & Known Pitfalls
* All forms must use `<label htmlFor="...">` paired with `<input id="...">` — no placeholder-only labeling.
* Password fields must never log or expose their value; hooks extract validity only.
* Validation must trigger on `blur` (per-field) and on submit (full form).
* The `signUp-action.ts` stub should `throw new Error('Not implemented')` to make the integration gap obvious.

---

## 4. Acceptance Criteria

### Phase 0 (UI Scaffold)
* [x] Route structure exists (`/auth/login`, `/auth/register`, etc.).
* [ ] `RegisterForm` renders labeled inputs: email, password, confirm-password, full-name.
* [ ] `LoginForm` renders labeled inputs: email, password, plus a "Forgot password?" link.
* [ ] Client validation: required fields, email regex, min 8-char password, matching confirmation.
* [ ] Validation errors display inline with `role="alert"` and `aria-live="polite"`.
* [ ] All visible text uses `t.AUTH.*` from `useI18n()` — zero hardcoded strings.
* [ ] Submit button shows loading state (disabled + spinner icon) while async action is pending.

### Phase 1 (Backend Integration) — Future
* [ ] `signUp-action.ts` implements registration via chosen auth provider.
* [ ] Session state is accessible from `HeaderNav` for authenticated user controls.
* [ ] `middleware.ts` protects booking routes; redirects unauthenticated users to `/auth/login`.

---

## 5. Handoff & Status Notes

* **Current State:** Routes scaffolded. Form components exist as placeholders. No validation logic implemented.
* **Next Step:** Implement `RegisterForm` + `LoginForm` UI and their validation hooks. Choose auth provider before Phase 1.
