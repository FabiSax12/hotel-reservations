# Design & Implementation: Reservaciones — Lista Base (US-JA-01)

**Date:** 2026-04-17  
**Commit:** Commit 1 — US-JA-01  
**Scope:** Lista base de reservaciones en el panel admin (mock data, sin filtros, sin modal de detalle, sin cambio de estado)

---

## Context

Se implementa la vista principal del módulo de reservaciones del panel de administración.

**En alcance:**
- Tabla de reservaciones con datos mock
- Estado vacío cuando no hay reservaciones
- Badge de estado con color semántico
- Integración completa con el sistema i18n existente (ES/EN)
- Ruta protegida por el middleware existente

**Fuera de alcance:**
- Vista mobile / layout de cards (no requerido)
- Filtros por estado / fecha / búsqueda (US-JA-02)
- Modal de detalle de reservación (US-JA-03)
- Cambio de estado (US-JA-04)
- Conexión real a Supabase (se usa mock data)
- Paginación

---

## Target Structure

```
apps/panel-admin/src/
├── app/
│   └── admin/
│       └── reservaciones/
│           └── page.tsx                        ← Server Component; pasa mock data a ReservacionesList
├── config/
│   └── routes.ts                               ← MODIFICADO: agrega RESERVACIONES
├── features/
│   └── reservaciones/
│       ├── constants/
│       │   ├── mock-data.ts                    ← 6 reservaciones mock (cubre los 4 estados)
│       │   └── styles.ts                       ← Clases Tailwind de celdas extraídas como CELL (Object.freeze)
│       ├── domain/
│       │   └── reservacion.ts                  ← Tipos TS: Reservacion, Huesped, Habitacion, EstadoReservacion
│       ├── i18n/
│       │   ├── reservaciones.texts.ts           ← Strings ES/EN
│       │   └── reservacionesTexts.type.ts       ← Tipo ReservacionesTexts
│       └── components/
│           ├── StatusBadge.tsx                  ← Chip HeroUI con color semántico por estado
│           ├── EmptyState.tsx                   ← Vista vacía (ícono SVG + texto i18n)
│           ├── ReservacionesTable.tsx           ← Table HeroUI v3
│           └── ReservacionesList.tsx            ← Orquestador: tabla o empty state
└── locales/
    └── translations.ts                          ← MODIFICADO: agrega RESERVACIONES a AppTranslations
```

---

## Files Changed

### Modificados

| Archivo | Cambio |
|---|---|
| `apps/panel-admin/src/config/routes.ts` | Agregada constante `RESERVACIONES: "/admin/reservaciones"` dentro de `ADMIN` |
| `apps/panel-admin/src/locales/translations.ts` | Extendido `AppTranslations` con `RESERVACIONES: ReservacionesTexts`; importados `RESERVACIONES_TEXTS` y su tipo |

### Creados

| Archivo | Responsabilidad |
|---|---|
| `apps/panel-admin/src/features/reservaciones/domain/reservacion.ts` | Tipos puros de dominio sin imports de React ni librerías |
| `apps/panel-admin/src/features/reservaciones/constants/mock-data.ts` | Datos de prueba inmutables (`Object.freeze`) |
| `apps/panel-admin/src/features/reservaciones/constants/styles.ts` | Clases Tailwind de celdas como constante `CELL` frozen; importada por `ReservacionesTable` |
| `apps/panel-admin/src/features/reservaciones/i18n/reservacionesTexts.type.ts` | Contrato de tipo para los textos del módulo |
| `apps/panel-admin/src/features/reservaciones/i18n/reservaciones.texts.ts` | Strings en español e inglés |
| `apps/panel-admin/src/features/reservaciones/components/StatusBadge.tsx` | Chip con mapeo `EstadoReservacion → ChipColor` mediante `Object.freeze` |
| `apps/panel-admin/src/features/reservaciones/components/EmptyState.tsx` | SVG inline + textos i18n; se muestra cuando `reservaciones.length === 0` |
| `apps/panel-admin/src/features/reservaciones/components/ReservacionesTable.tsx` | Tabla accesible con `<Table>` de HeroUI v3; columna Código con `isRowHeader` |
| `apps/panel-admin/src/features/reservaciones/components/ReservacionesList.tsx` | Recibe `reservaciones` como prop; muestra tabla o empty state |
| `apps/panel-admin/src/app/admin/reservaciones/page.tsx` | Server Component; importa `MOCK_RESERVACIONES` y monta `ReservacionesList` |

---

## Architecture Decisions

### §1 — Flujo de datos (Server → Client)

