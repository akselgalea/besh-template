import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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

export const chats = sqliteTable("chats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title"),
  type: text("type", { enum: ['private', 'group'] }).notNull().default('private'),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer("deleted_at", { mode: 'timestamp' })
})

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  chatId: integer("chat_id").notNull().references(() => chats.id, { onDelete: 'cascade' }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'no action' }),
  text: text("text").notNull(),
  type: text("type", { enum: ['text', 'image', 'video', 'audio', 'file', 'location', 'sticker', 'contact', 'document', 'unknown'] }).notNull().default('text'),
  seenAt: integer("seen_at", { mode: 'timestamp' }),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: 'timestamp' }),
  deletedAt: integer("deleted_at", { mode: 'timestamp' })
})

export const usersChats = sqliteTable("users_chats", {
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'no action' }),
  chatId: integer("chat_id").notNull().references(() => chats.id, { onDelete: 'cascade' }),
  isAdmin: integer("is_admin", { mode: 'boolean' }).notNull().default(false),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  deletedAt: integer("deleted_at", { mode: 'timestamp' })
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.chatId] })
}))


export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  usersChats: many(usersChats)
}))

export const chatsRelations = relations(chats, ({ many }) => ({
  messages: many(messages),
  usersChats: many(usersChats)
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id]
  }),
  user: one(users, {
    fields: [messages.userId],
    references: [users.id]
  })
}))

export const usersChatsRelations = relations(usersChats, ({ one }) => ({
  user: one(users, {
    fields: [usersChats.userId],
    references: [users.id]
  }),
  chat: one(chats, {
    fields: [usersChats.chatId],
    references: [chats.id]
  })
}))