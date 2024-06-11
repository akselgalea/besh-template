import type { PropsWithChildren } from "@kitajs/html"

export const LayoutFoot = ({ guest, children }: PropsWithChildren<{ guest?: boolean }>) => {
  return (
    <>
      { children }
      <script>
        {`
          document.body.addEventListener('htmx:beforeOnLoad', (evt) => {
            if (evt.detail.xhr.status === 422) {
              evt.detail.shouldSwap = true
              evt.detail.isError = false
            }
          })
        `}
      </script>
      {
      `
        </body>
        </html>
      `
      }
    </>
  )
}