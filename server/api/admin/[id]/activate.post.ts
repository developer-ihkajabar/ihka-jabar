export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const id = Number(getRouterParam(event, 'id'))

  await db.prepare(`
    UPDATE admin
    SET is_active = 1
    WHERE id = ?;
  `).bind(id).run()

  setResponseStatus(event, 200, 'Admin activated')
  return 'Admin activated'
})
