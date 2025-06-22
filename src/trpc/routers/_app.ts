import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { layoutRouter } from '@/modules/layout/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  layout: layoutRouter,
  products:productsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;