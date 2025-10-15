import { validateJWT } from 'oslo/jwt'

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = event.context.cloudflare.env.DB
  if (!token)
    return

  try {
    const jwt = await validateJWT('HS256', jwtSecret, token)
    const id = (jwt.payload as { id: string }).id
    const admin = await db.prepare('select * from admin where id = ?').bind(id).first()
    return admin
  }
  catch (error) {
    setResponseStatus(event, 401)
    return 'Invalid token'
  }
})
