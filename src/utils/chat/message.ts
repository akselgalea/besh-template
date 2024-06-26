import { db } from "@/db"
import { messages } from "@/db/schema"

export const InsertMessage = async (chatId: number, userId: number, text: string) => {
  const message = await db.insert(messages).values({
    chatId,
    userId,
    text,
    seenAt: null
  }).returning()

  if (!message) return null

  return message[0]
}

export const GetMessagesByChatId = async (id: number, offset = 0) => {
  return db.query.messages.findMany({
    with: {
      user: true,
    },
    limit: 50,
    offset,
    where: (m, { and, eq, isNull }) => and(eq(m.chatId, id), isNull(m.deletedAt)),
    orderBy: (m, { asc }) => asc(m.createdAt)
  }).then(messages => messages.reverse())
}