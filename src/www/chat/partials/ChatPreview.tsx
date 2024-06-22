import { User } from "@/types"
import { LastMessage } from "@/types/chat"
import { FormatList } from "@/utils/text"

export const ChatPreview = ({ title, type, users, userId, lastMessage }: { title?: string | null, type: string, users: User[], userId: number, lastMessage: LastMessage }) => {
  const nombres = users.map(u => u.name.split(' ')[0])
  const groupTitle = type === 'group' ? title || FormatList(nombres) : null
  const previewTitle =  groupTitle || users.find(u => u.id !== userId)!.name

  return (
    <div class="grid grid-cols-[50px_1fr] gap-2 p-2 items-center">
      <img class="rounded-full" width={50} src={lastMessage.user.profilePicture} alt="profile picture" />
      <div class="w-full">
        <div class="flex flex-grow justify-between gap-2 items-center">
          <h3 class="text-base">{ previewTitle }</h3>
          <span class="text-xs max-w-100px">{ new Date(lastMessage.createdAt).toDateString() }</span>
        </div>
        <p class="mt-1 text-sm">{ lastMessage.text }</p>
      </div>
    </div>
  )
}