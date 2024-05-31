import Elysia from "elysia"
import { LoginRoute } from "./auth/login/login"
import { ctx } from "@/context"

export const PageRoutes = new Elysia()
.use(ctx)
.use(LoginRoute)
.get('/', ({ path }) => {
  
})