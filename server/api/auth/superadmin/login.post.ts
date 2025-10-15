import { eq } from 'drizzle-orm'
import { TimeSpan } from 'oslo'
import { createJWT } from 'oslo/jwt' // https://oslo.js.org/reference/jwt/createJWT
import { superadminTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const db = getDb(event)

  const {
    username,
    password,
  }: {
    username: string
    password: string
  } = await readBody(event)

  const superadmin = await db.query.superadminTable.findFirst({ where: eq(superadminTable.username, username) })

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
