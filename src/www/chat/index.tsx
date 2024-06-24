import { Elysia } from "elysia"

import { ctx } from "@/context"
import { AuthedHeader, Footer, Layout, Main, LayoutFoot } from "@/layout"
import { SessionData, User } from "@/types"
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
  console.log('chats', chats)
  
  return (
    <Layout title="Chat">
      <h1>Chat</h1>
      <AuthedHeader currentUrl={path} user={session as User} />
      <Main>
        <div class="grid grid-cols-[400px_1fr] gap-2">
          <div hx-ext="ws" ws-connect="/chat/notifications">
            <ul class="w-full" id="chats">
              {chats.map(({ id, title, type, users, lastMessage }) => (
                <li>
                  <ChatPreview id={id} title={title} type={type} users={users} userId={user.id} lastMessage={lastMessage} />
                </li>
              ))}
            </ul>
          </div>

          <div id="chat-box" class="grid place-items-center h-80dvh">
            <h2 class="text-xl font-bold">This is a Chat Page</h2>
          </div>
        </div>

      </Main>
      <Footer></Footer>
      <LayoutFoot>
        <script src="https://unpkg.com/htmx-ext-ws@2.0.0/ws.js"></script>
      </LayoutFoot>
    </Layout>
  )
})

export const ChatWsRoutes = new Elysia({
  websocket: {
    perMessageDeflate: true
  }
})
.use(ctx)
.ws('/chat/notifications', {
  async open (ws) {
    const { session } = ws.data

    if (!session) {
      ws.close()
    }
  },
  async message (ws, message) {
    const session = ws.data.session as SessionData
    console.log('session', session.name)
    console.log('message', message)
  },
  close (ws) {
    console.log('ws close')
  }
})