import { eq } from 'drizzle-orm'
import { validateJWT } from 'oslo/jwt'
import { superadminTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  // const prisma = new PrismaClient()
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = getDb(event)

  if (!token)
    return

  const jwt = await validateJWT('HS256', jwtSecret, token)
  const id = (jwt.payload as { id: string }).id
  const superadmin = await db.query.superadminTable.findFirst({ where: eq(superadminTable.id, Number.parseInt(id)) })

  return superadmin
})
