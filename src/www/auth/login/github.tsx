import Elysia, { StatusMap, redirect } from "elysia"

import { ctx } from "@/context"
import { GitHubTokenResponse, GitHubUserResponse, SessionData, User } from "@/types/auth"
import { GitHubFindUser, GitHubRegisterUser } from "@/utils/auth"

export const GitHubLoginRoute = new Elysia()
  .use(ctx)
  .get('/auth/github', ({ origin, cookie: { oauthState } }) => {
    const state = crypto.randomUUID()
    const redirectUri = `http://${origin}/auth/github/callback`
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID!}&scope=user:email&redirect_uri=${redirectUri}&state=${state}`

    oauthState.set({ value: { state }})
    
    return redirect(url, StatusMap['Temporary Redirect'])
  })
  .get('/auth/github/callback', async ({ query: { code, state }, jwt, cookie: { auth, oauthState } }) => {
    let errorOauth = 'We couldn\'t authenticate you with Google'

    if (!code || state !== oauthState.value.state) {
      oauthState.remove()
      return redirect(`/login?errorOauth=${errorOauth}`, StatusMap['Permanent Redirect'])
    }

    oauthState.remove()

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code
      })
    })

    if (!response.ok) {
      return redirect(`/login?errorOauth=${errorOauth}`, StatusMap['Permanent Redirect'])
    }

    const tokeninfo = await response.json() as GitHubTokenResponse

    if (tokeninfo.error) {
      return redirect(`/login?errorOauth=${errorOauth}`, StatusMap['Permanent Redirect'])
    }

    const userRequest = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${tokeninfo.access_token}`
      }
    })

    if (!userRequest.ok) {
      return redirect(`/login?errorOauth=${errorOauth}`, StatusMap['Permanent Redirect'])
    }

    const userGithub = await userRequest.json() as GitHubUserResponse
    let user: User | undefined = await GitHubFindUser({ id: String(userGithub.id) })

    if (!user) {
      user = await GitHubRegisterUser({ id: String(userGithub.id), name: userGithub.name, email: userGithub.email, avatar_url: userGithub.avatar_url }).catch(err => {
        if (err.message.includes('email')) {
          errorOauth = 'Email already in use by another platform'
        }

        return undefined
      })
    }

    if (!user) {
      return redirect(`/login?errorOauth=${errorOauth}`, StatusMap['Permanent Redirect'])
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
      token: tokeninfo.access_token
    } 

    auth.set({
      value: await jwt.sign(sessionData),
      httpOnly: true,
      maxAge: 7 * 86400, // one week
    })

    return redirect('/', StatusMap['Permanent Redirect'])
  })