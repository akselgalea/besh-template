import Elysia, { StatusMap } from "elysia"
import { ctx } from "@/context"
import { AuthRoutes } from "@/www/auth"
import { AuthedHeader, Layout, LayoutFoot, Main } from "@/layout"
import { HomePage } from "@/www/home"
import { NotFound } from "./404"
import { User } from "@/types"
import { ChatRoutes } from "./chat"

export const PageRoutes = new Elysia()
.use(ctx)
.use(AuthRoutes)
.guard({
  beforeHandle ({ session, set }) {
    if (!session) {
      set.status = StatusMap['Unauthorized']
      set.redirect = '/login'

      return 'Unauthorized'
    }
  }
}, app =>
  app.use(ChatRoutes)
  .get('/', ({ path, session }) => {
    return (
      <Layout title="Home page">
        <AuthedHeader user={session as User} currentUrl={path} />
        <Main>
          <HomePage></HomePage>
        </Main>
        <LayoutFoot />
      </Layout>
    )
  })
  .get('*', ({ path, session }) => {
    return (
      <Layout title="Page not found">
        <AuthedHeader user={session as User} currentUrl={path} />
        <Main>
          <NotFound></NotFound>
        </Main>
        <LayoutFoot />
      </Layout>
    )
  })
)
.get('/health', () => {
  return <p>OK</p>  
})