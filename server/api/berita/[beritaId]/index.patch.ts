export default defineEventHandler(async (event) => {
  const newsId = getRouterParam(event, 'beritaId')
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = event.context.cloudflare.env.DB

  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const {
    is_published,
  }: {
    is_published: boolean
  } = await readBody(event)

  if (is_published) {
    await db.prepare('update news set is_published = 1 where id = ?').bind(newsId).run()
  }
  else {
    await db.prepare('update news set is_published = 0 where id = ?').bind(newsId).run()
  }
})
