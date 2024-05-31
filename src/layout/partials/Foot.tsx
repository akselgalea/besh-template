import type { PropsWithChildren } from "@kitajs/html"

export const LayoutFoot = ({ guest, children }: PropsWithChildren<{ guest?: boolean }>) => {
  return (
    <>
      { children }
      {
        !guest &&
        <script>
          { toggleUserMenu }
        </script>
      }
      {
      `
        </body>
        </html>
      `
      }
    </>
  )
}


const toggleUserMenu = `
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
`