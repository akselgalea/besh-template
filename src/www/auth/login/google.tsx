import Elysia, { StatusMap, redirect } from "elysia"

import { ctx } from "@/context"

export const GoogleLoginRoute = new Elysia()
  .use(ctx)
  .get('/auth/google', ({ origin, cookie: { oauthState } }) => {
    const state = crypto.randomUUID()
    oauthState.set({ value: { state }})

    const redirectUri = `http://${origin}/auth/google/callback`

    const scopes =
      'https://www.googleapis.com/auth/userinfo.profile ' +
      'https://www.googleapis.com/auth/userinfo.email ' +
      'openid'
    
    const url = 
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `scope=${scopes}&` +
      'response_type=code&' +
      `state=${state}&` +
      `redirect_uri=${redirectUri}&` +
      `client_id=${process.env.GOOGLE_CLIENT_ID!}&`

    return redirect(url, StatusMap['Temporary Redirect'])
  })
  .get('/auth/google/callback', async ({ query, jwt, cookie: { oauthState } }) => {
    console.log(query)
    const { code, scope } = query

    const token = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}`
    })

    const tokendata = await token.json()
    console.log('token data', tokendata)

    const profilerequest = await fetch(`https://www.googleapis.com/auth/v2/userinfo?scope=${scope}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${code}`
      }
    })
    
    const text = await profilerequest.text()
    console.log(text)

    if (!profilerequest.ok) {
      console.log(profilerequest.statusText)
    }

    const profile = await profilerequest.json()

    console.log('profile',profile)
  })