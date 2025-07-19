import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { checkoutRouter } from '@/modules/checkouts/server/procedures';
import { collectionsRouter } from '@/modules/collections/server/procedures';
import { colorsRouter } from '@/modules/colors/server/procedures';
import { deliveryRouter } from '@/modules/DeliveryAddresses/server/procedures';
import { layoutRouter } from '@/modules/layout/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';
import { sizesRouter } from '@/modules/sizes/server/procedures';
import { wishListRouter } from '@/modules/wishlist/server/procedures';
import { ordersRouter } from '@/modules/orders/server/procedures';
import { contactRouter } from '@/modules/contact/server/procedures';
import { lookBookRouter } from '@/modules/lookbook/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  collections: collectionsRouter,
  delivery: deliveryRouter,
  layout: layoutRouter,
  lookbook: lookBookRouter,
  products: productsRouter,
  checkout: checkoutRouter,
  wishlist: wishListRouter,
  colors: colorsRouter,
  sizes: sizesRouter,
  orders: ordersRouter,
  contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;