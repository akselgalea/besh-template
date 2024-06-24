import { User } from "@/types"
import { Chat } from "@/types/chat"
import { GetChatTitle } from "@/utils/chat"

export const ChatBox = ({ chat, userId: uid }: { chat: Chat, userId: number  }) => {
  const { title, type, users, messages } = chat

  const chatTitle = GetChatTitle({ title, type, users: users!, currentUser: uid })
  return (
    <div id="chat-box" class="grid grid-rows-[auto_1fr_auto] place-items-center h-80dvh w-full py-5 px-12 border-1 border-gray-200 rounded">
      <div>
        { chatTitle }
      </div>
      
      <ul class="flex flex-col gap-3 w-full h-full overflow-scroll" id="chat-messages">
        {
          messages!.map(({ text, userId }) => (
            <li class={'flex flex-col gap-1 ' + (userId === uid ? 'items-end' : 'items-start') }>
              <p class={'w-fit rounded-lg p-2 ' + (userId === uid ? 'bg-lightblue-500' : 'bg-lightblue-200')}>{text}</p>
            </li>
          ))
        }
      </ul>

      <form id="chat-input" class="w-full">
        <div class="flex gap-2 items-center">
          <input class="w-full rounded-lg px-4 py-2 border-gray-200 border-1 outline-0" type="text" placeholder="Send a message..." />
          <button class="bg-blue-500! text-white rounded-lg px-4 py-2" type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}