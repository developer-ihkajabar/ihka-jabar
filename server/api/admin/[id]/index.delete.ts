import { eq } from 'drizzle-orm'
import z from 'zod'
import { adminTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.number(),
  }).parse)

  await db.delete(adminTable).where(eq(adminTable.id, id))

  setResponseStatus(event, 200, 'Admin berhasil dihapus')
  return 'Admin berhasil dihapus'
})
