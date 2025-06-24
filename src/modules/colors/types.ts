import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type ColorsGetManyOutput = inferRouterOutputs<AppRouter>['colors']["getMany"];
