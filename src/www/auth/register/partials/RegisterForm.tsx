import { typeToFlattenedError } from "zod"
import type { RegisterRequest } from "@/types"

const RegisterForm = ({ old, errors, errorMessage }: { old?: RegisterRequest, errorMessage?: string, errors?: typeToFlattenedError<{ name: string; lastname: string; email: string; password: string; confirmation: string; }, string> }) => {
  return (
    <section id="register-form" class="max-w-400px w-full mt-4">
      {
        errorMessage &&
        <p class="text-red-500 font-medium text-sm text-center mb-4">{errorMessage}</p>
      }

      <form hx-post="/register" hx-target="#register-form" hx-indicator="#register-indicator">
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
          class="mt-8 bg-black! text-white rounded-md p-3 w-full font-semibold flex gap-2 justify-center"
        >
          Register

          <img
            class="htmx-indicator"
            id="register-indicator"
            src="/public/icons/loader.svg"
            width={22}
            alt="loader icon"
          />
        </button>
      </form>
    </section>
  )
}

export default RegisterForm