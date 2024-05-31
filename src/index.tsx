import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { PageRoutes } from './www'
import { ctx } from './context'

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin())
  .use(ctx)
  .use(PageRoutes)

app.listen(process.env.PORT!, () => { console.log(`🦊 Server started at ${app.server?.url.origin}`) })