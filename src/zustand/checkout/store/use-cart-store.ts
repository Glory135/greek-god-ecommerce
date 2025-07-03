import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IProductInCart {
  productId: string;
  color?: string;
  size?: string;
  quantity: number
}
interface UserCart {
  products: Array<IProductInCart>
}

interface CartState {
  userCarts: Record<string, UserCart>;
  addProduct: (userSlug: string, product: IProductInCart) => void;
  quantity: (userSlug: string, productId: string, change: "+" | "-") => void;
  removeProduct: (userSlug: string, productId: string) => void;
  clearCart: (userSlug: string) => void;
  clearAllCarts: () => void;
  getCartByUser: (userSlug: string) => IProductInCart[];
  getSingleProductInCartByUser: (userSlug: string, productId: string) => IProductInCart | null;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      userCarts: {},
      addProduct: (userSlug, product) =>
        set((state) => {
          const prodClone = { ...product }
          if (!prodClone.quantity) {
            prodClone.quantity = 1
          }
          return ({
            userCarts: {
              ...state.userCarts,
              [userSlug]: {
                products: [
                  ...(state.userCarts[userSlug]?.products || []),
                  prodClone
                ]
              }
            }
          })
        }),
      quantity: (userSlug, productId, change) =>
        set((state) => {
          const updatedProd = [...(state.userCarts[userSlug]?.products || [])].map(singleProd => {
            if (singleProd.productId === productId) {
              if (!singleProd.quantity || (singleProd.quantity === 1 && change === "-")) {
                return {
                  ...singleProd,
                  quantity: 1
                }
              }
              if (change === "+") {
                return {
                  ...singleProd,
                  quantity: singleProd.quantity + 1
                }
              }
              if (change === "-" && singleProd.quantity > 0) {
                return {
                  ...singleProd,
                  quantity: singleProd.quantity - 1
                }
              }
            }
            return singleProd
          })

          return ({
            userCarts: {
              ...state.userCarts,
              [userSlug]: {
                products: [...updatedProd]
              }
            }
          })
        }),
      removeProduct: (userSlug, productid) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userSlug]: {
              products: state.userCarts[userSlug]?.products
                .filter(
                  (singleProduct) =>
                    (singleProduct.productId !== productid)
                ) || []
            }
          }
        })),
      clearCart: (userSlug) =>
        set((state) => ({
          userCarts: {
            ...state.userCarts,
            [userSlug]: {
              products: []
            }
          }
        })),
      clearAllCarts: () =>
        set({
          userCarts: {}
        }),
      getCartByUser: (userSlug) =>
        get().userCarts[userSlug]?.products || [],

      getSingleProductInCartByUser: (userSlug, productId) =>
        get().userCarts[userSlug]?.products?.find(i => i.productId === productId) || null,
    }),
    {
      name: "greekgod-cart",
      storage: createJSONStorage(() => localStorage)
    }
  )
)