```
page.tsx (Server Component)
  └── ReservacionesList (Client Component, "use client")
        ├── ReservacionesTable (Client Component)
        │     ├── StatusBadge (Client Component)
        │     └── usa Avatar, Table, Button, Chip de @heroui/react
        └── EmptyState (Client Component)
```

El `page.tsx` es el único punto que toca los datos (hoy mock, mañana Supabase).
Los componentes de presentación sólo reciben `readonly Reservacion[]` como prop.

### §2 — Separación de responsabilidades

| Capa | Archivo | Regla |
|---|---|---|
| Dominio | `domain/reservacion.ts` | Sólo tipos TS. Sin imports de React, HeroUI ni hooks |
| Datos | `constants/mock-data.ts` | Constantes inmutables. Se reemplazará por un server action en commits futuros |
| i18n | `i18n/*.ts` | Strings bilingües tipados. Nunca strings hardcodeados en componentes |
| Presentación | `components/*.tsx` | UI pura. Reciben props; no hacen fetch ni tienen lógica de negocio |
| Routing | `app/admin/reservaciones/page.tsx` | Thin wrapper; delega todo a los componentes de feature |

### §3 — Constantes de estilos Tailwind en `constants/styles.ts`

Las clases Tailwind usadas repetidamente en celdas de tabla se extraen a `constants/styles.ts` como una constante `CELL` frozen:

```ts
// features/reservaciones/constants/styles.ts
export const CELL = Object.freeze({
  TEXT_PRIMARY:   "text-sm font-medium text-gray-900 whitespace-nowrap",
  TEXT_SECONDARY: "text-xs text-gray-500 whitespace-nowrap",
  TEXT_DEFAULT:   "text-sm text-gray-700 whitespace-nowrap",
  TEXT_AMOUNT:    "text-sm font-semibold text-gray-900 whitespace-nowrap",
  CODE_BADGE:     "font-mono text-xs text-gray-700 bg-gray-100 rounded px-2 py-0.5",
} as const);
```

**Regla:** Las clases Tailwind que se repiten más de una vez dentro de un feature van en `constants/styles.ts`, no inline en el JSX. El componente sólo importa la constante:

```ts
import { CELL } from "../constants/styles";
// uso: <p className={CELL.TEXT_PRIMARY}>
```

**Por qué un archivo separado y no en el componente:** Si la constante viviera dentro del archivo del componente, un refactor de estilo obligaría a abrir el componente. Al separarla en `constants/`, un developer puede cambiar todos los estilos de celda de la tabla desde un único archivo sin tocar el JSX.

### §4 — Mapeo de estado → color (StatusBadge)


```ts
const ESTADO_COLOR: Record<EstadoReservacion, ChipColor> = Object.freeze({
  pendiente:  "warning",   // amber
  aprobada:   "success",   // green
  cancelada:  "danger",    // red
  completada: "accent",    // blue
} as const);
```

El mapeo de estado → clave i18n también es un `Object.freeze`, evitando `toUpperCase()` dinámico:

```ts
const ESTADO_I18N_KEY: Record<EstadoReservacion, keyof STATUS> = Object.freeze({
  pendiente:  "PENDIENTE",
  aprobada:   "APROBADA",
  cancelada:  "CANCELADA",
  completada: "COMPLETADA",
} as const);
```

### §5 — i18n integrada al patrón existente

Se sigue exactamente el mismo patrón establecido en `features/auth/i18n/`:

1. `reservacionesTexts.type.ts` — define el contrato (`ReservacionesTexts`)
2. `reservaciones.texts.ts` — implementa ES + EN como `Record<SupportedLocale, ReservacionesTexts>`
3. `locales/translations.ts` — agrega `RESERVACIONES` a `AppTranslations`; accesible via `t.RESERVACIONES.*`

### §6 — HeroUI v3 components utilizados

| Componente | Dónde | Props clave |
|---|---|---|
| `<Table>`, `<Table.ScrollContainer>`, `<Table.Content>`, `<Table.Header>`, `<Table.Column>`, `<Table.Body>`, `<Table.Row>`, `<Table.Cell>` | `ReservacionesTable` | `isRowHeader` en columna Código; `aria-label` en `Table.Content` |
| `<Avatar>`, `<Avatar.Fallback>` | `ReservacionesTable` | `size="sm"`; iniciales en `Fallback` |
| `<Chip>` | `StatusBadge` | `color` semántico + `variant="soft"` + `size="sm"` |
| `<Button>` | `ReservacionesTable` | `variant="outline"` + `size="sm"` para acción "Ver detalle" (placeholder) |

---

## i18n Keys Added

Nuevo namespace `t.RESERVACIONES` disponible en `useI18n()`:

