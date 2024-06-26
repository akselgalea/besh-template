import { User } from "@/types"
import { LastMessage } from "@/types/chat"
import { GetChatTitle, GetChatAvatar } from "@/utils/chat"

export const ChatPreview = ({ id, title, type, users, userId, lastMessage }: { id: number, title?: string | null, type: string, users: User[], userId: number, lastMessage: LastMessage | null }) => {
  const previewTitle = GetChatTitle({ title, type, users, currentUser: userId })
  const avatar = GetChatAvatar({ type, users, userId })

  return (
    <div
      class="w-full grid grid-cols-[50px_1fr] gap-2 p-2 items-center hover:bg-gray-100 hover:cursor-pointer"
      id={`chat-preview-${id}`}
      hx-get={`/chat/${id}`}
      hx-disabled-elt="this"
      hx-target="#chat-box"
      role="button"
      tabindex="0"
      _="
        on htmx:beforeRequest
          if $selectedChat is me then
            event.preventDefault()
          else 
            set $selectedChat to event.target
            take .bg-gray-100 from #chats.li for event.target
          end   
      "
    >
      <img class="rounded-full" width={50} src={avatar} alt="profile picture" />
      <div class="w-full">
        <div class="flex flex-grow justify-between gap-2 items-center">
          <h3 class="text-base">{ previewTitle }</h3>
          {
            lastMessage
            ?
              <span class="text-xs max-w-100px">{ new Date(lastMessage.createdAt).toDateString() }</span>
            : ''
          }
        </div>
        <p class="mt-1 text-sm text-left">
          {
            lastMessage
            ?
              userId === lastMessage.userId ? `You: ${lastMessage.text}` : `${lastMessage.user.name}: ${lastMessage.text}`
            :
              'Start the conversation'
          }
          </p>
      </div>
    </div>
  )
}