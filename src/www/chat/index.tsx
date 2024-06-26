import { Elysia, StatusMap, t } from "elysia"

import { ctx } from "@/context"
import { AuthedHeader, Footer, Layout, Main, LayoutFoot } from "@/layout"
import { SessionData, User } from "@/types"
import { getChatByID, GetMessagesByChatId, getUserChatsByID, InsertMessage } from "@/utils/chat"
import { ChatPreview } from "./partials/ChatPreview"
import { ChatBox, MessageInputOOB, MessageOOB } from "./partials/ChatBox"

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
        <div class="grid grid-cols-[400px_1fr] gap-2" hx-ext="ws" ws-connect="/chat/notifications">
          <div>
            <ul class="w-full" id="chats">
              {chats.map(({ id, title, type, users, lastMessage }) => (
                <li>
                  <ChatPreview id={id} title={title} type={type} users={users} userId={user.id} lastMessage={lastMessage} />
                </li>
              ))}
            </ul>
          </div>

          <div id="chat-box" class="grid place-items-center h-80dvh w-full">
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
.get('/:id', async ({ params: { id }, session, error }) => {
  const user = session as User
  const nid = Number(id)
  const chat = await getChatByID(nid)

  if (!chat) {
    return error(StatusMap['Not Found'], 'Chat not found')
  }

  return <ChatBox userId={user.id} chat={chat}></ChatBox>
})

export const ChatWsRoutes = new Elysia({
  websocket: {
    perMessageDeflate: true
  }
})
.use(ctx)
.ws('/chat/notifications', {
  body: t.Object({
    chatId: t.String(),
    userId: t.String(),
    message: t.String(),
    HEADERS: t.Object({
      "HX-Request": t.String(),
      "HX-Trigger": t.String(),
      "HX-Trigger-Name": t.Nullable(t.String()),
      "HX-Target": t.String(),
      "HX-Current-URL": t.String(),
    })
  }),
  async open (ws) {
    console.log('open')
    const { session } = ws.data

    ws.subscribe('chat-message')

    if (!session) {
      ws.close()
    }
  },
  async message (ws, message) {
    const session = ws.data.session as SessionData
    const chatId = Number(message.chatId)

    console.log('session id', session.id)

    const newMessage = await InsertMessage(chatId, session.id, message.message)

    if (!newMessage) {
      return
    }

    ws.send(
      <>
        <MessageOOB message={newMessage} currentUserId={session.id} />
        <MessageInputOOB />
      </>
    )

    ws.publish('chat-message',
      <MessageOOB message={newMessage} />
    )
  },
  close (ws) {
    ws.unsubscribe('chat-message')
    console.log('ws close')
  }
})
.ws('/chat/:id', {
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
