import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserCart {
  productIds: string[];
}

interface CartState {
  userCarts: Record<string, UserCart>;
  addProduct: (userSlug: string, productId: string) => void;
  removeProduct: (userSlug: string, productId: string) => void;
  clearCart: (userSlug: string) => void;
  clearAllCarts: () => void;
  getCartByUser: (userSlug: string) => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      userCarts: {},
      addProduct: (userSlug, productId) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userSlug]: {
              productIds: [
                ...(state.userCarts[userSlug]?.productIds || []),
                productId
              ]
            }
          }
        })),
      removeProduct: (userSlug, productId) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userSlug]: {
              productIds: state.userCarts[userSlug]?.productIds.filter(id => id !== productId) || []
            }
          }
        })),
      clearCart: (userSlug) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userSlug]: {
              productIds: []
            }
          }
        })),
      clearAllCarts: () =>
        set({
          userCarts: {}
        }),
      getCartByUser: (userSlug) =>
        get().userCarts[userSlug]?.productIds || []
    }),
    {
      name: "greekgod-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
)