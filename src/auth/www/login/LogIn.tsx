import { typeToFlattenedError } from "zod"
import type { LoginRequest } from "@/types"
import LoginForm from "../../../pages/auth/login/partials/LoginForm"

const LoginPage = ({ old, errors, errorMessage }: { old?: LoginRequest, errorMessage?: string, errors?: typeToFlattenedError<{ email: string; password: string; }, string> }) => {
  return (
    <main class="grid grid-cols-1 lg:grid-cols-2">
      <section class="bg-gray-200 h-screen p-4 md:px-10 flex flex-col">
        <header>
          <nav class="flex justify-between gap-4 items-center">
            <a href="/" class="font-bold text-3xl">
              <img src="/public/images/logos/bun.svg" width={55} alt="logo bun" />
            </a>
            <a href="/register" class="underline font-semibold">Create an account</a>
          </nav>
        </header>

        <section class="flex flex-grow flex-col items-center justify-center w-full md:px-10">
          <header class="max-w-400px w-full md:text-center">
            <h1 class="font-bold text-3xl">Welcome back</h1>

            <p class="font-medium text-base mt-2">Enter your Bun todo account details.</p>
          </header>

          <section id="socials" class="max-w-400px mt-8 w-full">
            <button class="flex gap-2 w-full bg-white font-bold py-3 justify-center items-center text-sm">
              <img width="20" src="/public/images/logos/google.svg" alt="google's logo" />
              Log in with Google
            </button>

            <button class="flex gap-2 w-full bg-white font-bold py-3 justify-center items-center text-sm mt-3">
              <img width="20" src="/public/images/logos/github.svg" alt="github's logo" />
              Log in with GitHub
            </button>
          </section>

          <div class="max-w-400px w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4 m-8">
            <div class="w-full h-2px bg-black rounded"></div>
            <p class="font-semibold">OR</p>
            <div class="w-full h-2px bg-black rounded"></div>
          </div>

          <LoginForm errorMessage={errorMessage} old={old} errors={errors}></LoginForm>
        </section>
      </section>

      <div class="bg-black h-full grid place-items-center">
        <img src="/public/images/logos/bun4x.png" alt="logo bun" />
      </div>
    </main>
  )
}

export default LoginPage