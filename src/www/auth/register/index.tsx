import Elysia, { StatusMap, t } from "elysia"
import { ctx } from "@/context"

import RegisterForm from "./partials/RegisterForm"
import { Layout, LayoutFoot } from "@/layout"
import { ValidateRegister } from "@/schema"
import { Register } from "@/utils/auth"

export const RegisterRoute = new Elysia()
  .use(ctx)
  .get("/register", async () => {
    return (
      <Layout title="Register">
        <main class="grid grid-cols-1 lg:grid-cols-2">
          <section class="bg-gray-200 h-screen p-4 md:px-10 flex flex-col">
            <header>
              <nav class="flex justify-between gap-4 items-center">
                <a href="/" class="font-bold text-3xl">
                  <img src="/public/images/logos/bun.svg" width={55} alt="logo bun" />
                </a>
                <a href="/login" class="underline font-semibold">Log in</a>
              </nav>
            </header>

            <section class="flex flex-grow flex-col items-center justify-center w-full md:px-10">
              <header class="max-w-400px w-full md:text-center">
                <h1 class="font-bold text-3xl">Welcome to MyApp</h1>

                <p class="font-medium text-base mt-2">Create your MyApp account to start your journey</p>
              </header>
              <RegisterForm />
            </section>
          </section>

          <div class="bg-black h-full grid place-items-center">
            <img src="/public/images/logos/bun4x.png" alt="logo bun" />
          </div>
        </main>
        <LayoutFoot></LayoutFoot>
      </Layout>
    )
  })
  .post('register', async ({ body, jwt, cookie: { auth }, set, error }) => {
    const validated = ValidateRegister(body)

    if (!validated.success) {
      return error(StatusMap["Unprocessable Content"], RegisterForm({ old: body, errors: validated.error.flatten() }))
    }

    let registerError: string | undefined

    const users = await Register(validated.data).catch((err) => {
      registerError = err.message
      return err
    })
    
    if (registerError) {
      if (registerError.includes('users.email')) {
        return error(StatusMap["Unprocessable Content"], RegisterForm({ old: body, errorMessage: 'Email already in use' }))
      }

      return error(StatusMap["Unprocessable Content"], RegisterForm({ old: body, errorMessage: registerError }))
    }

    const user = users[0]

    auth.set({
      value: await jwt.sign({ email: user.email, name: user.name, lastname: user.lastname }),
      httpOnly: true,
      maxAge: 7 * 86400, // one week
    })

    set.headers['hx-redirect'] = '/'
  }, {
    body: t.Object({
      name: t.String(),
      lastname: t.String(),
      email: t.String(),
      password: t.String(),
      confirmation: t.String()
    })
  })