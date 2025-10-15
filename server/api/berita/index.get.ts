export default defineEventHandler(async (event) => {
  const db = getDb(event)

  const news = await db.query.newsTable.findMany()

  return news
})
