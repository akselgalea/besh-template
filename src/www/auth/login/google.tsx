import Elysia, { StatusMap, redirect } from "elysia"

import { ctx } from "@/context"
import { GoogleTokenResponse, GoogleUserResponse, SessionData, User } from "@/types"
import { GoogleFindUser, GoogleRegisterUser } from "@/utils/auth"

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
  .get('/auth/google/callback', async ({ origin, query: { code, state }, jwt, cookie: { oauthState, auth }, error }) => {
    if (!code || state !== oauthState.value.state) {
      oauthState.remove()
      // make a component to show error
      return error(StatusMap['Unprocessable Content'], 'Invalid state')
    }

    oauthState.remove()

    const params = new URLSearchParams()
    params.append('code', code)
    params.append('client_id', process.env.GOOGLE_CLIENT_ID!)
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!)
    params.append('redirect_uri', `http://${origin}/auth/google/callback`)
    params.append('grant_type', 'authorization_code')

    const tokenreq = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })

    if (!tokenreq.ok) {
      return error(tokenreq.status, tokenreq.statusText)
    }
    
    const tokendata = await tokenreq.json() as GoogleTokenResponse
    const { access_token: token } = tokendata

    const profilerequest = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const userGoogle = await profilerequest.json() as GoogleUserResponse

    let user: User | undefined = await GoogleFindUser({ id: userGoogle.id })
    let errorUser
    
    if (!user) {
      user = await GoogleRegisterUser(userGoogle).catch((e) => {
        errorUser = e.message
        
        if (e.message.includes('email')) {
          errorUser = 'Email already in use by another platform'
        }

        return undefined
      })
    }

    if (!user) {
      return redirect(`/login?errorOauth=${errorUser}`, StatusMap['Permanent Redirect'])
    }

    const sessionData: SessionData = {
      id: user.id,
      name: user.name,
      email: user.email ?? '',
      emailVerifiedAt: user.emailVerifiedAt?.toString() ?? '',
      profilePicture: user.profilePicture,
      type: user.type,
      typeUserId: user.typeUserId ?? '',
      createdAt: user.createdAt.toString(),
      token: token
    }

    auth.set({
      value: await jwt.sign(sessionData),
      httpOnly: true,
      maxAge: 7 * 86400, // one week
    })

    return redirect('/', StatusMap['Permanent Redirect'])
  })