import { eq } from "drizzle-orm"
import z from "zod"
import { adminTable } from "~~/server/db/schema"

export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.number(),
  }).parse)

  await db.update(adminTable).set({ isActive: true }).where(eq(adminTable.id, id))

  setResponseStatus(event, 200, 'Admin activated')
  return 'Admin activated'
})
