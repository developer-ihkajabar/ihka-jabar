export default eventHandler(async (event) => {
  const db = getDb(event)
  const id = Number(getRouterParam(event, 'id'))

  await db.prepare(`
    DELETE FROM admin
    WHERE id = ?;
  `).bind(id).run()

  setResponseStatus(event, 200, 'Admin berhasil dihapus')
  return 'Admin berhasil dihapus'
})
