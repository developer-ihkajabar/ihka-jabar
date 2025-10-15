export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const id = Number(getRouterParam(event, 'id'))

  const {
    username,
    password,
  } = await readBody(event)

  if (!username) {
    await db.prepare(`
      UPDATE superadmin
      SET password = ?
      WHERE id = ?;
    `).bind(
      password,
      id,
    ).run()
  }
  else if (!password) {
    await db.prepare(`
      UPDATE superadmin
      SET username = ?
      WHERE id = ?;
    `).bind(
      username,
      id,
    ).run()
  }

  setResponseStatus(event, 200, 'Superadmin berhasil diupdate')
  return 'Superadmin berhasil diupdate'
})
