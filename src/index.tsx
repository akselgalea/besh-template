/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { PageRoutes } from './pages'
import { ctx } from './context'

const app = new Elysia()
  .use(staticPlugin())
  .use(ctx)
  .use(PageRoutes)

app.listen(process.env.PORT!, () => { console.log(`🦊 Server started at ${app.server?.url.origin}`) })