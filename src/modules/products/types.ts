import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type ProductsGetManyOutput = inferRouterOutputs<AppRouter>['products']["getMany"];

export type ProductType = inferRouterOutputs<AppRouter>['products']["getMany"]["docs"][0]