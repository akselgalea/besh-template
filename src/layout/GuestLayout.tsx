import { PropsWithChildren } from "@kitajs/html";

const GuestLayout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bun todo - Log in</title>

      <link rel="stylesheet" href="/public/css/styles.css"></link>
      <link rel="stylesheet" href="/public/css/unocss-tailwind.min.css"></link>
      <script src="/public/js/htmx.min.js"></script>
      <script src="/public/js/unocss-runtime.js"></script>
    </head>
    <body class="min-h-screen" un-cloak>
      { children }
    </body>
    </html>
  )
}

export default GuestLayout