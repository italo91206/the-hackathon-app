import type { Knex } from 'knex'
import { resolve } from 'path'

const baseDir = resolve(import.meta.dirname ?? '.')

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: resolve(baseDir, 'db/development.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: resolve(baseDir, 'server/migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: resolve(baseDir, 'server/seeds'),
      extension: 'ts',
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
      extension: 'ts',
    },
    seeds: {
      directory: resolve(baseDir, 'server/seeds'),
      extension: 'ts',
    },
  },

  production: {
    client: process.env.DB_CLIENT || 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: resolve(baseDir, 'server/migrations'),
    },
    seeds: {
      directory: resolve(baseDir, 'server/seeds'),
    },
  },
}

export default config
