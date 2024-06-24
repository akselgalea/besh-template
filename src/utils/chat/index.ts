import { db } from "@/db"
import { usersChats } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export const getUserChatsByID = async (id: number) => {
  const chatsUser = db.select().from(usersChats).where(eq(usersChats.userId, id))
  
  const chats = await db.query.chats.findMany({
    with: {
      usersChats: {
        columns: {},
        with: {
          user: true
        }
      },
      messages: {
        with: {
          user: true
        },
        orderBy: (m, { desc }) => desc(m.createdAt),
        where: (m, { isNull }) => isNull(m.deletedAt),
        limit: 1
      },
    },
    extras: (c) => ({
      unseenMessages: sql<number>`(SELECT COUNT() FROM messages WHERE chat_id = ${c.id} AND seen_at IS NULL AND deleted_at IS NULL AND user_id != ${id})`.as('unseenMessages'),
    }),
    where: (c, { and, isNull, exists }) => and(isNull(c.deletedAt), exists(chatsUser))
  })
  
  return chats.map(({ id, title, type, createdAt, messages, usersChats, unseenMessages }) => {
    return {
      id,
      title,
      type,
      createdAt,
      users: usersChats.map(uc => uc.user),
      lastMessage: messages[0] ?? 'Start a new chat',
      unseenMessages
    }
  })
}