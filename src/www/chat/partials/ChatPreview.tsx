import { User } from "@/types"
import { LastMessage } from "@/types/chat"
import { GetChatTitle } from "@/utils/chat"

export const ChatPreview = ({ id, title, type, users, userId, lastMessage }: { id: number, title?: string | null, type: string, users: User[], userId: number, lastMessage: LastMessage }) => {
  const previewTitle = GetChatTitle({ title, type, users, currentUser: userId })

  return (
    <div class="grid grid-cols-[50px_1fr] gap-2 p-2 items-center hover:bg-gray-100 hover:cursor-pointer" hx-get={`/chat/${id}`} hx-target="#chat-box">
      <img class="rounded-full" width={50} src={lastMessage.user.profilePicture} alt="profile picture" />
      <div class="w-full">
        <div class="flex flex-grow justify-between gap-2 items-center">
          <h3 class="text-base">{ previewTitle }</h3>
          <span class="text-xs max-w-100px">{ new Date(lastMessage.createdAt).toDateString() }</span>
        </div>
        <p class="mt-1 text-sm">{ userId === lastMessage.userId ? 'You:' : `${lastMessage.user.name}:` } { lastMessage.text }</p>
      </div>
    </div>
  )
}