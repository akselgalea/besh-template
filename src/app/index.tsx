import { jwt } from "@elysiajs/jwt"
import { db } from "@/db"
import Elysia, { StatusMap } from "elysia"
import HomePage from "./www/home/Home"
import Layout from "@/layout/Layout"
import { User } from "@/auth/types"
import { NotFound as NotFoundPage } from "./www/not-found/NotFound"

const AppRoutes = new Elysia()
  .use(jwt({ secret: process.env.JWT_SECRET! }))
  .guard(
    {
      async beforeHandle({ set, jwt, cookie: { auth } }) {
        if (!await jwt.verify(auth.value)) {
          set.status = StatusMap["Unauthorized"]
          set.redirect = '/login'

          return 'Unauthorized'
        }
      }
  }, app => 
    app.get('', async ({ jwt, cookie: { auth } }) => {
      const user = await jwt.verify(auth.value)
  
      return <Layout title="Home page" currentUrl="/" user={ user as  User }>
        <HomePage></HomePage>
      </Layout>
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