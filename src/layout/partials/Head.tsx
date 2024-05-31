import { type PropsWithChildren } from "@kitajs/html"

const Head = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      {`<!DOCTYPE html>
      <html lang="en">`}
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bun todo - ${ title }</title>
        <link rel="stylesheet" href="/public/css/styles.css"></link>
        <link rel="stylesheet" href="/public/css/unocss-tailwind.min.css"></link>
        <script src="/public/js/htmx.min.js"></script>
        <script src="/public/js/unocss-runtime.js"></script>
      </head>
      {`<body class="min-h-screen" un-cloak>`}
        ${children}
    </>
  )
}

export default Head