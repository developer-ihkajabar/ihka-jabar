// import { prisma } from "~~/prisma/db"
// import { AuthType } from "~~/types/authType"

import { validateJWT } from 'oslo/jwt'

export default defineEventHandler(async (event) => {
  const newsId = getRouterParam(event, 'beritaId')

  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = event.context.cloudflare.env.DB

  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id
  const admin = await db.prepare('select * from admin where id = ?').bind(adminId).first()
  const isModerator = admin!.is_moderator === 1

  if (!isModerator) {
    setResponseStatus(event, 401)
    return 'Unauthorized: Anda bukan moderator'
  }

  const news = await db.prepare('select * from news where id = ?').bind(newsId).first()

  await db.prepare('update news set is_published = 0, approved_by = ? where id = ?').bind(adminId, newsId).run()
})
