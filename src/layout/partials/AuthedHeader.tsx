import { User } from "@/types"
import type { PropsWithChildren } from "@kitajs/html"

const AuthedHeader = ({ user, currentUrl, children }: PropsWithChildren<{ user: User, currentUrl: string }>) => {
  const active = ' bg-white text-black'

  return (
    <header class="bg-black text-white fixed top-0 left-0 w-full z-50">
      <nav class="grid grid-cols-2 max-w-[1280px] mx-auto">
        <div class="flex justify-start items-center [&>a]:py-2 [&>a]:px-6">
          <a href="/" class={'flex gap-2 items-center font-semibold hover:bg-white hover:text-black' + (currentUrl === '/' ? active : '')}>
            <img src="/public/images/logos/bun.svg" width={30} alt="logo bun" />
            Home
          </a>
          { children }
        </div>

        <div class="flex justify-end items-center [&>a]:py-2 [&>a]:px-6">
          <div class="relative">
            <button
              id="user-menu-btn"
              class="flex items-center gap-2 hover:bg-white hover:text-black font-semibold rounded py-2 px-6"
              _="
                on click toggle .hidden on #user-menu
                if #user-menu do not match .hidden then
                  add .bg-white .text-black
                else
                  remove .bg-white .text-black
                end
              "
            >
              {user.name.split(' ')[0]}
              <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none icon icon-tabler icon-tabler-chevron-down hover:text-black" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 9l6 6l6 -6" />
              </svg>
            </button>

            <div
              id="user-menu"
              class="hidden rounded absolute top-11 right-0 w-50 bg-black py-3 text-right"
              _="
                on mousedown(target) from elsewhere
                if target is not #user-menu and target is not #user-menu-btn and I do not match .hidden then
                  add .hidden
                  remove .bg-white .text-black from #user-menu-btn
                end
              "
            >
              <a href="/profile" class="block w-full font-semibold hover:bg-white hover:text-black px-3 py-2">Profile</a>
              <form action="/logout" method="POST">
                <button type="submit" class="block w-full font-semibold hover:bg-white hover:text-black px-3 py-2 text-right">Logout</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export { AuthedHeader }