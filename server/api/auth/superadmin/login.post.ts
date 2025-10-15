import { TimeSpan } from 'oslo'
import { createJWT } from 'oslo/jwt' // https://oslo.js.org/reference/jwt/createJWT

export default defineEventHandler(async (event) => {
  const db = event.context.cloudflare.env.DB

  const {
    username,
    password,
  }: {
    username: string
    password: string
  } = await readBody(event)

  const superadmin = await db.prepare('select * from superadmin where username = ?').bind(username).first()

  if (!superadmin) {
    setResponseStatus(event, 401)
    return 'Invalid username'
  }
  else if (superadmin.password !== password) {
    setResponseStatus(event, 401)
    return 'Invalid password'
  }

  const payload = {
    id: superadmin.id,
  }
  const token = await createJWT('HS256', jwtSecret, payload, {
    expiresIn: new TimeSpan(30, 'd'),
  })

  return {
    superadmin,
    token,
  }
})
