import Elysia, { StatusMap } from "elysia"
import { ctx } from "@/context"
import { LoginRoute } from "./login"
import { RegisterRoute } from "./register"

export const AuthRoutes = new Elysia()
  .use(ctx)
  .guard({
    beforeHandle ({ session, set }) {
      if (session) {
        set.status = StatusMap['Unauthorized']
        set.redirect = '/'

        return 'Unauthorized'
      }
    }
  }, app =>
    app.use(LoginRoute)
      .use(RegisterRoute)
  )
  .post('logout', ({ cookie: { auth }, set }) => {
    auth.remove()
    set.redirect = '/login'
  })