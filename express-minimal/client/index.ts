import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from '../server/api/root';

async function main() {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink(),
      httpBatchLink({
        url: 'http://localhost:3000/trpc',
      }),
    ],
  });

  const withoutInputQuery = await client.hello.greeting.query();
  console.log(withoutInputQuery);

  const withInputQuery = await client.hello.greeting.query({ name: 'Alex' });
  console.log(withInputQuery);
}

void main();