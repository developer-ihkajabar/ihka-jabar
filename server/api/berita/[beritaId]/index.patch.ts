import { eq } from "drizzle-orm"
import z from "zod"
import { newsTable } from "~~/server/db/schema"

const DetailNewsRequestParamSchema = z.object({
  beritaId: z.string().regex(/^[0-9]+$/).transform(Number)
})

export default defineEventHandler(async (event) => {
  const { beritaId } = await getValidatedRouterParams(event, DetailNewsRequestParamSchema.parse)

  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = getDb(event)

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
    await db.update(newsTable).set({ isPublished: true }).where(eq(newsTable.id, beritaId))
  }
  else {
    await db.update(newsTable).set({ isPublished: false }).where(eq(newsTable.id, beritaId))
  }
})
