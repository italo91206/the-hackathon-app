import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del()

  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password_hash: '$2b$10$placeholder_hash_here',
      role: 'admin',
      active: true,
    },
    {
      name: 'Regular User',
      email: 'user@example.com',
      password_hash: '$2b$10$placeholder_hash_here',
      role: 'user',
      active: true,
    },
  ])
}
