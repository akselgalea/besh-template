/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Elysia, StatusMap } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { html } from '@elysiajs/html'
import { jwt } from '@elysiajs/jwt'
import { staticPlugin } from '@elysiajs/static'
import { AuthRoutes } from '@/auth'
import { AppRoutes } from './app'

const app = new Elysia()
  .use(swagger())
  .use(html())
  .use(jwt({ secret: process.env.JWT_SECRET! }))
  .use(staticPlugin())
  .use(AuthRoutes)
  .use(AppRoutes)

app.listen(process.env.PORT!, () => { console.log(`🦊 Server started at ${app.server?.url.origin}`) })