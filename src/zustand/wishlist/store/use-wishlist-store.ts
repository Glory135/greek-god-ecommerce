import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface UserCart {
  productIds: string[]
}

interface WishListState {
  userWishList: Record<string, UserCart>;
  addProduct: (userSlug: string, productId: string) => void;
  removeProduct: (userSlug: string, productId: string) => void;
  clearWishList: (userSlug: string) => void;
  clearAllWishLists: () => void;
  getWishListByUser: (userSlug: string) => string[];
}

export const useWishListStore = create<WishListState>()(
  persist(
    (set, get) => ({
      userWishList: {},
      addProduct: (userSlug, productId) =>
        set((state) => {          
          return ({
            userWishList: {
              ...state.userWishList,
              [userSlug]: {
                productIds: [
                  ...(state.userWishList[userSlug]?.productIds || []),
                  productId
                ]
              }
            }
          })
        }),
      removeProduct: (userSlug, productid) =>
        set((state) => ({
          userWishList: {
            ...state.userWishList,
            [userSlug]: {
              productIds: state.userWishList[userSlug]?.productIds
                .filter(i => (i !== productid)) || []
            }
          }
        })),
      clearWishList: (userSlug) =>
        set((state) => ({
          userWishList: {
            ...state.userWishList,
            [userSlug]: {
              productIds: []
            }
          }
        })),
      clearAllWishLists: () =>
        set({
          userWishList: {}
        }),
      getWishListByUser: (userSlug) =>
        get().userWishList[userSlug]?.productIds || [],
    }),
    {
      name: "greekgod-wishlist",
      storage: createJSONStorage(() => localStorage)
    }
  )
)