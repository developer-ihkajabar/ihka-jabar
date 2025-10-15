import { eq } from 'drizzle-orm'
import { TimeSpan } from 'oslo'
import { createJWT } from 'oslo/jwt' // https://oslo.js.org/reference/jwt/createJWT
import { adminTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const db = getDb(event)

  const {
    email,
    password,
  }: {
    email: string
    password: string
  } = await readBody(event)

  const admin = await db.query.adminTable.findFirst({ where: eq(adminTable.email, email) })

  if (!admin) {
    setResponseStatus(event, 401)
    return 'Invalid username'
  }
  else if (admin.password !== password) {
    setResponseStatus(event, 401)
    return 'Invalid password'
  }

  const payload = {
    id: admin.id,
  }
  const token = await createJWT('HS256', jwtSecret, payload, {
    expiresIn: new TimeSpan(30, 'd'),
  })

  return {
    admin,
    token,
  }
})
