import { html } from '@elysiajs/html'
import jwt from "@elysiajs/jwt"
import Elysia from "elysia"
import { db } from '@/db'

export const ctx = new Elysia({
  name: '@app/context'
})
.use(html())
.use(jwt({ secret: process.env.JWT_SECRET! }))
.state('ENV', process.env.ENVIRONMENT)
.decorate('db', db)
.decorate('origin', `${process.env.HOST!}:${process.env.PORT!}`)
.derive({ as: 'global' }, async ({ jwt, cookie: { auth } }) => {
  const session = await jwt.verify(auth.value)
  
  return { session }
})