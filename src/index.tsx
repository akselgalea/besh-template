import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { cors } from '@elysiajs/cors'

import { PageRoutes } from './www'
import { ctx } from './context'

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .use(cors({ origin: ['https://github.com', 'https://accounts.google.com'] }))
  .use(ctx)
  .use(PageRoutes)

app.listen({ hostname: process.env.HOST!, port: process.env.PORT }, () => { console.log(`🦊 Server started at ${app.server?.url.origin}`) })