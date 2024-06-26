import { db } from "@/db"
import { usersChats } from "@/db/schema"
import { User } from "@/types"
import { eq, sql } from "drizzle-orm"
import { FormatList } from "../text"

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
      lastMessage: messages[0] ?? null,
      unseenMessages
    }
  })
}

export const getChatByID = async (id: number) => {
  const chat = await db.query.chats.findFirst({
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
        limit: 50
      },
    },
    where: (m, { and, eq, isNull }) => and(eq(m.id, id), isNull(m.deletedAt))
  })

  if (!chat) return null

  return {
    id,
    title: chat.title,
    type: chat.type,
    createdAt: chat.createdAt,
    deletedAt: chat.deletedAt,
    users: chat.usersChats.map(uc => uc.user),
    messages: chat.messages.reverse()
  }
}

export const GetChatTitle = ({ title, type, users, currentUser }: { title?: string | null, type: string, users: User[], currentUser: number }) => {
  const nombres = users.map(u => u.name.split(' ')[0])
  const groupTitle = type === 'group' ? title || FormatList(nombres) : null
  const previewTitle =  groupTitle || users.find(u => u.id !== currentUser)!.name

  return previewTitle
}

export const GetChatAvatar = ({ users, userId }: { type: string, users: User[], userId: number }) => {
  return users.find(u => u.id !== userId)!.profilePicture
}

export * from "./message"