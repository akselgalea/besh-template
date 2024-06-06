export type GoogleUserResponse = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
}

export type GoogleTokenResponse = {
  access_token: string
  scope: string
  token_type: string
  expires_in: number
  id_token: string
}