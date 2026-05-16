#!/usr/bin/env node

/**
 * CLI wrapper for Knex migrations and seeds.
 * Usage: node scripts/db.js <command> [args]
 * Commands: migrate:latest, migrate:rollback, migrate:make <name>, seed:run, seed:make <name>
 */

import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const env = process.env.NODE_ENV || 'development'
const [, , command, ...args] = process.argv

const knex = require('knex')

const configs = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: resolve(__dirname, '../db/development.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: resolve(__dirname, '../server/migrations'),
    },
    seeds: {
      directory: resolve(__dirname, '../server/seeds'),
    },
  },
  test: {
    client: 'better-sqlite3',
    connection: {
      filename: resolve(__dirname, '../db/test.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: resolve(__dirname, '../server/migrations'),
    },
    seeds: {
      directory: resolve(__dirname, '../server/seeds'),
    },
  },
  production: {
    client: process.env.DB_CLIENT || 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: resolve(__dirname, '../server/migrations'),
    },
    seeds: {
      directory: resolve(__dirname, '../server/seeds'),
    },
  },
}

const db = knex(configs[env] ?? configs.development)

async function run() {
  try {
    switch (command) {
      case 'migrate:latest':
        await db.migrate.latest()
        console.log('Migrations ran successfully.')
        break
      case 'migrate:rollback':
        await db.migrate.rollback()
        console.log('Rollback completed.')
        break
      case 'migrate:make':
        if (!args[0]) throw new Error('Migration name is required.')
        await db.migrate.make(args[0])
        console.log(`Migration "${args[0]}" created.`)
        break
      case 'seed:run':
        await db.seed.run()
        console.log('Seeds ran successfully.')
        break
      case 'seed:make':
        if (!args[0]) throw new Error('Seed name is required.')
        await db.seed.make(args[0])
        console.log(`Seed "${args[0]}" created.`)
        break
      default:
        console.error(`Unknown command: ${command}`)
        console.error('Available: migrate:latest, migrate:rollback, migrate:make, seed:run, seed:make')
        process.exit(1)
    }
  } catch (err) {
    console.error('DB error:', err.message)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

run()
