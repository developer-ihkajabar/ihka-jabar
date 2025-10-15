export default defineEventHandler(async (event) => {
  const db = getDb(event)

  const admins = await db.query.adminTable.findMany({
    orderBy: (adminTable, {desc}) => [desc(adminTable.id)]
  })
  
  return admins
})
