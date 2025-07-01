import { useCartStore } from "../store/use-cart-store"

export const useCart = (userSlug: string) => {
  const {
    addProduct,
    clearAllCarts,
    clearCart,
    getCartByUser,
    removeProduct,
  } = useCartStore()

  const productIds = getCartByUser(userSlug)

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(userSlug, productId);
    } else {
      addProduct(userSlug, productId)
    }
  };

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId)
  }

  const clearUserCart = () => {
    clearCart(userSlug)
  }

  return {
    productIds,
    addProduct: (productId: string) => addProduct(userSlug, productId),
    removeProduct: (productId: string) => addProduct(userSlug, productId),
    clearCart: clearUserCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalProductsInCart: productIds.length
  }
}