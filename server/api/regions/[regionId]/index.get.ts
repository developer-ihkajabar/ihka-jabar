import z from 'zod'

const DetailRegionRequestParamSchema = z.object({
  regionId: z.string().regex(/^\d+$/).transform(Number),
})

export default defineEventHandler(async (event) => {
  const { regionId } = await getValidatedRouterParams(event, DetailRegionRequestParamSchema.parse)

  const db = getDb(event)

  const region = await db.query.cabangTable.findFirst({
    where: (regionTable, { eq }) => eq(regionTable.id, regionId),
  })

  return region
})
