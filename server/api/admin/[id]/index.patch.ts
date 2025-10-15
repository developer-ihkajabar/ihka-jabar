export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const id = Number(getRouterParam(event, 'id'))

  const {
    email,
    password,
    name,
    no_telp,
  } = await readBody(event)

  await db.prepare(`
    UPDATE admin
    SET email = ?,
        password = ?,
        name = ?,
        no_telp = ?
    WHERE id = ?;
  `).bind(
    email,
    password,
    name,
    no_telp,
    id,
  ).run()

  setResponseStatus(event, 200, 'Admin berhasil diupdate')
  return 'Admin berhasil diupdate'
})
