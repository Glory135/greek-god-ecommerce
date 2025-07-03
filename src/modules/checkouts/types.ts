import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type CheckoutGetProduct = inferRouterOutputs<AppRouter>['checkout']["getProducts"];

export type CheckOutProductType = inferRouterOutputs<AppRouter>['checkout']["getProducts"]["docs"][0]