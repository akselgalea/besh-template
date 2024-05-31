import Elysia, { StatusMap, t } from "elysia"
import { ctx } from "@/context"

import RegisterPage from "./partials/RegisterForm"
import { Layout, LayoutFoot } from "@/layout"
import { ValidateRegister } from "@/schema"
import { Register } from "@/auth"

export const RegisterRoute = new Elysia()
  .use(ctx)
  .get("/register", async () => {
    return (
      <Layout title="Register">
        <RegisterPage />
        <LayoutFoot></LayoutFoot>
      </Layout>
    )
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