import { swagger } from '@elysiajs/swagger'
import { html } from '@elysiajs/html'
import jwt from "@elysiajs/jwt"
import Elysia from "elysia"
import { db } from '@/db'

export const ctx = new Elysia({
  name: '@app/context'
})
.use(swagger())
.use(html())
.use(jwt({ secret: process.env.JWT_SECRET! }))
.state('ENV', process.env.ENVIRONMENT)
.decorate('db', db)