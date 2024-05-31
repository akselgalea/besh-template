import type { PropsWithChildren } from "@kitajs/html"

const GuestHeader = ({ currentUrl, children }: PropsWithChildren<{ currentUrl: string }>) => {
  const active = ' bg-white text-black'

  return (
    <header class="bg-black text-white">
      <nav class="grid grid-cols-2 max-w-[1280px] mx-auto">
        <div class="flex justify-start items-center [&>a]:py-2 [&>a]:px-6">
          <a href="/" class={'flex gap-2 items-center font-semibold hover:bg-white hover:text-black' + (currentUrl === '/' ? active : '')}>
            <img src="/public/images/logos/bun.svg" width={30} alt="logo bun" />
            Home
          </a>
          { children }
        </div>

        <div class="flex justify-end items-center [&>a]:py-2 [&>a]:px-6">
          <a href="/login" class={'font-semibold hover:bg-white hover:text-black rounded' + (currentUrl === '/login' ? active : '')}>Log in</a>
          <a href="/register" class={'font-semibold hover:bg-white hover:text-black rounded' + (currentUrl === '/register' ? active : '')}>Register</a>
        </div>
      </nav>
    </header>
  )
}

export { GuestHeader }