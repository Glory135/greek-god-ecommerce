import { useWishListStore } from "../store/use-wishlist-store"

export const useWishlist = (userSlug: string) => {
  const {
    addProduct,
    clearAllWishLists,
    clearWishList,
    removeProduct,
    getWishListByUser,
  } = useWishListStore()

  const products = getWishListByUser(userSlug)

  const toggleProduct = (productId: string) => {
    if (products.find(i => i === productId)) {
      removeProduct(userSlug, productId);
    } else {
      addProduct(userSlug, productId)
    }
  };

  const isProductInWishList = (productId: string) => {
    const isIn = products.filter(i => i === productId)
    return isIn.length > 0 ? true : false
  }

  const clearUserCart = () => {
    clearWishList(userSlug)
  }

  return {
    products,
    addProduct: (productId: string) => addProduct(userSlug, productId),
    removeProduct: (productId: string) => removeProduct(userSlug, productId),
    clearWishList: clearUserCart,
    clearAllWishLists,
    toggleProduct,
    isProductInWishList,
    totalProductsInCart: products.length
  }
}