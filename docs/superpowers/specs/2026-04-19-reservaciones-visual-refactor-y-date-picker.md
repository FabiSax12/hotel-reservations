# Design & Implementation: Reservaciones — Visual Refactor + DateRangePicker (US-JA-02 visual)

**Date:** 2026-04-19 (updated 2026-04-20)
**Scope:** Refactor visual de la lista de reservaciones: alineación al design system del portal, layout de 3 cards, eliminación de elementos no requeridos, reemplazo del date picker por el componente nativo del portal, corrección de Tailwind para paquetes externos, migración del sistema de estilos a `src/themes/`, separación de responsabilidades (SRP) en componentes/hooks/utilidades, y descomposición interna de `DateRangePicker` en tipos/lógica pura/hook/JSX.

---

## Context

Se detectaron divergencias visuales entre `panel-admin` (lista de reservaciones) y `portal-reservas` (barra de búsqueda). Se corrigen tipografía, colores, estructura de layout y el selector de fechas para que ambas apps compartan el mismo lenguaje visual.

**En alcance:**
- Eliminar badge "BOOKINGS · LIVE" y botón "+ Nueva reservación"
- Eliminar botón "Más filtros"
- Layout de 3 cards: header+stats / filtros / tabla
- Tipografía y colores alineados al portal (`font-serif italic text-emerald-900`, grays del design system)
- Stat cards alineadas al portal (fondo `bg-gray-50`, border `border-gray-100`)
- Reemplazar los campos de fecha (Popover+TextField de HeroUI) por el mismo `DateRangePicker` pill que usa el portal
- Corrección del renderizado del calendario (columna única → grid 7 columnas)
- Formato de fechas en la tabla: "1 may" sin año
- Migración del sistema de estilos de `constants/styles.ts` a `src/themes/*.theme.ts`
- Refactor SRP: extracción de utilidades, hooks y componentes

**Fuera de alcance:**
- Filtrado real por fechas (lógica de dominio ya presente, no se modifica)
- Modal de detalle (US-JA-03)
- Cambio de estado (US-JA-04)
- Conexión a Supabase

---

## Target Structure

```
apps/panel-admin/src/
├── app/
│   └── globals.css                                    ← MODIFICADO: @source para @hotel/ui
├── themes/                                            ← NUEVO: sistema de temas
│   ├── reservations-page.theme.ts                    ← NUEVO: RESERVATIONS_PAGE_STYLES, CARD_STYLES, PAGE_HEADER_STYLES, STAT_CARD_STYLES
│   ├── reservations-filters.theme.ts                 ← NUEVO: FILTER_BAR_STYLES, DATE_RANGE_PICKER_STYLES
│   ├── reservations-table.theme.ts                   ← NUEVO: RESERVATIONS_TABLE_STYLES, TABLE_CELL_STYLES
│   └── reservations-empty-state.theme.ts             ← NUEVO: EMPTY_STATE_STYLES
└── features/
    └── reservaciones/
        ├── constants/
        │   ├── room-list.ts
        │   ├── status-color.ts
        │   └── status-i18n.ts
        ├── hooks/                                     ← NUEVO
        │   └── useReservationsFiltering.ts            ← NUEVO: estado de filtros + derivados
        ├── utils/                                     ← NUEVO
        │   ├── format-reservation-date.ts             ← NUEVO: formatTableDate, formatPickerDate
        │   ├── filter-reservations.ts                 ← NUEVO: función pura de filtrado
        │   └── count-reservation-statuses.ts          ← NUEVO: función pura de conteo
        ├── components/
        │   ├── date-range.types.ts                    ← NUEVO: tipo ActiveField compartido
        │   ├── date-range.logic.ts                    ← NUEVO: handlePickDate como función pura (sin React)
        │   ├── useDateRangePicker.ts                  ← NUEVO: hook con estado active, invalidState, click-outside
        │   ├── DateRangePicker.tsx                    ← MODIFICADO: solo JSX; delega lógica al hook
        │   ├── EmptyState.tsx                         ← MODIFICADO: importa desde themes
        │   ├── ReservationsList.tsx                   ← MODIFICADO: usa hook + ReservationsPageHeader
        │   ├── ReservationsFilters.tsx                ← MODIFICADO: importa desde themes
        │   ├── ReservationsPageHeader.tsx             ← NUEVO: header + stat cards extraídos de ReservationsList
        │   ├── ReservationsTable.tsx                  ← MODIFICADO: usa formatTableDate de utils
        │   └── StatusBadge.tsx
        └── i18n/
            ├── reservations.texts.ts
            └── reservationsTexts.type.ts

packages/ui/src/search-bar/
└── index.ts                                           ← MODIFICADO: exporta CalendarPopover
```

