// import { prisma } from "~~/prisma/db"
// import { AuthType } from "~~/types/authType"

import { eq } from 'drizzle-orm'
import { validateJWT } from 'oslo/jwt'
import z from 'zod'
import { newsTable } from '~~/server/db/schema'

const DetailNewsRequestParamSchema = z.object({
  newsId: z.string().regex(/^\d+$/).transform(Number),
})

export default defineEventHandler(async (event) => {
  const { newsId } = await getValidatedRouterParams(event, DetailNewsRequestParamSchema.parse)

  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = getDb(event)

  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id
  const admin = await db.query.adminTable.findFirst({
    where: (adminTable, { eq }) => eq(adminTable.id, Number.parseInt(adminId)),
  })
  const isModerator = admin!.isModerator === true

  if (!isModerator) {
    setResponseStatus(event, 401)
    return 'Unauthorized: Anda bukan moderator'
  }

  const news = await db.query.newsTable.findFirst({
    where: (newsTable, { eq }) => eq(newsTable.id, newsId),
  })

  if (news!.adminId === Number.parseInt(adminId)) {
    setResponseStatus(event, 401)
    return 'Tidak bisa menyetujui berita sendiri'
  }

  await db.update(newsTable).set({ isPublished: false, approvedBy: Number.parseInt(adminId) }).where(eq(newsTable.id, newsId))

  return 'Berita berhasil disetujui'
})
