import type { NewsInsert } from '~~/server/db/schema'
import { validateJWT } from 'oslo/jwt'
import { newsTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = getDb(event)
  const kv = event.context.cloudflare.env['ihka-jabar-kv'] as KVNamespace

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const formdata = await readFormData(event)

  const title = formdata.get('title') as string
  const content = formdata.get('content') as string
  const image = formdata.get('image') as File

  if (!title || !content || !image) {
    setResponseStatus(event, 400, 'Title, content dan image harus diisi')
    return 'Title, content dan image harus diisi'
  }

  const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id
  const admin = await db.query.adminTable.findFirst({
    where: (adminTable, { eq }) => eq(adminTable.id, Number.parseInt(adminId)),
  })

  if (!admin) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const cabangId = admin.cabangId

  const newsData: NewsInsert = {
    title,
    contentHtml: content,
    adminId: Number.parseInt(adminId),
    ...(cabangId ? { cabangId } : {}),
  }

  const [createdNews] = await db.insert(newsTable).values(newsData).returning()

  if (!createdNews) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create news',
    })
  }

  await kv.put(`images/news/${createdNews.id}.png`, Buffer.from(await image.arrayBuffer()).toString('base64'))

  return createdNews
})
