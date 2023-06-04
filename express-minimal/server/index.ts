import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { appRouter } from './api/root';

async function main() {
  // express implementation
  const app = express();

  app.use(cors({ origin: "http://localhost:5173" }))

  // For testing purposes, wait-on requests '/'
  app.get('/', (_req, res) => res.send('Server is running!'));

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({}),
    }),
  );
  app.listen(3000);
}

void main();