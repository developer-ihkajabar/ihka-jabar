import z from 'zod'

const GetNewssQuerySchema = z.object({
  limit: z.string().regex(/^\d+$/).optional().transform(Number),
  page: z.string().regex(/^\d+$/).optional().transform(Number),
  perPage: z.string().regex(/^\d+$/).optional().transform(Number),
})

export default defineEventHandler(async (event) => {
  const db = getDb(event)

  const { limit, page, perPage } = await getValidatedQuery(event, GetNewssQuerySchema.parse)

  const news = await db.query.newsTable.findMany({
    limit: limit || 10,
    offset: (page - 1) * perPage,
  })

  return news
})
