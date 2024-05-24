import { type User } from '@/auth/types'
import { type PropsWithChildren } from '@kitajs/html'

const Layout = ({ title, user, currentUrl, children }: PropsWithChildren<{ title: string, currentUrl: string, user?: User }>) => {
  const active = ' bg-white text-black border-b-1'

  function toggleUserMenu () {
    const $buttonMenu = document.querySelector('#user-menu-btn')
    const $userMenu = document.querySelector('#user-menu')

    const hide = () => {
      $userMenu?.classList.add('hidden')
      $buttonMenu?.classList.remove('bg-white')
      $buttonMenu?.classList.remove('text-black')
    }

    if ($userMenu?.classList.contains('hidden')) {
      $buttonMenu?.classList.add('bg-white')
      $buttonMenu?.classList.add('text-black')
      $userMenu.classList.remove('hidden')

      setTimeout(() => {
        document.addEventListener('click', (event) => {
          const { target } = event
          
          if (target !== $buttonMenu) {
            hide()
          }
        }, { once: true })
      }, 0)

      return
    }

    hide()
  }

  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bun todo - { title }</title>
      <link rel="stylesheet" href="/public/css/styles.css"></link>
      <link rel="stylesheet" href="/public/css/unocss-tailwind.min.css"></link>
      <script src="/public/js/htmx.min.js"></script>
      <script src="/public/js/unocss-runtime.js"></script>
    </head>
    <body class="min-h-screen" un-cloak>
      <header class="bg-black text-white">
        <nav class="grid grid-cols-2 max-w-[1280px] mx-auto">
          <div class="flex justify-start items-center [&>a]:py-2 [&>a]:px-6">
            <a href="/" class={ 'flex gap-2 items-center font-semibold hover:bg-white hover:text-black' + (currentUrl === '/' ? active : '')}>
              <img src="/public/images/logos/bun.svg" width={30} alt="logo bun" />
              Home
            </a>
          </div>

          <div class="flex justify-end items-center [&>a]:py-2 [&>a]:px-6">
          {
            user ?
            <div class="relative">
              <button
                id="user-menu-btn"
                onclick="toggleUserMenu()"
                class="flex items-center gap-2 hover:bg-white hover:text-black font-semibold rounded py-2 px-6"
              >
                {user.name}
                <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none icon icon-tabler icon-tabler-chevron-down hover:text-black" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </button>

              <div id="user-menu" class="hidden rounded absolute top-11 right-0 w-50 bg-black py-3 text-right">
                <a href="/profile" class="block w-full font-semibold hover:bg-white hover:text-black px-3 py-2">Profile</a>
                <form action="/logout" method="POST">
                  <button type="submit" class="block w-full font-semibold hover:bg-white hover:text-black px-3 py-2 text-right">Logout</button>
                </form>
              </div>
            </div>
            :
            <>
              <a href="/login" class={ 'font-semibold hover:bg-white hover:text-black rounded' + (currentUrl === '/login' ? active : '')}>Log in</a>
              <a href="/register" class={ 'font-semibold hover:bg-white hover:text-black rounded' + (currentUrl === '/register' ? active : '')}>Register</a>
            </>
          }
          </div>
        </nav>
      </header>

      <main class="px-6 py-4 max-w-[1280px] mx-auto" un-cloak>
        { children }
      </main>

      <footer class="text-center">@devmafia 2024</footer>

      <script>{ toggleUserMenu }</script>
    </body>
    </html>
  )
}

export default Layout