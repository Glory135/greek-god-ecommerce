import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { layoutRouter } from '@/modules/layout/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  layout: layoutRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;