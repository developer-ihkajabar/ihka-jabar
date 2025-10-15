import { z } from 'zod'
import { AdminInsert, adminTable } from '~~/server/db/schema'

const CreateAdminRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(3),
  cabangId: z.number().optional(),
  isAdminDaerah: z.boolean(),
  isModerator: z.boolean(),
})

export default defineEventHandler(async (event) => {
  const db = getDb(event)
  const { email, password, name, cabangId, isAdminDaerah, isModerator } = await readValidatedBody(event, CreateAdminRequestSchema.parse)

  const adminData: AdminInsert = {
    email,
    password,
    name,
    cabangId,
    isAdminDaerah,
    isModerator,
    isActive: true,
  }

  const checkAdmin = await db.query.adminTable.findFirst({
    where: (adminTable, { eq }) => eq(adminTable.email, email)
  })
  if (checkAdmin?.email === email) {
    setResponseStatus(event, 400, 'Email sudah terdaftar')
    return 'Email sudah terdaftar'
  }
  else if (checkAdmin?.name === name) {
    setResponseStatus(event, 400, 'Nama sudah terdaftar')
    return 'Nama sudah terdaftar'
  }

  await db.insert(adminTable).values(adminData)

  setResponseStatus(event, 201, 'Admin berhasil ditambahkan')
  return 'Admin berhasil ditambahkan'
})
