import Elysia, { StatusMap } from "elysia"
import { ctx } from "@/context"
import { AuthRoutes } from "@/www/auth"
import { AuthedHeader, Layout, LayoutFoot } from "@/layout"
import { HomePage } from "@/www/home"
import { NotFound } from "./404"
import { User } from "@/types"

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
}, app => app.get('/', async ({ path, session: user}) => {
  return (
    <Layout title="Home page">
      <AuthedHeader user={user as User} currentUrl={path} />
      <HomePage></HomePage>
      <LayoutFoot />
    </Layout>
  )
  }).get('*', async ({ path, jwt, cookie: { auth } }) => {
    const user = await jwt.verify(auth.value)

    return (
      <Layout title="Page not found">
        <AuthedHeader user={user as User} currentUrl={path} />
        <NotFound></NotFound>
        <LayoutFoot>
          <script>
            {`
              function goBack () {
                const referrer = document.referrer
                const newLocation = referrer && referrer !== window.location.href ? referrer : window.location.origin
                
                window.location.replace(newLocation)
              }
            `}
          </script>
        </LayoutFoot>
      </Layout>
    )
  })
)