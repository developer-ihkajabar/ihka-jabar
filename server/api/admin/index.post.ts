export default defineEventHandler(async (event) => {
  const {
    email,
    password,
    name,
    cabangId: cabang_id,
    isAdminDaerah: is_admin_daerah,
    isModerator: is_moderator,
  }: {
    email: string
    password: string
    name: string
    cabangId?: number
    isAdminDaerah: boolean
    isModerator: boolean
  } = await readBody(event)

  if (!email || !password || !name || is_moderator === undefined) {
    setResponseStatus(event, 400, 'Email, password, is_moderator dan nama harus diisi')
    return 'Email, password, is_moderator dan nama harus diisi'
  }

  const db = getDb(event)

  const admin = await db.prepare('SELECT * FROM admin WHERE email = ?').bind(email).first()

  if (admin?.email === email) {
    setResponseStatus(event, 400, 'Email sudah terdaftar')
    return 'Email sudah terdaftar'
  }
  else if (admin?.name === name) {
    setResponseStatus(event, 400, 'Nama sudah terdaftar')
    return 'Nama sudah terdaftar'
  }

  await db.prepare('INSERT INTO admin (email, password, name, cabang_id, is_admin_daerah, is_moderator, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(email, password, name, cabang_id ?? null, is_admin_daerah ?? null, is_moderator, true).run()

  setResponseStatus(event, 201, 'Admin berhasil ditambahkan')
  return 'Admin berhasil ditambahkan'
})
