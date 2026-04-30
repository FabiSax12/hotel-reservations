# Hotel Reservations — Monorepo

Sistema de gestión y reservas hoteleras construido como monorepo con Turborepo y pnpm workspaces.

---

## Stack

| Tecnología          | Versión  | Uso                              |
| ------------------- | -------- | -------------------------------- |
| Next.js             | 15       | Framework para todas las apps    |
| React               | 19       | UI                               |
| TypeScript          | 5.8      | Tipado estático                  |
| Tailwind CSS        | 4        | Estilos                          |
| HeroUI              | v3       | Componentes UI (admin/portal)    |
| Supabase            | —        | Base de datos y autenticación    |
| Biome               | 2        | Linting y formateo               |
| Turborepo           | 2        | Orquestación del monorepo        |
| pnpm                | 10       | Package manager                  |

---

## Estructura del proyecto

```
hotel-reservations/
├── apps/
│   ├── landing/          # Sitio público del hotel            → :3000
│   ├── portal-reservas/  # Portal de reservas para huéspedes  → :3001
│   └── panel-admin/      # Panel de administración            → :3002
├── packages/
│   ├── core/             # Lógica de negocio compartida
│   ├── db/               # Cliente Supabase y esquemas
│   └── ui/               # Componentes compartidos
├── biome.json            # Configuración de linting/formateo
├── turbo.json            # Pipeline de Turborepo
└── pnpm-workspace.yaml   # Definición del workspace
```

---

## Requisitos previos

- **Node.js** >= 20
- **pnpm** 10 → `npm install -g pnpm@10`
- **Docker**
- Acceso al proyecto en **Supabase**

---

## Setup inicial

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd hotel-reservations

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Completar los valores con las credenciales del equipo

# 4. Levantar el entorno de desarrollo
pnpm dev
```

### Setup Supabase Local

El proyecto usa **Supabase** como backend (PostgreSQL, Auth, Storage, Realtime).

#### Requerimientos
- **Docker** instalado y corriendo

#### Inicio Rápido

```bash
# Desarrollo local (Supabase + apps)
pnpm dev:local

# Desarrollo con Supabase cloud (solo apps)
pnpm dev:remote
```

Al ejecutar `dev:local`, las credenciales se mostrarán en la terminal. Cópialas a `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

> Las keys cambian en cada reinicio. Actualiza `.env.local` si reinicias.

#### Puertos de Servicios

| Servicio | Puerto | URL |
|----------|--------|-----|
| API REST | 54321 | http://127.0.0.1:54321 |
| PostgreSQL | 54322 | localhost:54322 |
| Studio UI | 54323 | http://127.0.0.1:54323 |
| SMTP | 54324 | http://127.0.0.1:54324 |

#### Comandos Útiles

```bash
pnpm --filter @hotel/db db:start     # Iniciar Supabase
pnpm --filter @hotel/db db:stop      # Detener
pnpm --filter @hotel/db db:reset     # Reiniciar (borra datos)
pnpm --filter @hotel/db db:status    # Ver estado
pnpm --filter @hotel/db db:logs      # Ver logs
```




> Las tres apps corren en paralelo. Turborepo se encarga de la orquestación.

---

## Variables de entorno

Copiar `.env.example` a `.env.local` en la raíz y completar:

| Variable                        | Descripción                          |
| ------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL del proyecto en Supabase         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase            |
| `SUPABASE_SERVICE_ROLE_KEY`     | Clave de servicio (solo server-side) |
| `RESEND_API_KEY`                | API Key de Resend (emails)           |
| `TILOPAY_API_KEY/SECRET`        | Credenciales Tilopay                 |
| `EVERTEC_MERCHANT_ID`           | ID de comercio Evertec               |
| `PAYPAL_CLIENT_ID/SECRET`       | Credenciales PayPal                  |
| `BOOKING_API_KEY`               | API Key de Booking.com               |

---

## Comandos disponibles

```bash
pnpm dev          # Levanta las apps (Supabase debe estar corriendo)
pnpm dev:local    # Inicia Supabase + apps (desarrollo local)
pnpm dev:remote   # Solo apps (usa Supabase cloud)
pnpm build        # Build de producción
pnpm lint         # Chequea linting con Biome
pnpm lint:fix     # Corrige problemas de linting automáticamente
pnpm format       # Formatea el código con Biome
pnpm type-check   # Verifica tipos TypeScript en todo el monorepo
pnpm clean        # Limpia builds y cachés
```

### Correr una sola app

```bash
pnpm --filter @hotel/landing dev
pnpm --filter @hotel/portal-reservas dev
pnpm --filter @hotel/panel-admin dev
```

---

## Packages internos

Los packages se referencian con el prefijo `@hotel/` y son workspaces locales (no se publican a npm).

```ts
import { ... } from "@hotel/core"
import { ... } from "@hotel/db"
import { ... } from "@hotel/ui"
```

---

## Convenciones

- **Linting y formateo**: Biome. No usar ESLint ni Prettier.
- **Commits**: Conventional Commits.
- **Ramas y PRs**: Ver [CONTRIBUTING.md](./CONTRIBUTING.md).
- **Componentes UI**: HeroUI v3 en `panel-admin` y `portal-reservas`. Componentes compartidos en `packages/ui`.

---

## Links útiles

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [HeroUI v3 Docs](https://heroui.com)
- [Supabase Docs](https://supabase.com/docs)
- [Biome Docs](https://biomejs.dev)
