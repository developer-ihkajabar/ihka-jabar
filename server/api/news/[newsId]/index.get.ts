import z from 'zod'

const DetailNewsRequestParamSchema = z.object({
  newsId: z.string().regex(/^\d+$/).transform(Number),
})

export default defineEventHandler(async (event) => {
  const { newsId } = await getValidatedRouterParams(event, DetailNewsRequestParamSchema.parse)

  const db = getDb(event)

  const news = await db.query.newsTable.findFirst({
    where: (newsTable, { eq }) => eq(newsTable.id, newsId),
  })

  return news
})
