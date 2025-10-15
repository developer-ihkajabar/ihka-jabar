import { eq } from 'drizzle-orm'
import { validateJWT } from 'oslo/jwt'
import z from 'zod'
import { newsTable } from '~~/server/db/schema'

const DetailNewsRequestParamSchema = z.object({
  beritaId: z.string().regex(/^[0-9]+$/).transform(Number)
})

export default defineEventHandler(async (event) => {
  const { beritaId } = await getValidatedRouterParams(event, DetailNewsRequestParamSchema.parse)

  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = getDb(event)
  const kv = event.context.cloudflare.env['ihka-jabar-kv']

  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  // TODO: check only admin can delete news
  // const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id

  await db.delete(newsTable).where(eq(newsTable.id, beritaId))

  await kv.delete(`images/news/${beritaId}`)
})
