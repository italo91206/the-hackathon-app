# the-hackathon-app

Nuxt 3 boilerplate with Composition API, Tailwind CSS, Tailwind UI free components, and Knex.js for database migrations.

## Stack

- **[Nuxt 3](https://nuxt.com)** — full-stack Vue framework with file-based routing
- **Composition API** — `<script setup>` throughout
- **[Vue Router 4](https://router.vuejs.org)** — built-in via Nuxt
- **[Tailwind CSS](https://tailwindcss.com)** + **[@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)** + **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)**
- **[Tailwind UI](https://tailwindui.com)** — free components via `@headlessui/vue` + `@heroicons/vue`
- **[Knex.js](https://knexjs.org)** — query builder, migrations, and seeds
- **SQLite** (development/test) via `better-sqlite3` — swap to PostgreSQL for production

## Getting started

```bash
cd app
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed   # optional sample data
npm run dev
```

## NPM scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:migrate:rollback` | Rollback last migration batch |
| `npm run db:migrate:make <name>` | Create a new migration file |
| `npm run db:seed` | Run all seed files |
| `npm run db:seed:make <name>` | Create a new seed file |

## Project structure

```
app/
├── assets/css/          # Tailwind entry point + component layer
├── components/          # Shared Vue components (Tailwind UI patterns)
├── composables/         # Auto-imported composables (useApi, useNotification)
├── layouts/             # default.vue, blank.vue
├── pages/               # File-based routing
├── plugins/             # Nuxt plugins
├── server/
│   ├── api/             # Nitro API routes
│   ├── migrations/      # Knex migration files
│   ├── seeds/           # Knex seed files
│   └── utils/db.ts      # Singleton Knex connection (useDB)
├── scripts/db.js        # CLI wrapper for Knex commands
├── db/                  # SQLite database files (gitignored)
├── knexfile.ts          # Knex environment configs
└── nuxt.config.ts
```

## Database

Migrations live in `server/migrations/` and seeds in `server/seeds/`.  
The `useDB()` utility (auto-imported in server routes) returns a singleton Knex instance.

To add a new migration:

```bash
npm run db:migrate:make create_posts_table
```

### Production (PostgreSQL)

Set these environment variables:

```
NODE_ENV=production
DB_CLIENT=pg
DATABASE_URL=postgres://user:password@host:5432/dbname
```
