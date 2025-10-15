import { validateJWT } from 'oslo/jwt'

export default defineEventHandler(async (event) => {
  // const adminId = event.context.adminId
  // const adminType = event.context.adminType
  const token = event.node.req.headers.authorization?.split(' ')[1]
  const db = event.context.cloudflare.env.DB
  const kv = event.context.cloudflare.env['ihka-jabar-kv']

  if (!token) {
    setResponseStatus(event, 401, 'Unauthorized')
    return 'Unauthorized'
  }

  const formdata = await readFormData(event)
  const title = formdata.get('title') as string
  const content = formdata.get('content') as string
  const image = formdata.get('image') as File

  if (!title || !content || !image) {
    setResponseStatus(event, 400, 'Title, content dan image harus diisi')
    return 'Title, content dan image harus diisi'
  }

  const adminId = ((await validateJWT('HS256', jwtSecret, token)).payload as { id: string }).id
  const cabangId = (await db.prepare('select cabang_id from admin where id = ?').bind(adminId).first())?.cabang_id as string | null

  if (!cabangId) {
    await db.prepare('insert into news (title, content_html, admin_id) values (?, ?, ?)').bind(title, content, adminId).run()
    const newsId = (await db.prepare('select last_insert_rowid() as id').first())?.id as string
    const news = await db.prepare('select * from news where id = ?').bind(newsId).first()
    await kv.put(`images/news/${newsId}.png`, Buffer.from(await image.arrayBuffer()).toString('base64'))
    return news
  }
  else {
    await db.prepare('insert into news (title, content_html, admin_id, cabang_id) values (?, ?, ?, ?)').bind(title, content, adminId, cabangId).run()
    const newsId = (await db.prepare('select last_insert_rowid() as id').first())?.id as string
    const news = await db.prepare('select * from news where id = ?').bind(newsId).first()
    await kv.put(`images/news/${newsId}.png`, Buffer.from(await image.arrayBuffer()).toString('base64'))
    return news
  }
})
