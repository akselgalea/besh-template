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
}

export type LastMessage = Message & { user: User }
