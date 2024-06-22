import { db } from "@/db"
import { users } from "@/db/schema"
import { RegisterGitHubUser } from "@/types/auth"

export const GitHubFindUser = ({ id }: { id: string }) => {
  return db.query.users.findFirst({
    where: (users, { eq, and }) => and(eq(users.typeUserId, id), eq(users.type, 'github'))
  })
}

export const GitHubRegisterUser = async ({ id, name, email, avatar_url }: RegisterGitHubUser) => {
  const created = await db.insert(users).values({ name, email, emailVerifiedAt: new Date(), profilePicture: avatar_url, type: 'github', typeUserId: id }).returning()

  return created[0]
}