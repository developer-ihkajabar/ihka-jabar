import { eq } from 'drizzle-orm'
import { validateJWT } from 'oslo/jwt'
import { adminTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = getDb(event)
  if (!token)
    return

  const jwt = await validateJWT('HS256', jwtSecret, token)
  const id = (jwt.payload as { id: string }).id
  const admin = await db.query.adminTable.findFirst({ where: eq(adminTable.id, Number.parseInt(id)) })
  return admin
})