---

## Files Changed

### Modificados

| Archivo | Cambio |
|---|---|
| `apps/panel-admin/src/app/globals.css` | Agregado `@source "../../../../packages/ui/src"` para que Tailwind escanee `@hotel/ui` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsList.tsx` | Usa `useReservationsFiltering` + `ReservationsPageHeader`; solo orquesta layout |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsFilters.tsx` | Eliminado "Más filtros"; usa `DateRangePicker`; importa desde `@/themes/reservations-filters.theme` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsTable.tsx` | Usa `formatTableDate` de utils; importa desde `@/themes/reservations-table.theme` |
| `apps/panel-admin/src/features/reservaciones/components/DateRangePicker.tsx` | Reducido a solo JSX; delega todo al hook `useDateRangePicker` |
| `apps/panel-admin/src/features/reservaciones/components/EmptyState.tsx` | Importa `EMPTY_STATE_STYLES` desde `@/themes/reservations-empty-state.theme` |
| `apps/panel-admin/src/features/reservaciones/i18n/reservations.texts.ts` | `LABEL_DATE_FROM`: "Llegada"; `LABEL_DATE_TO`: "Salida"; agregado `DATE_PLACEHOLDER` |
| `apps/panel-admin/src/features/reservaciones/i18n/reservationsTexts.type.ts` | Agregado `DATE_PLACEHOLDER: string` en `FILTERS` |
| `packages/ui/src/search-bar/index.ts` | Exportado `CalendarPopover` para consumo desde `panel-admin` |

### Creados

| Archivo | Responsabilidad |
|---|---|
| `apps/panel-admin/src/themes/reservations-page.theme.ts` | Estilos del wrapper de página, cards, header y stat cards |
| `apps/panel-admin/src/themes/reservations-filters.theme.ts` | Estilos de la barra de filtros y del date range picker |
| `apps/panel-admin/src/themes/reservations-table.theme.ts` | Estilos de la tabla y sus celdas |
| `apps/panel-admin/src/themes/reservations-empty-state.theme.ts` | Estilos del estado vacío |
| `apps/panel-admin/src/features/reservaciones/hooks/useReservationsFiltering.ts` | Estado de filtros, `statusCounts` y `filtered` extraídos de `ReservationsList` |
| `apps/panel-admin/src/features/reservaciones/utils/format-reservation-date.ts` | `formatTableDate` (para tabla) y `formatPickerDate` (para picker) |
| `apps/panel-admin/src/features/reservaciones/utils/filter-reservations.ts` | Función pura `filterReservations(reservations, filters)` |
| `apps/panel-admin/src/features/reservaciones/utils/count-reservation-statuses.ts` | Función pura `countReservationStatuses(reservations)` |
| `apps/panel-admin/src/features/reservaciones/components/ReservationsPageHeader.tsx` | Card de header con título, subtítulo y stat cards |
| `apps/panel-admin/src/features/reservaciones/components/date-range.types.ts` | Tipo `ActiveField` compartido entre los tres archivos del picker |
| `apps/panel-admin/src/features/reservaciones/components/date-range.logic.ts` | `handlePickDate` puro (sin React): algoritmo de 3 escenarios, retorna el próximo `ActiveField` |
| `apps/panel-admin/src/features/reservaciones/components/useDateRangePicker.ts` | Hook: `active`, `invalidState`, timeouts, click-outside, expone `handlePickDate` enlazado |
| `apps/panel-admin/src/features/reservaciones/components/DateRangePicker.tsx` | Campos pill LLEGADA/SALIDA con `CalendarPopover`; solo JSX |

### Eliminados

| Archivo | Razón |
|---|---|
| `apps/panel-admin/src/features/reservaciones/constants/styles.ts` | Reemplazado por archivos `*.theme.ts` en `src/themes/` |
| `apps/panel-admin/src/features/reservaciones/constants/daterangepicker-styles.ts` | Reemplazado por `DATE_RANGE_PICKER_STYLES` en `reservations-filters.theme.ts` |

---

## Architecture Decisions

### §1 — Layout de 3 cards

La pantalla se divide en tres contenedores independientes (`rounded-xl bg-white border border-gray-200 shadow-sm`) sobre un fondo `bg-gray-100`:

```
┌──────────────────────────────────────────────┐  ← CARD_STYLES.body        (p-6)
│  Header (título + subtítulo)  │  Stat cards  │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐  ← CARD_STYLES.bodySmall   (p-4)
│  Filtros (pills de estado + DateRangePicker) │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐  ← CARD_STYLES.bodyWithOverflow (sin padding, overflow-hidden)
│  Tabla de reservaciones / EmptyState         │
└──────────────────────────────────────────────┘
```

`bodyWithOverflow` usa `overflow-hidden` en lugar de padding para que la tabla ocupe todo el ancho del card sin bordes internos.

### §2 — DateRangePicker como componente wrapper

Se crea `DateRangePicker.tsx` en el feature en lugar de importar `DateSection` del portal, porque:

1. `DateSection` está acoplada al estado global de `ModernSearchBar` (`SearchState`).
2. `DateRangePicker` es un wrapper controlado (recibe `checkIn`, `checkOut`, `onChange`) que reutiliza solo `CalendarPopover` de `@hotel/ui`.
3. El algoritmo `handlePickDate` (3 escenarios) se copia del portal garantizando UX idéntica.

```
ReservationsFilters
  └── DateRangePicker (feature-local)
        └── CalendarPopover (@hotel/ui, exportado)
