import z from 'zod'

const DetailNewsRequestParamSchema = z.object({
  beritaId: z.string().regex(/^\d+$/).transform(Number),
})

export default defineEventHandler(async (event) => {
  const { beritaId } = await getValidatedRouterParams(event, DetailNewsRequestParamSchema.parse)

  const db = getDb(event)

  const news = await db.query.newsTable.findFirst({
    where: (newsTable, { eq }) => eq(newsTable.id, beritaId),
  })

  return news
})
