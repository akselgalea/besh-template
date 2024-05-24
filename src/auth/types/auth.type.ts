type User = {
  id: number
  name: string
  lastname: string
  email: string
  emailVerifiedAt: string
  password: string
  createdAt: string
  deletedAt: string
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

export { User, LoginRequest, RegisterRequest }