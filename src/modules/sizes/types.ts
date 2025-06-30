import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type SizesGetManyOutput = inferRouterOutputs<AppRouter>['sizes']["getMany"];
