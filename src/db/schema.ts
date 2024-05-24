import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").unique().notNull(),
  emailVerifiedAt: integer("email_verified_at", { mode: 'timestamp' }),
  password: text("password").notNull(),
  profilePicture: text("profile_picture").default('/public/images/profile-pictures/default.svg'),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer("deleted_at", { mode: 'timestamp' })
})