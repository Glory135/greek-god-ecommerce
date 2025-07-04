import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type WishListGetProduct = inferRouterOutputs<AppRouter>['wishlist']["getProducts"];
export type WishListProductType = inferRouterOutputs<AppRouter>['wishlist']["getProducts"]["docs"][0]