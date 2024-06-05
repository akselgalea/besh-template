import Elysia, { StatusMap, redirect } from "elysia"

import { ctx } from "@/context"

export const GoogleLoginRoute = new Elysia()
  .use(ctx)
  .get('/auth/google', ({ origin }) => {
    const state = crypto.randomUUID()
    const redirectUri = `http://${origin}/auth/google/callback`
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID!}&scope=email&redirect_uri=${redirectUri}&state=${state}&response_type=token`
    return redirect(url, StatusMap['Temporary Redirect'])
  })
  .get('/auth/google/callback', async ({ query, jwt, cookie: { auth } }) => {
    console.log('query: ', query)
  })