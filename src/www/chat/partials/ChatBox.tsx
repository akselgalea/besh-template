import { Message } from "@/types/chat"

export const ChatBox = ({ chatId, userId, messages }: { chatId: number, userId: number, messages: Message[] }) => {
  return (
    <div id="chat-box" class="grid place-items-center h-80dvh">
      <ul class="flex flex-col gap-3 w-full">
        {
          messages.map(({ id, text, type, createdAt, updatedAt, deletedAt }) => (
            <li class=""></li>
          ))
        }
      </ul>
    </div>
  )
}