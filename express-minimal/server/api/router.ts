import { publicProcedure, createTRPCRouter } from "./trpc";
import { randomUUID } from "crypto"
import { USERS } from '../db'
import type { User } from '../db'
import z from 'zod';

export const helloRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return `Hello ${input?.name ?? 'World'}`;
    }),
});

export const usersRouter = createTRPCRouter({
  queryById: publicProcedure.input(z.string()).query(req => {
    return USERS.find(user => user.id === req.input)
  }),
  createUser: publicProcedure
    .input(z.object({ name: z.string(), age: z.number() }))
    .mutation(req => {
      const { name, age } = req.input
      const user: User = { id: randomUUID(), name, age }
      USERS.push(user)
      return user
    }),
})