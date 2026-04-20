# Login Feature — Portal de Reservas

## User Story

> Como cliente registrado y con correo verificado, quiero iniciar sesión con mi correo y contraseña,
> para acceder a mi portal personal y realizar reservaciones.

## Acceptance Criteria

1. Formulario con campos **correo** y **contraseña**.
2. Errores específicos por caso: credenciales inválidas, cuenta no verificada.
3. Tras login exitoso, si el usuario provino del flujo de reserva, redirigirlo al paso final de pago conservando fechas y datos (`callbackUrl`).
4. No revelar si el correo existe cuando la contraseña es incorrecta → mensaje genérico de **credenciales inválidas**.

---

## File Structure

```
features/auth/
├── components/
│   ├── RegisterForm.tsx         ← existing (register)
│   └── LoginForm.tsx            ← NEW (this feature)
├── constants/
│   ├── errors.ts                ← MODIFY (add login error keys)
│   ├── fields.ts                ← MODIFY (add LOGIN_FIELDS)
│   └── callback-search-params.ts ← existing
├── domain/
│   ├── credentials.ts           ← NEW (pure validators)
│   └── credentials.test.ts      ← NEW (unit tests)
├── hooks/
│   ├── useRegisterForm.ts       ← existing (register)
│   └── useLoginForm.ts          ← NEW (this feature)
├── services/
│   ├── signUp-action.ts         ← existing (register)
│   └── loginAction.ts           ← NEW (server action)
├── i18n/
│   ├── auth.texts.ts            ← MODIFY (add LOGIN namespace + new error keys)
│   └── authTexts.type.ts        ← MODIFY (add LOGIN type + new error keys)
└── LOGIN_FEATURE.md             ← this file

app/auth/login/
└── page.tsx                     ← NEW (route page)
```

---

## Layer Responsibilities (per GOOD_PRACTICES.md)

| Layer | Responsibility | Allowed | Not Allowed |
|---|---|---|---|
| `domain/credentials.ts` | Pure validation (email regex, password min-length) | Pure functions, types | JSX, hooks, fetch |
| `components/LoginForm.tsx` | Render form UI, display errors | JSX, i18n strings, UI events | Business logic, fetch |
| `hooks/useLoginForm.ts` | Orchestrate state (callbackUrl extraction) | Hooks, data/handlers | JSX, fetch |
| `services/loginAction.ts` | Server action — Supabase signIn, redirect | Async I/O, server-only | JSX, hooks |
| `constants/` | Typed, frozen constants | `Object.freeze()`, `as const` | Logic |
| `i18n/` | All user-visible strings (es/en) | Translation records | Logic, JSX |
| `app/auth/login/page.tsx` | Compose feature components | Import + render | Inline logic |

---

## Error Handling Strategy

| Supabase Error | surfaced as | User sees |
|---|---|---|
| `invalid_credentials` (wrong email or password) | `INVALID_CREDENTIALS` | "Credenciales inválidas" |
| `email_not_confirmed` | `EMAIL_NOT_CONFIRMED` | "Verificá tu correo antes de iniciar sesión" |
| Any other error | `INVALID_CREDENTIALS` | Generic message (security) |

---

## Redirect Strategy

- Default redirect: `ROUTES.HOME` (`/`)
- If `callbackUrl` search param is present: redirect to that URL after login
- The booking flow (another feature) will be responsible for constructing the callback URL

---

## TODO

- [x] Implement `domain/credentials.ts` — validators + types
- [x] Implement `domain/credentials.test.ts` — unit tests
- [x] Modify `constants/errors.ts` — add `INVALID_CREDENTIALS`, `EMAIL_NOT_CONFIRMED`
- [x] Modify `constants/fields.ts` — add `LOGIN_FIELDS`
- [x] Modify `i18n/authTexts.type.ts` — add `LOGIN` section + new error keys
- [x] Modify `i18n/auth.texts.ts` — add `LOGIN` translations es/en + new error keys
- [x] Implement `services/loginAction.ts` — server action
- [x] Implement `hooks/useLoginForm.ts` — hook
- [x] Implement `components/LoginForm.tsx` — form component
- [x] Implement `app/auth/login/page.tsx` — route page
- [ ] Run tests: `pnpm --filter @hotel/portal-reservas exec vitest run`
- [ ] Run type-check: `pnpm --filter @hotel/portal-reservas type-check`
- [ ] Run lint: `pnpm --filter @hotel/portal-reservas lint`

