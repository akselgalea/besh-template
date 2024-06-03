export type GitHubTokenResponse = {
  access_token?: string
  token_type?: string
  scope?: string
  error?: string
  error_description?: string
  error_uri?: string
}

export type GitHubUserResponse = {
  login:               string
  id:                  number
  node_id:             string
  avatar_url:          string
  gravatar_id:         string
  url:                 string
  html_url:            string
  followers_url:       string
  following_url:       string
  gists_url:           string
  starred_url:         string
  subscriptions_url:   string
  organizations_url:   string
  repos_url:           string
  events_url:          string
  received_events_url: string
  type:                string
  site_admin:          boolean
  name:                string
  company:             string
  blog:                string
  location:            null | string
  email:               null | string
  hireable:            null | string
  bio:                 string
  twitter_username:    null | string
  public_repos:        number
  public_gists:        number
  followers:           number
  following:           number
  created_at:          Date
  updated_at:          Date
}

export type RegisterGitHubUser = {
  id: string
  name: string
  email: string | null
  avatar_url: string
}