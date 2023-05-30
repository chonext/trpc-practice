import { db } from './db';
import { publicProcedure, router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import z from 'zod';

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const users = await db.user.findMany();
      return users;
    }),
  userById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input;
    const user = await db.user.findById(id);
    return user;
  }),
  userCreate: publicProcedure.input(z.object({ name: z.string(), email: z.string(), password: z.string() })).mutation(async ({ input }) => {
    const user = await db.user.create(input);
    return user;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;


const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);