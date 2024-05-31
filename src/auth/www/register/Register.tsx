import { typeToFlattenedError } from "zod"
import type { RegisterRequest } from "@/types"

const RegisterPage = ({ old, errors, errorMessage }: { old?: RegisterRequest, errorMessage?: string, errors?: typeToFlattenedError<{ name: string; lastname: string; email: string; password: string; confirmation: string; }, string> }) => {
  return (
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
            <h1 class="font-bold text-3xl">Welcome to Bun todo</h1>

            <p class="font-medium text-base mt-2">Create your Bun todo account to start your journey</p>
          </header>

          <section id="register-form" class="max-w-400px w-full mt-4">
            {
              errorMessage &&
              <p class="text-red-500 font-medium text-sm text-center mb-4">{errorMessage}</p>
            }

            <form action="/register" method="POST">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    class="font-medium text-base p-3 rounded-lg bg-white placeholder-black w-full"
                    value={old?.name}
                  />
                  {
                    errors?.fieldErrors.name &&
                    <p class="px-1 mt-1 text-red-500 text-xs font-medium">{errors.fieldErrors.name[0]}</p>
                  }
                </div>

                <div>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    class="font-medium text-base p-3 rounded-lg bg-white placeholder-black w-full"
                    value={old?.lastname}
                  />
                  {
                    errors?.fieldErrors.lastname &&
                    <p class="px-1 mt-1 text-red-500 text-xs font-medium">{errors.fieldErrors.lastname[0]}</p>
                  }
                </div>
              </div>

              <div class="mt-3">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  class="font-medium text-base p-3 rounded-lg bg-white placeholder-black w-full"
                  value={old?.email}
                />
                {
                  errors?.fieldErrors.email &&
                  <p class="px-1 mt-1 text-red-500 text-xs font-medium">{errors.fieldErrors.email[0]}</p>
                }
              </div>

              <div class="mt-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  class="font-medium text-base p-3 rounded-lg bg-white placeholder-black w-full"
                  value={old?.password}
                />
                {
                  errors?.fieldErrors.password &&
                  <p class="px-1 mt-1 text-red-500 text-xs font-medium">{errors.fieldErrors.password[0]}</p>
                }
              </div>

              <div class="mt-3">
                <input
                  type="password"
                  id="confirmation"
                  name="confirmation"
                  placeholder="Password confirmation"
                  class="font-medium text-base p-3 rounded-lg bg-white placeholder-black w-full"
                  value={old?.confirmation}
                />
                {
                  errors?.fieldErrors.confirmation &&
                  <p class="px-1 mt-1 text-red-500 text-xs font-medium">{errors.fieldErrors.confirmation[0]}</p>
                }
              </div>

              <button
                type="submit"
                class="mt-4 bg-black! text-white rounded-md p-3 w-full font-semibold"
              >
                Register
              </button>
            </form>
          </section>
        </section>
      </section>

      <div class="bg-black h-full grid place-items-center">
        <img src="/public/images/logos/bun4x.png" alt="logo bun" />
      </div>
    </main>
  )
}

export default RegisterPage