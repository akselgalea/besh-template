import { db } from "@/db"
import { users } from "@/db/schema"
import { SessionData } from "@/types"

const Login = async ({ email, password }: { email: string, password: string }): Promise<SessionData | null> => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  })

  if (!user) {
    return null
  }

  const passwordOK = await VerifyPassword({ password, hash: user.password ?? '' })

  if (!passwordOK) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email ?? '',
    emailVerifiedAt: user.emailVerifiedAt?.toString() ?? '',
    profilePicture: user.profilePicture,
    type: user.type,
    typeUserId: user.typeUserId ?? '',
    createdAt: user.createdAt.toString()
  }
}

const Register = async ({ name, lastname, email, password }: { name: string, lastname: string, email: string, password: string }) => {
  const hashed = await HashPassword(password)

  return db.insert(users).values({ name: `${name} ${lastname}`, email, password: hashed }).returning()
}

const HashPassword = (password: string): Promise<string> => {
  return Bun.password.hash(password, {
    algorithm: 'argon2id',
    memoryCost: 4,
    timeCost: 3
  })
}

const VerifyPassword = ({ password, hash }: { password: string, hash: string }): Promise<boolean> => {
  return Bun.password.verify(password, hash, 'argon2id')
}

export { Login, Register }
export * from './github'
export * from './google'