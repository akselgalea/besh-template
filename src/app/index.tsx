import { jwt } from "@elysiajs/jwt"
import Elysia, { StatusMap } from "elysia"
import HomePage from "./www/home/Home"
import Layout from "@/layout/Layout"
import { User } from "@/types"
import { NotFound as NotFoundPage } from "./www/not-found/NotFound"
import { ctx } from "@/context"

const AppRoutes = new Elysia()
  .use(ctx)
  .derive(async ({ jwt, cookie: { auth } }) => {
    const user = await jwt.verify(auth.value)

    return { session: user }
  })
  .guard(
    {
      beforeHandle({ session, set }) {
        if (!session) {
          set.status = StatusMap["Unauthorized"]
          set.redirect = '/login'

          return 'Unauthorized'
        }
      }
  }, app => 
    app.get('', async ({ path, jwt, cookie: { auth } }) => {
      const user = await jwt.verify(auth.value)
  
      return (
        <Layout title="Home page" currentUrl={path} user={ user as  User }>
          <HomePage></HomePage>
        </Layout>
      )
    })
    .get('*', async ({ path, cookie: { auth }, jwt }) => {
      const user = await jwt.verify(auth.value)
      
      return (
        <Layout title="Page not found" currentUrl={path} user={ user as User }>
          <NotFoundPage></NotFoundPage>
        </Layout>
      )
    })
  )

export { AppRoutes }