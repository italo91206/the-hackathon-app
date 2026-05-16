import { useDB } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const db = useDB()
  const users = await db('users').select('id', 'name', 'email', 'role', 'active', 'created_at')
  return users
})
