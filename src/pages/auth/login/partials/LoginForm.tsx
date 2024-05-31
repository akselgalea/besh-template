import { type LoginRequest } from "@/types"
import { typeToFlattenedError } from "zod"

const LoginForm = ({ old, errors, errorMessage }: { old?: LoginRequest, errorMessage?: string, errors?: typeToFlattenedError<{ email: string; password: string; }, string> }) => {
  return (
    <section id="login-form" class="max-w-400px w-full">
      {
        errorMessage &&
        <p class="text-red-500 font-medium text-sm text-center mb-4">{errorMessage}</p>
      }

      <form hx-post="/login" hx-target="#login-form" hx-swap="outerHTML swap:500ms" hx-indicator="#login-indicator">
        <div>
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

        <div class="mt-3 flex items-center justify-between">
          <label for="keepsigned" class="flex items-center gap-2 font-semibold text-sm">
            <input type="checkbox" id="keepsigned" name="keepsigned" />
            Keep me signed in
          </label>

          <a href="/forgot-password" class="underline text-sm font-medium">Forgot password</a>
        </div>

        <button
          type="submit"
          class="mt-8 bg-black! text-white rounded-md p-3 w-full font-semibold flex gap-2 justify-center"
        >
          Sign in

          <img
            class="htmx-indicator"
            id="login-indicator"
            src="/public/icons/loader.svg"
            width={22}
            alt="loader icon"
          />
        </button>
      </form>
    </section>
  )
}

export default LoginForm