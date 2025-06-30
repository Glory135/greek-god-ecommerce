import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { collectionsRouter } from '@/modules/collections/server/procedures';
import { colorsRouter } from '@/modules/colors/server/procedures';
import { layoutRouter } from '@/modules/layout/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';
import { sizesRouter } from '@/modules/sizes/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  collections: collectionsRouter,
  layout: layoutRouter,
  products: productsRouter,
  colors: colorsRouter,
  sizes: sizesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;