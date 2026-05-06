# @hotel/core/auth

Authentication utilities shared between `panel-admin` and `portal-reservas`.

## Purpose

Provide a unified auth layer that:
- Guarantees **non-null session/user/profile after login** (fixes first-render null bug)
- Is reusable across apps without duplicating logic
- Separates server vs client concerns clearly

## Architecture

```
packages/core/src/auth/
├── index.ts           # Main exports
├── shared/
│   ├── types.ts      # Session, User, Profile, AuthState types
│   └── utils.ts       # isSessionValid, isAdminUser, etc.
├── server/
│   ├── getServerAuthContext.ts   # SSR hydration (fixes null-on-first-render)
│   ├── loginAction.ts           # Login + profile fetch
│   ├── signOutAction.ts       # Logout + cleanup
│   └── refreshSession.ts      # Force session refresh
└── client/
    ├── authSessionService.ts  # Client session + subscription
    ├── useAuthSession.ts      # React hook for session
    └── AuthProvider.tsx        # React provider with SSR hydration
```

---

## Server Functions

### `getServerAuthContext(cookieStore?)` → ServerAuthContext

**What:** Fetches session, user, and profile from server cookies for SSR hydration.

**When:** Called in RootLayout (server component) to hydrate AuthProvider.

**Input:** Optional cookie store (defaults to `next/headers`)

**Output:**
```ts
{
  session: Session | null;
  user: User | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
}
```

**Example:**
```ts
// In apps/panel-admin/src/app/layout.tsx
import { getServerAuthContext, AuthProvider } from "@hotel/core/auth";

export default async function RootLayout({ children }) {
  const { session, user, profile, isAdmin } = await getServerAuthContext();

  return (
    <AuthProvider
      initialSession={session}
      initialUser={user}
      initialProfile={profile}
      initialIsAdmin={isAdmin}
    >
      {children}
    </AuthProvider>
  );
}
```

**Why:** This fixes the null-session-on-first-render bug because the server passes initial session to the client provider.

---

### `loginAction(email, password, options?)` → LoginResult

**What:** Server action for sign-in with password + profile fetch.

**When:** Called from login form (server action) or directly.

**Input:**
```ts
{
  requireAdmin?: boolean;  // default: false
  redirectTo?: string;
  cookieStore?: CookieStore;
}
```

**Output:**
```ts
{
  session: Session | null;
  user: User | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  error: AuthError | null;
}
```

**Example:**
```ts
// In login page
import { loginAction } from "@hotel/core/auth";

const result = await loginAction(email, password, {
  requireAdmin: true,
  redirectTo: "/admin/dashboard",
});

if (result.error) {
  return <Error message={result.error.message} />;
}

// session, user, profile guaranteed non-null here
```

**Why:** Unifies login logic across panel-admin and portal-reservas.

---

### `signOutAction(options?)` → SignOutResult

**What:** Server action for sign out + cookie cleanup.

**When:** Called from logout button (server action).

**Input:**
```ts
{
  redirectTo?: string;  // default: "/login"
  cookieStore?: CookieStore;
}
```

**Output:**
```ts
{
  error: AuthError | null;
}
```

**Example:**
```ts
import { signOutAction } from "@hotel/core/auth";

await signOutAction({ redirectTo: "/login" });
```

---

### `refreshSession()` → AuthState

**What:** Forces session refresh from server.

**When:** Called by AuthProvider.refresh() after login or when client state is stale.

**Output:**
```ts
{
  session: Session | null;
  user: User | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
}
```

**Example:**
```ts
// In client component
const { refresh } = useAuth();
await refresh();
```

---

## Client Functions

### `getClientSession()` → Promise<User | null>

**What:** Gets current session from client (browser).

**When:** Called in client components for quick session check.

**Example:**
```ts
const user = await getClientSession();
```

---

### `subscribeToAuthChanges(callback)` → Subscription

**What:** Subscribes to auth state changes.

**When:** Called in useEffect to keep client in sync with server.

