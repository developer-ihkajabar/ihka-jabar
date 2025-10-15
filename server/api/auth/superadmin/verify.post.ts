import { validateJWT } from 'oslo/jwt'

export default defineEventHandler(async (event) => {
  // const prisma = new PrismaClient()
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = event.context.cloudflare.env.DB

  if (!token)
    return

  try {
    const jwt = await validateJWT('HS256', jwtSecret, token)
    const id = (jwt.payload as { id: string }).id
    const superadmin = await db.prepare('select * from superadmin where id = ?').bind(id).first()
    return superadmin
  }
  catch (error) {
    setResponseStatus(event, 401)
    return 'Invalid token'
  }
})
