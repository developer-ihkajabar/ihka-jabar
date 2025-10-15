import type { SuperadminInsert } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { superadminTable } from '~~/server/db/schema'

const SuperadminUpdateParamSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
})

const SuperadminUpdateSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, SuperadminUpdateParamSchema.parse)
  const db = getDb(event)

  const {
    username,
    password,
  } = await readValidatedBody(event, SuperadminUpdateSchema.parse)

  const superadminData: SuperadminInsert = {
    username,
    password,
  }

  await db.update(superadminTable).set(superadminData).where(eq(superadminTable.id, id))

  setResponseStatus(event, 200, 'Superadmin berhasil diupdate')
  return 'Superadmin berhasil diupdate'
})
