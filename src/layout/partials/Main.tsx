import type { PropsWithChildren } from "@kitajs/html"

export const Main = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <main class={`max-w-1280px mx-auto pt-60px max-xl:px-2 ${className}`}>
      {children}
    </main>
  )
}