```
RESERVACIONES.PAGE.TITLE
RESERVACIONES.PAGE.DESCRIPTION
RESERVACIONES.TABLE.ARIA_LABEL
RESERVACIONES.TABLE.COL_CODIGO
RESERVACIONES.TABLE.COL_HUESPED
RESERVACIONES.TABLE.COL_HABITACION
RESERVACIONES.TABLE.COL_CHECKIN
RESERVACIONES.TABLE.COL_CHECKOUT
RESERVACIONES.TABLE.COL_NOCHES
RESERVACIONES.TABLE.COL_TOTAL
RESERVACIONES.TABLE.COL_ESTADO
RESERVACIONES.TABLE.COL_ACCIONES
RESERVACIONES.STATUS.PENDIENTE
RESERVACIONES.STATUS.APROBADA
RESERVACIONES.STATUS.CANCELADA
RESERVACIONES.STATUS.COMPLETADA
RESERVACIONES.ACTIONS.VER_DETALLE
RESERVACIONES.EMPTY.TITLE
RESERVACIONES.EMPTY.DESCRIPTION
```

---

## Routes Added

| Constante | Valor |
|---|---|
| `ROUTES.ADMIN.RESERVACIONES` | `"/admin/reservaciones"` |

La ruta queda protegida automáticamente por el `middleware.ts` existente
(`/admin/*` requiere sesión de Supabase activa).

---

## Mock Data Summary

6 reservaciones con distribución de estados:

| Código | Huésped | Habitación | Check-in | Check-out | Noches | Total | Estado |
|---|---|---|---|---|---|---|---|
| RES-001 | María García | Suite Panorámica | 2026-04-20 | 2026-04-25 | 5 | $1,250 | pendiente |
| RES-002 | Carlos Rodríguez | Habitación Deluxe | 2026-04-18 | 2026-04-21 | 3 | $540 | aprobada |
| RES-003 | Ana Martínez | Habitación Estándar | 2026-04-10 | 2026-04-12 | 2 | $220 | completada |
| RES-004 | Luis Fernández | Suite Ejecutiva | 2026-04-22 | 2026-04-28 | 6 | $1,800 | aprobada |
| RES-005 | Sofia Vargas | Habitación Deluxe | 2026-04-15 | 2026-04-17 | 2 | $360 | cancelada |
| RES-006 | Diego Mora | Habitación Estándar | 2026-05-01 | 2026-05-04 | 3 | $330 | pendiente |

---

## What Does NOT Change

- Comportamiento de autenticación (Supabase, middleware)
- Estructura y contenido de `features/auth/`
- Estilos del layout raíz (`app/layout.tsx`)
- Ningún archivo de `packages/` (db, core, i18n, ui)
- `apps/portal-reservas/` ni `apps/landing/`

---

## Next Commits (pending)

| Commit | US | Descripción |
|---|---|---|
| Commit 2 | US-JA-02 | Filtros por estado, fechas y búsqueda por huésped |
| Commit 3 | US-JA-03 | Modal de detalle de reservación |
| Commit 4 | US-JA-04 | Cambio de estado (pendiente → aprobada / cancelada) |

Cuando se conecte Supabase en commits futuros, el único archivo a modificar
en la capa de presentación es `app/admin/reservaciones/page.tsx` —
reemplazar la importación de `MOCK_RESERVACIONES` por un server action.

---

## Checklist

- [x] `config/routes.ts` — agregado `RESERVACIONES`
- [x] `features/reservaciones/domain/reservacion.ts` — tipos TS puros
- [x] `features/reservaciones/constants/mock-data.ts` — 6 entradas, `Object.freeze`
- [x] `features/reservaciones/constants/styles.ts` — constante `CELL` con clases Tailwind de celdas
- [x] `features/reservaciones/i18n/reservacionesTexts.type.ts` — tipo `ReservacionesTexts`
- [x] `features/reservaciones/i18n/reservaciones.texts.ts` — ES + EN completos
- [x] `locales/translations.ts` — extendido con `RESERVACIONES`
- [x] `components/StatusBadge.tsx` — Chip con mapeo de color frozen
- [x] `components/EmptyState.tsx` — ícono SVG + i18n
- [x] `components/ReservacionesTable.tsx` — tabla con HeroUI Table
- [x] `components/ReservacionesList.tsx` — tabla o empty state
- [x] `app/admin/reservaciones/page.tsx` — Server Component thin wrapper
- [ ] Conexión a Supabase (diferido a commit futuro)
- [ ] Filtros (US-JA-02)
- [ ] Modal de detalle (US-JA-03)
- [ ] Cambio de estado (US-JA-04)
