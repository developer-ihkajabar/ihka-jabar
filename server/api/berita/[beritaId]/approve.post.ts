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
  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id
  const admin = await db.query.adminTable.findFirst({
    where: (adminTable, { eq }) => eq(adminTable.id, Number.parseInt(adminId))
  })
  const isModerator = admin!.isModerator === true

  if (!isModerator) {
    setResponseStatus(event, 401)
    return 'Unauthorized: Anda bukan moderator'
  }

  const news = await db.query.newsTable.findFirst({
    where: (newsTable, { eq }) => eq(newsTable.id, beritaId)
  })

  if (news!.adminId === Number.parseInt(adminId)) {
    setResponseStatus(event, 401)
    return 'Tidak bisa menyetujui berita sendiri'
  }

  await db.update(newsTable).set({ isPublished: true, approvedBy: Number.parseInt(adminId) }).where(eq(newsTable.id, beritaId))

  return 'Berita berhasil disetujui'
})
