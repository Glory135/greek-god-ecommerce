import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type DeliveryCreationInput = inferRouterInputs<AppRouter>['delivery']["addInfo"];
export type DeliveryUpdateInput = inferRouterInputs<AppRouter>['delivery']["updateAddress"];
export type DeliveryDeleteInput = inferRouterInputs<AppRouter>['delivery']["deleteAddress"];
export type DeliveryGetUserOutput = inferRouterOutputs<AppRouter>['delivery']["getUserAddresses"];
export type DeliveryGetOneOutput = inferRouterOutputs<AppRouter>['delivery']["getAddressById"];
