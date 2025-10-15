export default defineEventHandler(async (event) => {
  const newsId = getRouterParam(event, 'beritaId')
  const db = event.context.cloudflare.env.DB

  const news = await db.prepare('select * from news where id = ?').bind(newsId).first()
  return news
})
