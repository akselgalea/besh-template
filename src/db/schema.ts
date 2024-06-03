import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  emailVerifiedAt: integer("email_verified_at", { mode: 'timestamp' }),
  password: text("password"),
  profilePicture: text("profile_picture").notNull().default('/public/images/profile-pictures/default.svg'),
  type: text("type", { enum: ['local', 'github', 'google'] }).notNull().default('local'),
  typeUserId: text("type_user_id"),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer("deleted_at", { mode: 'timestamp' })
})