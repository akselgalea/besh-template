type User = {
  id: number
  name: string
  email: string | null
  emailVerifiedAt: Date | string | null
  password: string | null
  type: string
  typeUserId: string | null
  profilePicture: string
  createdAt: Date | string
  deletedAt: Date | string | null
}

type LoginRequest = {
  email: string
  password: string
}

type RegisterRequest = {
  name: string
  lastname: string
  email: string
  password: string
  confirmation: string
}

type SessionData = {
  name: string
  email: string
  emailVerifiedAt: string
  profilePicture: string
  type: string
  typeUserId: string
  createdAt: string
}

export { User, LoginRequest, RegisterRequest, SessionData }

export * from './github.type'
export * from './google.type'