import { useDB } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDB()

  const user = await db('users')
    .select('id', 'name', 'email', 'role', 'active', 'created_at')
    .where({ id })
    .first()

  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  return user
})