```

### §3 — Exportación de CalendarPopover

`CalendarPopover` era un sub-componente interno de `ModernSearchBar`. Se agrega al barrel export de `packages/ui/src/search-bar/index.ts` para hacerlo consumible desde fuera del paquete sin romper el encapsulamiento del resto de sub-componentes (DestinationPopover, GuestsPopover, etc. siguen siendo internos).

### §4 — @source directive para Tailwind v4

`panel-admin` usa Tailwind v4 con `@import "tailwindcss"`. Las clases del calendario (`grid-cols-7`, `aspect-square`, clases emerald de rango) viven en el source de `@hotel/ui`, que no forma parte del árbol de archivos escaneado por defecto.

**Solución:** Agregar `@source "../../../../packages/ui/src"` en `globals.css`, idéntico al patrón ya existente en `portal-reservas/globals.css`.

```css
/* apps/panel-admin/src/app/globals.css */
@import "tailwindcss";
@source "../../../../packages/ui/src";   ← fix: escanear paquete UI
@import "@heroui/styles";
@import "@hotel/ui/theme.css";
```

Sin esta directiva el calendario se renderizaba en columna única porque `grid-cols-7` no era generado.

### §5 — Formato de fechas en tabla

Se eliminó el año del formato de check-in/check-out en `ReservationsTable` para reducir el ruido visual. Se usa `Intl.DateTimeFormat` con `day: "numeric", month: "short"` en locale `es-CR`.

El `Date` se construye con componentes locales (`new Date(year, month-1, day)`) para evitar el off-by-one que produce `new Date(isoString)` en zonas horarias UTC-.

### §6 — Corrección de Select API (HeroUI v3)

Los props `selectedKey` y `onSelectionChange` estaban deprecados en `ReservationsFilters`. Corregido a `value` y `onChange` según la API actual de React Aria / HeroUI v3.

### §7 — Sistema de temas en `src/themes/`

Los estilos Tailwind se migran de `constants/styles.ts` a archivos `*.theme.ts` en `apps/panel-admin/src/themes/`, siguiendo el mismo patrón que usa `portal-reservas/src/theme/`.

**Convención:**
- Un archivo por dominio visual (`reservations-page`, `reservations-filters`, `reservations-table`, `reservations-empty-state`)
- Nombres de export: `[FEATURE]_STYLES` en mayúsculas
- Propiedades en **camelCase** (ej. `bodySmall`, `pillActive`, `columnHeader`)
- Sin `Object.freeze()` — `as const` es suficiente
- Importados con alias `@/themes/` desde cualquier componente de `panel-admin`

```
src/themes/
├── reservations-page.theme.ts         → RESERVATIONS_PAGE_STYLES, CARD_STYLES, PAGE_HEADER_STYLES, STAT_CARD_STYLES
├── reservations-filters.theme.ts      → FILTER_BAR_STYLES, DATE_RANGE_PICKER_STYLES
├── reservations-table.theme.ts        → RESERVATIONS_TABLE_STYLES, TABLE_CELL_STYLES
└── reservations-empty-state.theme.ts  → EMPTY_STATE_STYLES
```

### §9 — SRP interno de DateRangePicker: tipos / lógica / hook / JSX

`DateRangePicker.tsx` concentraba estado, lógica pura, efectos y JSX. Se separa en cuatro archivos co-localizados en `components/`:

| Archivo | Responsabilidad | React |
|---|---|---|
| `date-range.types.ts` | Tipo `ActiveField` | No |
| `date-range.logic.ts` | `handlePickDate` puro — algoritmo de 3 escenarios | No |
| `useDateRangePicker.ts` | Estado `active`/`invalidState`, timeouts, click-outside | Sí (hook) |
| `DateRangePicker.tsx` | Solo JSX: field trigger + `CalendarPopover` | Sí (componente) |

**Firma de la función pura:**
```ts
handlePickDate(
  dayStr: string,
  state: { checkIn: string; checkOut: string; active: ActiveField },
  onChange: (ci: string, co: string) => void,
  triggerInvalid: (ds: string) => void,
): ActiveField
```
Retorna el próximo valor de `active` en lugar de llamar `setActive` internamente, de forma que el hook mantiene la propiedad del estado.

**Firma del hook:**
```ts
useDateRangePicker(checkIn: string, checkOut: string, onChange: (ci, co) => void)
  → { active, setActive, invalidState, containerRef, handlePickDate }
