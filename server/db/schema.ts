import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const cabangTable = sqliteTable('cabang', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique(),
})

export const adminTable = sqliteTable('admin', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  name: text('name'),
  memberId: text('member_id'),
  noTelp: text('no_telp'),
  cabangId: integer('cabang_id').references(() => cabangTable.id),
  isAdminDaerah: integer('is_admin_daerah', { mode: 'boolean' }),
  isModerator: integer('is_moderator', { mode: 'boolean' }),
  isActive: integer('is_active', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const newsTable = sqliteTable('news', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').unique().notNull(),
  contentHtml: text('content_html').notNull(),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(false),
  imageUrl: text('image_url'),
  adminId: integer('admin_id').references(() => adminTable.id),
  cabangId: integer('cabang_id').references(() => cabangTable.id),
  approvedBy: integer('approved_by').references(() => adminTable.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const strukturOrganisasiTable = sqliteTable('struktur_organisasi', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  department: text('department'),
  daerahId: integer('daerah_id').notNull(),
})

export const superadminTable = sqliteTable('superadmin', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username'),
  password: text('password'),
})

export const cabangRelations = relations(cabangTable, ({ many }) => ({
  admins: many(adminTable),
  news: many(newsTable),
}))

export const adminRelations = relations(adminTable, ({ one, many }) => ({
  cabang: one(cabangTable, {
    fields: [adminTable.cabangId],
    references: [cabangTable.id],
  }),
  news: many(newsTable),
  approvedNews: many(newsTable, { relationName: 'approvedNews' }),
}))

export const newsRelations = relations(newsTable, ({ one }) => ({
  admin: one(adminTable, {
    fields: [newsTable.adminId],
    references: [adminTable.id],
  }),
  cabang: one(cabangTable, {
    fields: [newsTable.cabangId],
    references: [cabangTable.id],
  }),
  approvedByAdmin: one(adminTable, {
    fields: [newsTable.approvedBy],
    references: [adminTable.id],
    relationName: 'approvedNews',
  }),
}))

export type AdminSelect = typeof adminTable.$inferSelect
export type AdminInsert = typeof adminTable.$inferInsert
export type CabangSelect = typeof cabangTable.$inferSelect
export type CabangInsert = typeof cabangTable.$inferInsert
export type NewsSelect = typeof newsTable.$inferSelect
export type NewsInsert = typeof newsTable.$inferInsert
export type SuperadminSelect = typeof superadminTable.$inferSelect
export type SuperadminInsert = typeof superadminTable.$inferInsert
