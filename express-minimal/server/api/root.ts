import { createTRPCRouter } from "./trpc";
import { helloRouter, usersRouter } from "./router"

export const appRouter = createTRPCRouter({
  hello: helloRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;