```
El hook llama `computeNextActive(...)` e invoca `setActive(nextActive)`.

### §8 — SRP: separación en hooks, utils y componentes

`ReservationsList` concentraba estado, lógica de negocio y layout. Se separa en:

| Capa | Archivo | Responsabilidad |
|---|---|---|
| Hook | `hooks/useReservationsFiltering.ts` | Estado `filters`, `statusCounts` y `filtered` |
| Util | `utils/filter-reservations.ts` | Función pura `filterReservations(reservations, filters)` |
| Util | `utils/count-reservation-statuses.ts` | Función pura `countReservationStatuses(reservations)` |
| Util | `utils/format-reservation-date.ts` | `formatTableDate` y `formatPickerDate` |
| Componente | `components/ReservationsPageHeader.tsx` | Card visual de título + stat cards |
| Componente | `components/ReservationsList.tsx` | Solo orquesta layout con los piezas anteriores |

`formatDate` existía duplicada en `ReservationsTable` y `DateRangePicker` con variaciones menores. Se unifica en `utils/format-reservation-date.ts` con dos exports nombrados que dejan clara la intención de cada variante.

---

## i18n Keys Modified

| Clave | ES anterior | ES nuevo | EN anterior | EN nuevo |
|---|---|---|---|---|
| `RESERVATIONS.FILTERS.LABEL_DATE_FROM` | "Desde" | "Llegada" | "From" | "Check-in" |
| `RESERVATIONS.FILTERS.LABEL_DATE_TO` | "Hasta" | "Salida" | "To" | "Check-out" |
| `RESERVATIONS.FILTERS.DATE_PLACEHOLDER` | — | "Agregar fecha" | — | "Add date" |

---

## Theme Exports Reference

### `reservations-page.theme.ts`

| Export | Propiedades clave |
|---|---|
| `RESERVATIONS_PAGE_STYLES` | `wrapper` |
| `CARD_STYLES` | `base`, `body`, `bodySmall`, `bodyWithOverflow` |
| `PAGE_HEADER_STYLES` | `layout`, `leftColumn`, `title`, `titleAccent`, `subtitle`, `subtitleHighlight` |
| `STAT_CARD_STYLES` | `row`, `card`, `label`, `value`, `note` |

### `reservations-filters.theme.ts`

| Export | Propiedades clave |
|---|---|
| `FILTER_BAR_STYLES` | `wrapper`, `bar`, `spacer`, `rightSection`, `pill`, `pillActive`, `pillInactive`, `pillStatusDot`, `pillCount`, `resultsText`, `resultsCount` |
| `DATE_RANGE_PICKER_STYLES` | `wrapper`, `container`, `fieldBase`, `fieldActive`, `fieldInactive`, `fieldFlex`, `label`, `valuePlaceholder`, `valueFilled` |

### `reservations-table.theme.ts`

| Export | Propiedades clave |
|---|---|
| `RESERVATIONS_TABLE_STYLES` | `columnHeader` |
| `TABLE_CELL_STYLES` | `guestRow`, `guestTextBlock`, `textPrimary`, `textSecondary`, `textDefault`, `textAmount`, `codeBadge` |

### `reservations-empty-state.theme.ts`

| Export | Propiedades clave |
|---|---|
| `EMPTY_STATE_STYLES` | `wrapper`, `icon`, `title`, `description` |

---

## DateRangePicker — Algoritmo handlePickDate

El selector de fechas implementa el mismo algoritmo de 3 escenarios que `ModernSearchBar.DateSection`:

| Escenario | Condición | Comportamiento |
|---|---|---|
| Toggle-off | `dayStr === checkIn` ó `dayStr === checkOut` | Limpia la fecha correspondiente |
| Ambas fechas activas | `checkIn && checkOut` | Smart replace: si clicked < checkIn → nuevo checkIn; si clicked > checkOut → nuevo checkOut; si entre ambas → reemplaza la más cercana (tie → checkIn) |
| Una sola fecha activa | `field === "checkIn"` ó `"checkOut"` | Valida dirección; si inválida activa animación de error; si válida asigna y avanza el campo activo |

La animación de fecha inválida usa dos timeouts encadenados: `isFading: false` a los 400ms → `null` a los 700ms, dando un efecto de shake + fade.

---

## What Does NOT Change

- Lógica de filtrado (ahora en `utils/filter-reservations.ts`, sin cambios de comportamiento)
- Comportamiento de autenticación (Supabase, middleware)
- Estructura y contenido de `features/auth/`
- Resto de `packages/ui/` (solo se modifica el barrel export de `search-bar/index.ts`)
- `apps/portal-reservas/` ni `apps/landing/`
- Mock data y tipos de dominio de `reservation.ts`
- Constants no relacionados a estilos (`room-list.ts`, `status-color.ts`, `status-i18n.ts`)

---

## Checklist

- [x] `globals.css` — `@source` para `@hotel/ui`
- [x] `components/ReservationsList.tsx` — 3 cards, sin badge, sin botón nueva reservación; usa hook + header component
- [x] `components/ReservationsFilters.tsx` — `DateRangePicker` integrado, sin "Más filtros", Select API corregido; importa desde themes
- [x] `components/ReservationsTable.tsx` — `formatTableDate` sin año, importa desde themes
- [x] `components/date-range.types.ts` — tipo `ActiveField` creado
- [x] `components/date-range.logic.ts` — `handlePickDate` puro, retorna `ActiveField`
- [x] `components/useDateRangePicker.ts` — hook con estado, timeouts, click-outside
- [x] `components/DateRangePicker.tsx` — reducido a solo JSX; usa hook
- [x] `components/ReservationsPageHeader.tsx` — header y stat cards como componente independiente
- [x] `components/EmptyState.tsx` — importa desde themes
- [x] `i18n/reservations.texts.ts` — labels Llegada/Salida, `DATE_PLACEHOLDER`
- [x] `i18n/reservationsTexts.type.ts` — tipo `DATE_PLACEHOLDER` agregado
- [x] `packages/ui/src/search-bar/index.ts` — `CalendarPopover` exportado
- [x] `src/themes/reservations-page.theme.ts` — creado
- [x] `src/themes/reservations-filters.theme.ts` — creado
- [x] `src/themes/reservations-table.theme.ts` — creado
- [x] `src/themes/reservations-empty-state.theme.ts` — creado
- [x] `constants/styles.ts` — eliminado (reemplazado por themes)
- [x] `constants/daterangepicker-styles.ts` — eliminado (reemplazado por themes)
- [x] `hooks/useReservationsFiltering.ts` — creado
- [x] `utils/format-reservation-date.ts` — creado
- [x] `utils/filter-reservations.ts` — creado
- [x] `utils/count-reservation-statuses.ts` — creado
- [ ] Conexión a Supabase (diferido)
- [ ] Modal de detalle (US-JA-03)
- [ ] Cambio de estado (US-JA-04)

---

## Lessons Learned

### Tailwind v4 y paquetes externos del monorepo

**Error:** Las clases de `@hotel/ui` (ej. `grid-cols-7`, `aspect-square`, `bg-emerald-200`) no eran generadas en `panel-admin` porque Tailwind solo escanea el árbol de la app actual.

**Síntoma:** El calendario de `CalendarPopover` se renderizaba en una sola columna en vez de la grilla de 7.

**Regla:** Toda app que consuma componentes de `@hotel/ui` debe declarar `@source "../../../../packages/ui/src"` en su `globals.css`.

### Re-uso de sub-componentes internos de un paquete

**Patrón:** Cuando un sub-componente de un paquete (`CalendarPopover`) se necesita en otra app, se exporta desde el barrel del paquete — no se duplica el componente.

### Construir fechas con componentes locales

**Regla:** `new Date("YYYY-MM-DD")` parsea como UTC → off-by-one en zonas horarias negativas (UTC-6 de Costa Rica muestra el día anterior). Siempre usar `new Date(year, month-1, day)` con los componentes separados del ISO string.

### Sistema de temas: camelCase sobre UPPER_SNAKE_CASE

**Decisión:** Las propiedades dentro de los objetos de estilos usan camelCase (`pillActive`, `bodySmall`) en lugar de UPPER_SNAKE_CASE (`PILL_ON`, `BODY_SM`) para alinearse al patrón del portal y mejorar legibilidad. El nombre del export en sí permanece en UPPER_SNAKE_CASE por convención de constante (`FILTER_BAR_STYLES`).

### SRP en features React

**Patrón aplicado:** Un componente de página que concentra estado + lógica + layout se descompone en: un hook para estado/derivados, funciones puras para transformaciones de datos, y sub-componentes para secciones visuales independientes. El componente raíz queda como orquestador de layout puro.
