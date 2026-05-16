import knex, { type Knex } from 'knex'
import { resolve } from 'path'

let _db: Knex | null = null

function createConnection(): Knex {
  const env = process.env.NODE_ENV || 'development'
  const baseDir = resolve(process.cwd())

  const configs: Record<string, Knex.Config> = {
    development: {
      client: 'better-sqlite3',
      connection: {
        filename: resolve(baseDir, 'db/development.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        directory: resolve(baseDir, 'server/migrations'),
      },
    },
    test: {
      client: 'better-sqlite3',
      connection: {
        filename: resolve(baseDir, 'db/test.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        directory: resolve(baseDir, 'server/migrations'),
      },
    },
    production: {
      client: process.env.DB_CLIENT || 'pg',
      connection: process.env.DATABASE_URL,
      pool: { min: 2, max: 10 },
      migrations: {
        directory: resolve(baseDir, 'server/migrations'),
      },
    },
  }

  const config = configs[env] ?? configs.development
  return knex(config)
}

export function useDB(): Knex {
  if (!_db) {
    _db = createConnection()
  }
  return _db
}

export async function closeDB(): Promise<void> {
  if (_db) {
    await _db.destroy()
    _db = null
  }
}

export { type Knex }
