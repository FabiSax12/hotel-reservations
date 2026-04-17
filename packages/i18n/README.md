# @hotel/i18n

Paquete base de internacionalización para las apps del monorepo. Provee el contexto, el provider y el hook genérico. **No contiene textos** — cada app define los suyos.

---

## Qué exporta este paquete

```ts
import { I18nProvider, useI18n, LOCALES, createI18nContext } from "@hotel/i18n";
import type { SupportedLocale } from "@hotel/i18n";
```

| Export | Descripción |
|---|---|
| `I18nProvider` | Provider genérico que envuelve la app |
| `useI18n<T>()` | Hook tipado para acceder a las traducciones |
| `LOCALES` | Constantes de locales soportados: `ES`, `EN` |
| `SupportedLocale` | Tipo `"es" \| "en"` |
| `createI18nContext` | Utilidad para crear un contexto de traducción estático |

---

## Cómo implementar i18n en tu app

Seguí estos pasos en orden. Mirá `apps/panel-admin` como referencia de implementación completa.

### Paso 1 — Definí el tipo de los textos de tu feature

Creá un archivo `authTexts.type.ts` (o el nombre de tu feature) dentro de `features/<nombre>/i18n/`:

```ts
// features/auth/i18n/authTexts.type.ts
export type AuthTexts = {
  LOGIN: {
    TITLE: string;
    SUBMIT_BUTTON: string;
  };
  ERRORS: {
    INVALID_CREDENTIALS: string;
  };
};
```

**Regla:** todas las claves en ALLCAPS. El tipo refleja exactamente la forma del objeto de traducciones.

---

### Paso 2 — Definí los textos de tu feature

Creá `auth.texts.ts` en la misma carpeta:

```ts
// features/auth/i18n/auth.texts.ts
import type { SupportedLocale } from "@hotel/i18n";
import type { AuthTexts } from "./authTexts.type";

export const AUTH_TEXTS: Record<SupportedLocale, AuthTexts> = {
  es: {
    LOGIN: {
      TITLE: "Panel de Administración",
      SUBMIT_BUTTON: "Iniciar sesión",
    },
    ERRORS: {
      INVALID_CREDENTIALS: "Credenciales inválidas",
    },
  },
  en: {
    LOGIN: {
      TITLE: "Administration Panel",
      SUBMIT_BUTTON: "Sign in",
    },
    ERRORS: {
      INVALID_CREDENTIALS: "Invalid credentials",
    },
  },
} as const;
```

---

### Paso 3 — Registrá los textos en el composition root de la app

Cada app tiene una carpeta `locales/` que ensambla **todas** las traducciones. Agregá tu feature ahí:

```ts
// locales/translations.ts
import { useI18n as _useI18n, LOCALES } from "@hotel/i18n";
import type { SupportedLocale } from "@hotel/i18n";
import { AUTH_TEXTS } from "@/features/auth/i18n/auth.texts";
import type { AuthTexts } from "@/features/auth/i18n/authTexts.type";
import { COMMON_TEXTS } from "@/shared/i18n/commonTexts";
import type { CommonTexts } from "@/shared/i18n/commonTexts.type";
// 👇 importá tu feature
import { RESERVATIONS_TEXTS } from "@/features/reservations/i18n/reservations.texts";
import type { ReservationsTexts } from "@/features/reservations/i18n/reservationsTexts.type";

export type AppTranslations = {
  COMMON: CommonTexts;
  AUTH: AuthTexts;
  RESERVATIONS: ReservationsTexts; // 👈 agregá tu entrada acá
};

export const TRANSLATIONS: Record<SupportedLocale, AppTranslations> = {
  [LOCALES.ES]: {
    COMMON: COMMON_TEXTS.es,
    AUTH: AUTH_TEXTS.es,
    RESERVATIONS: RESERVATIONS_TEXTS.es, // 👈 y acá
  },
  [LOCALES.EN]: {
    COMMON: COMMON_TEXTS.en,
    AUTH: AUTH_TEXTS.en,
    RESERVATIONS: RESERVATIONS_TEXTS.en, // 👈 y acá
  },
};

export const defaultLocale = LOCALES.ES;

export const useI18n = () => _useI18n<AppTranslations>();
```

---

### Paso 4 — Usá el hook en tus componentes

```tsx
// features/reservations/components/ReservationsList.tsx
"use client";

import { useI18n } from "@/locales";

export const ReservationsList = () => {
  const { t } = useI18n();

  return <h1>{t.RESERVATIONS.LIST.TITLE}</h1>;
};
```

**Importante:** importá siempre `useI18n` desde `@/locales`, nunca desde `@hotel/i18n` directamente. El de `@/locales` ya tiene el tipo `AppTranslations` cargado.

---

## Estructura de carpetas esperada

```
features/
└── <nombre>/
    └── i18n/
        ├── <nombre>Texts.type.ts   ← tipo de los textos
        └── <nombre>.texts.ts       ← textos en cada idioma

shared/i18n/
├── commonTexts.type.ts             ← tipo de textos compartidos
└── commonTexts.ts                  ← textos compartidos (nav, acciones, errores genéricos)

locales/
├── translations.ts                 ← composition root: ensambla todo
└── index.ts                        ← re-exports

app/
└── layout.tsx                      ← monta el I18nProvider, importa de locales/
```

---

## Reglas

- **Claves siempre en ALLCAPS** — `LOGIN.TITLE`, no `login.title` ni `loginTitle`.
- **`shared/i18n` no conoce features** — si necesitás textos de un feature, van en `features/<nombre>/i18n/`, no en `shared`.
- **Un solo composition root por app** — toda la asamblea de traducciones vive en `locales/translations.ts`.
- **El layout solo renderiza** — no define tipos ni constantes de traducción.
- **Textos de errores tipados como `keyof`** — si un error key viene del servidor, tipalo como `keyof AuthTexts["ERRORS"]` para que TypeScript valide el acceso.
