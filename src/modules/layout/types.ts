import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type LayoutNavItems = inferRouterOutputs<AppRouter>['layout']["getNavigationData"];
export type LayoutNavItemsSingle = LayoutNavItems[0]