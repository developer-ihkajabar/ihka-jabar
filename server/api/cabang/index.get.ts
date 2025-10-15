export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const data = await db.query.cabangTable.findMany()
  return data
})
