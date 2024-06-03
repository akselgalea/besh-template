import { db } from "@/db"
import { users } from "@/db/schema"

export const FindGoogleUser = ({ id }: { id: string }) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.typeUserId, id)
  })
}

export const RegisterGoogleUser = ({ name, email, avatar_url }: { name: string, email: string, avatar_url: string }) => {
  return db.insert(users).values({ name, email, profilePicture: avatar_url }).returning()
}