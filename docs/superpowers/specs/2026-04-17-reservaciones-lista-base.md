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
│       └── reservations/
│           └── page.tsx                        ← Server Component; pasa mock data a ReservationsList
├── config/
│   └── routes.ts                               ← MODIFICADO: agrega RESERVATIONS
├── features/
│   └── reservaciones/
│       ├── constants/
│       │   ├── mock-data.ts                    ← 6 reservaciones mock (cubre los 4 estados)
│       │   ├── status-color.ts                 ← STATUS_COLOR: ReservationStatus → ChipColor
│       │   ├── status-i18n.ts                  ← STATUS_I18N_KEY: ReservationStatus → clave i18n
│       │   └── styles.ts                       ← Clases Tailwind extraídas como PAGE, EMPTY_STATE, CELL (Object.freeze)
│       ├── domain/
│       │   └── reservation.ts                  ← Tipos TS: Reservation, Guest, Room, ReservationStatus
│       ├── i18n/
│       │   ├── reservations.texts.ts           ← Strings ES/EN
│       │   └── reservationsTexts.type.ts       ← Tipo ReservationsTexts
│       └── components/
│           ├── StatusBadge.tsx                 ← Chip HeroUI con color semántico por estado
│           ├── EmptyState.tsx                  ← Vista vacía (ícono SVG + texto i18n)
│           ├── ReservationsTable.tsx           ← Table HeroUI v3
│           └── ReservationsList.tsx            ← Orquestador: tabla o empty state
└── locales/
    └── translations.ts                         ← MODIFICADO: agrega RESERVATIONS a AppTranslations
```

---

## Files Changed

### Modificados

| Archivo | Cambio |
|---|---|
| `apps/panel-admin/src/config/routes.ts` | Agregada constante `RESERVATIONS: "/admin/reservations"` dentro de `ADMIN` |
| `apps/panel-admin/src/locales/translations.ts` | Extendido `AppTranslations` con `RESERVATIONS: ReservationsTexts`; importados `RESERVATIONS_TEXTS` y su tipo |

### Creados

| Archivo | Responsabilidad |
|---|---|
| `apps/panel-admin/src/features/reservaciones/domain/reservation.ts` | Tipos puros de dominio sin imports de React ni librerías |
| `apps/panel-admin/src/features/reservaciones/constants/mock-data.ts` | Datos de prueba inmutables (`Object.freeze`) |
| `apps/panel-admin/src/features/reservaciones/constants/status-color.ts` | `STATUS_COLOR`: mapeo `ReservationStatus → ChipColor`; concern visual |
| `apps/panel-admin/src/features/reservaciones/constants/status-i18n.ts` | `STATUS_I18N_KEY`: mapeo `ReservationStatus → clave i18n`; concern de localización |
| `apps/panel-admin/src/features/reservaciones/constants/styles.ts` | Clases Tailwind como `PAGE`, `EMPTY_STATE`, `CELL` frozen; un grupo por componente |
| `apps/panel-admin/src/features/reservaciones/i18n/reservationsTexts.type.ts` | Contrato de tipo para los textos del módulo |
| `apps/panel-admin/src/features/reservaciones/i18n/reservations.texts.ts` | Strings en español e inglés |
| `apps/panel-admin/src/features/reservaciones/components/StatusBadge.tsx` | Chip con mapeo `ReservationStatus → ChipColor` mediante `Object.freeze` |
| `apps/panel-admin/src/features/reservaciones/components/EmptyState.tsx` | SVG inline + textos i18n; se muestra cuando `reservations.length === 0` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsTable.tsx` | Tabla accesible con `<Table>` de HeroUI v3; columna código con `isRowHeader` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsList.tsx` | Recibe `reservations` como prop; muestra tabla o empty state |
| `apps/panel-admin/src/app/admin/reservations/page.tsx` | Server Component; importa `MOCK_RESERVATIONS` y monta `ReservationsList` |

---

## Architecture Decisions

### §1 — Flujo de datos (Server → Client)

```
page.tsx (Server Component)
  └── ReservationsList (Client Component, "use client")
        ├── ReservationsTable (Client Component)
        │     ├── StatusBadge (Client Component)
        │     └── usa Avatar, Table, Button, Chip de @heroui/react
        └── EmptyState (Client Component)
