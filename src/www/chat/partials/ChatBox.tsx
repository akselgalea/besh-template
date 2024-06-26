import { Chat, Message } from "@/types/chat"
import { GetChatTitle } from "@/utils/chat"

export const ChatBox = ({ chat, userId: uid }: { chat: Chat, userId: number  }) => {
  const { title, type, users, messages } = chat

  const chatTitle = GetChatTitle({ title, type, users: users!, currentUser: uid })
  return (
    <div id="chat-box" class="grid grid-rows-[auto_1fr_auto] place-items-center h-80dvh w-full py-5 px-12 border-1 border-gray-200 rounded">
      <div>
        { chatTitle }
      </div>
      
      <ul class="flex flex-col gap-3 w-full h-full overflow-scroll" id="chat-messages" _="on hx:wsAfterMessage">
        {
          messages!.map(({ text, userId }) => (
            <li class={'flex flex-col gap-1 ' + (userId === uid ? 'items-end' : 'items-start') }>
              <p class={'w-fit rounded-lg p-2 ' + (userId === uid ? 'bg-lightblue-500' : 'bg-lightblue-200')}>{text}</p>
            </li>
          ))
        }
      </ul>

      <form id="chat-input" class="w-full" ws-send>
        <div class="flex gap-2 items-center">
          <input type="hidden" name="chatId" value={String(chat.id)} />
          <input type="hidden" name="userId" value={String(uid)} />
          
          <input
            class="w-full rounded-lg px-4 py-2 border-gray-200 border-1 outline-0"
            id="input-message"
            name="message"
            type="text"
            placeholder="Send a message..."
            autofocus="true"
          />

          <button class="bg-blue-500! text-white rounded-lg px-4 py-2" type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export const MessageOOB = ({ message, currentUserId }: { message: Message, currentUserId?: number }) => {
  return (
    <div id="chat-messages" hx-swap-oob="beforeend">
      <li class={'flex flex-col gap-1 ' + (message.userId === currentUserId ? 'items-end' : 'items-start') } id={`message-${message.id}`}>
        <p class={'w-fit rounded-lg p-2 ' + (message.userId === currentUserId ? 'bg-lightblue-500' : 'bg-lightblue-200')}>{message.text}</p>
      </li>
    </div>
  )
}

export const MessageInputOOB = () => {
  return (
    <input
      id="input-message" hx-swap-oob="true"
      class="w-full rounded-lg px-4 py-2 border-gray-200 border-1 outline-0"
      name="message"
      type="text"
      placeholder="Send a message..."
      autofocus="true"
    />
  )
}