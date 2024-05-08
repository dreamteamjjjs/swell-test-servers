import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return `Hello, ${input.name || 'world'}!`;
    }),
});

export type AppRouter = typeof appRouter;
export default appRouter;
