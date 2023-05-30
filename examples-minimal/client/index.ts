import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  const createdUser = await trpc.userCreate.mutate({ name: '一百个Chocolate', email: 'chocolate@qq.com', password: 'Chocolate' });
  console.log('createdUser: ', createdUser);
  const userCreated = await trpc.userById.query({ id: '1' });
  console.log('userCreated: ', userCreated);
  const users = await trpc.userList.query();
  //    ^?
  console.log('Users:', users);
}

main();