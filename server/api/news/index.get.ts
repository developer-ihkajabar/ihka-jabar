import z from 'zod'

const GetNewssQuerySchema = z.object({
  limit: z.string().regex(/^\d+$/).optional().transform(Number),
  page: z.string().regex(/^\d+$/).optional().transform(Number),
  perPage: z.string().regex(/^\d+$/).optional().transform(Number),
  regencyId: z.string().regex(/^\d+$/).optional().transform(Number),
})

export default defineEventHandler(async (event) => {
  const db = getDb(event)

  const { limit, page, perPage, regencyId } = await getValidatedQuery(event, GetNewssQuerySchema.parse)

  const news = await db.query.newsTable.findMany({
    limit: limit || 10,
    offset: (page - 1) * perPage,
    where: (newsTable, { eq, and }) => and(
      eq(newsTable.isPublished, true),
      (regencyId ? eq(newsTable.cabangId, regencyId) : undefined),
    ),
  })

  return news
})
