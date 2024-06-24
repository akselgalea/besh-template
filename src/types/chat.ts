import { User } from "./auth"

export type Message = {
  id: number
  text: string
  type: "text" | "image" | "video" | "audio" | "file" | "location" | "sticker" | "contact" | "document" | "unknown"
  createdAt: Date
  deletedAt: Date | null
  chatId: number
  userId: number
  updatedAt: Date | null
  user?: User
}

export type LastMessage = Message & { user: User }

export type Chat = {
  id: number
  title?: string | null
  type: 'private' | 'group',
  createdAt: Date,
  deletedAt: Date | null,
  users?: User[],
  messages?: Message[]
}
