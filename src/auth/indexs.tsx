import { ValidateLogin, ValidateRegister } from "@/schema"
import Elysia, { StatusMap, t } from "elysia"
import LoginForm from "../pages/auth/login/partials/LoginForm"
import { Login, Register } from "@/auth/index"
import LoginPage from "./www/login/LogIn"
import RegisterPage from "./www/register/Register"
import { ctx } from "@/context"

const AuthRoutes = new Elysia()
  .use(ctx)
  .guard({
    async beforeHandle({ set, jwt, cookie: { auth } }) {
      if (await jwt.verify(auth.value)) {
        set.status = StatusMap["Unauthorized"]
        set.redirect = '/'

        return 'Unauthorized'
      }
    }
  }, (app) =>
    app.get('login', () => {
      return LoginPage({})
    })
    .post('login', async ({ body, set, jwt, cookie: { auth } }) => {
      const validated = ValidateLogin(body)
  
      if (!validated.success) {
        return LoginForm({ old: body, errors: validated.error.flatten() })
      }
  
      const user = await Login(validated.data)
  
      if (!user) {
        return LoginForm({ old: body, errorMessage: "Your login credentials don't match our records" })
      }
  
      auth.set({
        value: await jwt.sign({ email: user.email, name: user.name, lastname: user.lastname }),
        httpOnly: true,
        maxAge: 7 * 86400, // one week
      })
  
      set.status = StatusMap['No Content']
      set.headers['hx-redirect'] = '/'
      return
    }, {
      body: t.Object({
        email: t.String(),
        password: t.String()
      })
    })
    .get('register', () => {
      return RegisterPage({})
    })
    .post('register', async ({ body, jwt, cookie: { auth }, set }) => {
      const validated = ValidateRegister(body)
  
      if (!validated.success) {
        return RegisterPage({ old: body, errors: validated.error.flatten() })
      }
  
      const users = await Register(validated.data).catch((error) => {
        if (error.message.includes('users.email')) {
          set.status = StatusMap["Bad Request"]
          return RegisterPage({ old: body, errorMessage: 'Email already in use' })
        }
  
        return error
      })
  
      const user = users[0]
  
      auth.set({
        value: await jwt.sign({ email: user.email, name: user.name, lastname: user.lastname }),
        httpOnly: true,
        maxAge: 7 * 86400, // one week
      })
  
      set.redirect = '/'
    }, {
      body: t.Object({
        name: t.String(),
        lastname: t.String(),
        email: t.String(),
        password: t.String(),
        confirmation: t.String()
      })
    })
  )
  .post('logout', ({ cookie: { auth }, set }) => {
    auth.remove()
    set.redirect = '/login'
  })

export { AuthRoutes }