```

El `page.tsx` es el único punto que toca los datos (hoy mock, mañana Supabase).
Los componentes de presentación sólo reciben `readonly Reservation[]` como prop.

### §2 — Separación de responsabilidades

| Capa | Archivo | Regla |
|---|---|---|
| Dominio | `domain/reservation.ts` | Sólo tipos TS. Sin imports de React, HeroUI ni hooks |
| Datos | `constants/mock-data.ts` | Constantes inmutables. Se reemplazará por un server action en commits futuros |
| i18n | `i18n/*.ts` | Strings bilingües tipados. Nunca strings hardcodeados en componentes |
| Presentación | `components/*.tsx` | UI pura. Reciben props; no hacen fetch ni tienen lógica de negocio |
| Routing | `app/admin/reservations/page.tsx` | Thin wrapper; delega todo a los componentes de feature |

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

### §4 — Mapeo de estado → color (StatusBadge + status-maps.ts)

Los mapeos viven en archivos separados dentro de `constants/`, divididos por concern. `StatusBadge` solo renderiza:

```ts
// constants/status-color.ts  — concern: visual
export const STATUS_COLOR: Record<ReservationStatus, ChipColor> = Object.freeze({
  pending:   "warning",   // amber
  approved:  "success",   // green
  cancelled: "danger",    // red
  completed: "accent",    // blue
} as const);

// constants/status-i18n.ts  — concern: localización
export const STATUS_I18N_KEY: Record<ReservationStatus, keyof STATUS> = Object.freeze({
  pending:   "PENDING",
  approved:  "APPROVED",
  cancelled: "CANCELLED",
  completed: "COMPLETED",
} as const);
```

`StatusBadge` importa los mapeos y solo se ocupa del JSX:

```ts
// components/StatusBadge.tsx
import { STATUS_COLOR } from "../constants/status-color";
import { STATUS_I18N_KEY } from "../constants/status-i18n";
```

### §5 — i18n integrada al patrón existente

Se sigue exactamente el mismo patrón establecido en `features/auth/i18n/`:

1. `reservationsTexts.type.ts` — define el contrato (`ReservationsTexts`)
2. `reservations.texts.ts` — implementa ES + EN como `Record<SupportedLocale, ReservationsTexts>`
3. `locales/translations.ts` — agrega `RESERVATIONS` a `AppTranslations`; accesible via `t.RESERVATIONS.*`

### §6 — HeroUI v3 components utilizados

| Componente | Dónde | Props clave |
|---|---|---|
| `<Table>`, `<Table.ScrollContainer>`, `<Table.Content>`, `<Table.Header>`, `<Table.Column>`, `<Table.Body>`, `<Table.Row>`, `<Table.Cell>` | `ReservationsTable` | `isRowHeader` en columna código; `aria-label` en `Table.Content` |
| `<Avatar>`, `<Avatar.Fallback>` | `ReservationsTable` | `size="sm"`; iniciales en `Fallback` |
| `<Chip>` | `StatusBadge` | `color` semántico + `variant="soft"` + `size="sm"` |
| `<Button>` | `ReservationsTable` | `variant="outline"` + `size="sm"` para acción "Ver detalle" (placeholder) |

---

## i18n Keys Added

Nuevo namespace `t.RESERVATIONS` disponible en `useI18n()`:

```
RESERVATIONS.PAGE.TITLE
RESERVATIONS.PAGE.DESCRIPTION
RESERVATIONS.TABLE.ARIA_LABEL
RESERVATIONS.TABLE.COL_CODE
RESERVATIONS.TABLE.COL_GUEST
RESERVATIONS.TABLE.COL_ROOM
RESERVATIONS.TABLE.COL_CHECKIN
RESERVATIONS.TABLE.COL_CHECKOUT
RESERVATIONS.TABLE.COL_NIGHTS
RESERVATIONS.TABLE.COL_TOTAL
RESERVATIONS.TABLE.COL_STATUS
RESERVATIONS.TABLE.COL_ACTIONS
RESERVATIONS.STATUS.PENDING
RESERVATIONS.STATUS.APPROVED
RESERVATIONS.STATUS.CANCELLED
RESERVATIONS.STATUS.COMPLETED
RESERVATIONS.ACTIONS.VIEW_DETAIL
RESERVATIONS.EMPTY.TITLE
RESERVATIONS.EMPTY.DESCRIPTION
```

---

## Routes Added

| Constante | Valor |
|---|---|
| `ROUTES.ADMIN.RESERVATIONS` | `"/admin/reservations"` |

La ruta queda protegida automáticamente por el `middleware.ts` existente
(`/admin/*` requiere sesión de Supabase activa).

---

## Mock Data Summary

6 reservaciones ordenadas de más reciente a más antigua por `checkIn`:

| Código | Huésped | Habitación | Check-in | Check-out | Noches | Total | Estado |
|---|---|---|---|---|---|---|---|
| RES-006 | Diego Mora | Habitación Estándar | 2026-05-01 | 2026-05-04 | 3 | $330 | pending |
| RES-004 | Luis Fernández | Suite Ejecutiva | 2026-04-22 | 2026-04-28 | 6 | $1,800 | approved |
| RES-001 | María García | Suite Panorámica | 2026-04-20 | 2026-04-25 | 5 | $1,250 | pending |
| RES-002 | Carlos Rodríguez | Habitación Deluxe | 2026-04-18 | 2026-04-21 | 3 | $540 | approved |
| RES-005 | Sofia Vargas | Habitación Deluxe | 2026-04-15 | 2026-04-17 | 2 | $360 | cancelled |
| RES-003 | Ana Martínez | Habitación Estándar | 2026-04-10 | 2026-04-12 | 2 | $220 | completed |

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
| Commit 4 | US-JA-04 | Cambio de estado (pending → approved / cancelled) |

Cuando se conecte Supabase en commits futuros, el único archivo a modificar
en la capa de presentación es `app/admin/reservations/page.tsx` —
reemplazar la importación de `MOCK_RESERVATIONS` por un server action.

---

## Checklist

- [x] `config/routes.ts` — agregado `RESERVATIONS`
- [x] `features/reservaciones/domain/reservation.ts` — tipos TS puros
- [x] `features/reservaciones/constants/mock-data.ts` — 6 entradas, `Object.freeze`
- [x] `features/reservaciones/constants/status-color.ts` — `STATUS_COLOR` (concern visual)
- [x] `features/reservaciones/constants/status-i18n.ts` — `STATUS_I18N_KEY` (concern localización)
- [x] `features/reservaciones/constants/styles.ts` — `PAGE`, `EMPTY_STATE`, `CELL` frozen; un grupo por componente
- [x] `features/reservaciones/i18n/reservationsTexts.type.ts` — tipo `ReservationsTexts`
- [x] `features/reservaciones/i18n/reservations.texts.ts` — ES + EN completos
- [x] `locales/translations.ts` — extendido con `RESERVATIONS`
- [x] `components/StatusBadge.tsx` — Chip con mapeo de color frozen
- [x] `components/EmptyState.tsx` — ícono SVG + i18n
- [x] `components/ReservationsTable.tsx` — tabla con HeroUI Table
- [x] `components/ReservationsList.tsx` — tabla o empty state
- [x] `app/admin/reservations/page.tsx` — Server Component thin wrapper
- [ ] Conexión a Supabase (diferido a commit futuro)
- [ ] Filtros (US-JA-02)
- [ ] Modal de detalle (US-JA-03)
- [ ] Cambio de estado (US-JA-04)

---

## Lessons Learned

### SRP en componentes con mapeos de datos

**Error cometido:** `StatusBadge.tsx` contenía en el mismo archivo el tipo `ChipColor`, las constantes `STATUS_COLOR` y `STATUS_I18N_KEY`, y el componente React. Tres responsabilidades en un archivo.

**Por qué es un problema:** Si cambia la paleta de colores de HeroUI, hay que abrir el componente. Si se necesita reutilizar los mapeos en otro componente (ej: un filtro desplegable), no hay dónde importarlos sin duplicar.

**Regla para implementaciones futuras:** Todo componente que necesite mapeos (valor de dominio → color, valor de dominio → clave i18n, valor → label) debe externalizar esos mapeos a `constants/`. El componente solo importa y renderiza.

```
❌ Mal — mapeos dentro del componente
components/StatusBadge.tsx
  ├── type ChipColor
  ├── const STATUS_COLOR
  ├── const STATUS_I18N_KEY
  └── export const StatusBadge

✅ Bien — un archivo por concern
constants/status-color.ts   ← concern visual
  ├── type ChipColor (local)
  └── export const STATUS_COLOR

constants/status-i18n.ts    ← concern localización
  └── export const STATUS_I18N_KEY

components/StatusBadge.tsx  ← solo JSX
  ├── import { STATUS_COLOR } from "../constants/status-color"
  ├── import { STATUS_I18N_KEY } from "../constants/status-i18n"
  └── export const StatusBadge
```
