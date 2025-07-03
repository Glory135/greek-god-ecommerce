import { IProductInCart, useCartStore } from "../store/use-cart-store"

export const useCart = (userSlug: string) => {
  const {
    addProduct,
    quantity,
    clearAllCarts,
    clearCart,
    getCartByUser,
    removeProduct,
    getSingleProductInCartByUser
  } = useCartStore()

  const products = getCartByUser(userSlug)

  const singleProductInCart = (productId: string) => {
    getSingleProductInCartByUser(userSlug, productId)
  }

  const toggleProduct = (product: IProductInCart) => {    
    if (products.find(i=>i.productId === product.productId)) {
      removeProduct(userSlug, product.productId);
    } else {
      addProduct(userSlug, product)
    }
  };

  const increaseQuantity = (prodId: string) => {
    quantity(userSlug, prodId, "+")
  }
  const decreaseQuantity = (prodId: string) => {
    quantity(userSlug, prodId, "-")
  }

  const isProductInCart = (productId: string) => {
    const isIn = products.filter(i => i.productId === productId)
    return isIn.length > 0 ? true : false
  }

  const clearUserCart = () => {
    clearCart(userSlug)
  }

  return {
    products,
    singleProductInCart,
    addProduct: (product: IProductInCart) => addProduct(userSlug, product),
    removeProduct: (productId: string) => removeProduct(userSlug, productId),
    clearCart: clearUserCart,
    clearAllCarts,
    toggleProduct,
    increaseQuantity,
    decreaseQuantity,
    isProductInCart,
    totalProductsInCart: products.length
  }
}