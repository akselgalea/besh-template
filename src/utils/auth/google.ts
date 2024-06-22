import { db } from "@/db"
import { users } from "@/db/schema"
import { GoogleUserResponse } from "@/types"

export const GoogleFindUser = ({ id, email }: { id: string, email?: string }) => {
  if (email) {
    return db.query.users.findFirst({
      where: (users, { eq, and, or }) => or(and(eq(users.email, email), eq(users.type, 'local')), and(eq(users.typeUserId, id), eq(users.type, 'google')))
    })
  }

  return db.query.users.findFirst({
    where: (users, { eq, and }) => and(eq(users.typeUserId, id), eq(users.type, 'google'))
  })
}

export const GoogleRegisterUser = async ({ id, name, email, picture  }: GoogleUserResponse) => {
  const created = await db.insert(users).values({ name, email, emailVerifiedAt: new Date(), profilePicture: picture, type: 'google', typeUserId: id }).returning()

  return created[0]
}