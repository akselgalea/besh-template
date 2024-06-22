import { Elysia } from "elysia"

import { ctx } from "@/context"
import { AuthedHeader, Layout, Main } from "@/layout"
import { User } from "@/types"
import { getUserChatsByID } from "@/utils/chat"
import { ChatPreview } from "./partials/ChatPreview"

export const ChatRoutes = new Elysia({
  prefix: '/chat',
  name: '@app/chat'
})
.use(ctx)
.get('/', async ({ path, session }) => {
  const user = session as User
  const chats = await getUserChatsByID(user.id)

  return (
    <Layout title="Chat">
      <h1>Chat</h1>
      <AuthedHeader currentUrl={path} user={session as User} />
      <Main>
        <div class="grid grid-cols-[400px_1fr] gap-2">
          <div>
            <ul class="w-full">
              {chats.map(({ title, type, users, lastMessage }) => (
                <li>
                  <ChatPreview title={title} type={type} users={users} userId={user.id} lastMessage={lastMessage} />
                </li>
              ))}
            </ul>
          </div>

          <div id="chat-box" class="grid place-items-center h-80dvh">
            <h2 class="text-xl font-bold">This is a Chat Page</h2>
          </div>
        </div>

      </Main>
    </Layout>
  )
})