**Input:** `(user: User | null) => void`

**Example:**
```ts
useEffect(() => {
  const sub = subscribeToAuthChanges((user) => {
    setUser(user);
  });
  return () => sub.unsubscribe();
}, []);
```

---

### `useAuthSession()` → { user, loading, error }

**What:** React hook for accessing auth session.

**When:** Used in client components for reactive session state.

**Example:**
```ts
function Dashboard() {
  const { user, loading } = useAuthSession();

  if (loading) return <Spinner />;

  return <h1>Welcome, {user?.email}</h1>;
}
```

---

### `<AuthProvider>` + `useAuth()` → AuthContextValue

**What:** React provider with SSR hydration + hooks for session management.

**When:** Wrap root layout in server component, access via hook in client.

**Example:**
```ts
// Server component (layout.tsx)
const { session, user, profile, isAdmin } = await getServerAuthContext();

return (
  <AuthProvider initialSession={session} initialUser={user} ...>
    {children}
  </AuthProvider>
);

// Client component
const { session, user, profile, loading, refresh, signOut } = useAuth();
```

**Output (useAuth):**
```ts
{
  session: Session | null;
  user: User | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}
```

---

## Shared Utils

### `isSessionValid(session)` → boolean

**What:** Checks if session exists and is not expired.

**Example:**
```ts
if (!isSessionValid(session)) {
  redirect("/login");
}
```

---

### `isAdminUser(profile)` → boolean

**What:** Checks if profile has admin role and is active.

**Example:**
```ts
if (!isAdminUser(profile)) {
  throw new Error("Admin required");
}
```

---

### `getUserId(sessionOrUser)` → string | null

**What:** Extracts user ID from session or user.

---

## Types

### `AuthState`

```ts
{
  session: Session | null;
  user: User | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
}
```

### `LoginResult`

```ts
{
  session: Session | null;
  user: User | null;
  profile: AdminProfile | ClientProfile | null;
  isAdmin: boolean;
  error: AuthError | null;
}
```

### `AuthError`

```ts
| { code: "INVALID_CREDENTIALS"; message: string }
| { code: "USER_NOT_FOUND"; message: string }
| { code: "USER_NOT_ACTIVE"; message: string }
| { code: "NETWORK_ERROR"; message: string }
| { code: "UNKNOWN_ERROR"; message: string };
```

---

## Migration Guide

### From `panel-admin` (old pattern)

**Before:**
```ts
// layout.tsx
import { getInitialAuthStatus } from "@/shared/services/getInitialAuthStatus";

// AuthProvider manually set
```

**After:**
```ts
// layout.tsx
import { getServerAuthContext, AuthProvider } from "@hotel/core/auth";

const { session, user, profile, isAdmin } = await getServerAuthContext();

return (
  <AuthProvider initialSession={session} initialUser={user} initialProfile={profile} initialIsAdmin={isAdmin}>
    {children}
  </AuthProvider>
);
```

### From `portal-reservas` (old pattern)

**Before:**
```ts
// useAuthSession hook
import { getSession, subscribeToAuthChanges } from "../services/authSessionService";
```

**After:**
```ts
import { useAuthSession } from "@hotel/core/auth";

const { user, loading } = useAuthSession();
```

---

## Contract: Non-null Post-Login

After calling `loginAction` and redirecting:
- `session` is **never null**
- `user` is **never null**
- `profile` is **never null** (for admin users)

**How this is guaranteed:**
1. SSR hydration (`getServerAuthContext`) passes session to client on first render
2. Login action (`loginAction`) returns session/user/profile in result
3. AuthProvider subscribes to auth changes on client to keep in sync
4. `refresh()` can be called manually if client state is stale

---

## Exports

```ts
// Main
export { getServerAuthContext, loginAction, signOutAction, refreshSession } from "./server/*.ts";
export { AuthProvider, useAuth, useAuthSession, getClientSession, subscribeToAuthChanges } from "./client/*.ts";
export * from "./shared/types";
export * from "./shared/utils";
```