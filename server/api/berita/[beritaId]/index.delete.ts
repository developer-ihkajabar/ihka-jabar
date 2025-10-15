import { validateJWT } from 'oslo/jwt'

export default defineEventHandler(async (event) => {
  const newsId = getRouterParam(event, 'beritaId')

  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = event.context.cloudflare.env.DB
  const kv = event.context.cloudflare.env['ihka-jabar-kv']

  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id
  // const admin = await db.prepare('select * from admin where id = ?').bind(adminId).first()

  await db.prepare(`
    DELETE FROM news WHERE id = ?
  `).bind(newsId).run()

  await kv.delete(`images/news/${newsId}`)
  // if (!event.context.moderatorId && !event.context.adminId) {
  //   setResponseStatus(event, 401, 'Unauthorized: Anda bukan moderator atau admin')
  //   return 'Unauthorized: Anda bukan moderator atau admin'
  // }
  // const newsId = getRouterParam(event, 'beritaId')
  // await prisma.news.delete({
  //   where: { id: parseInt(newsId) }
  // })
  // await $fetch(`/api/berita/images/${newsId}`, {
  //   method: 'DELETE',
  // })
  // setResponseStatus(event, 200)
  // return new Response(null, { status: 200 })
})
