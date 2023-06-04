import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client"
import type { AppRouter } from "../../server/api/root"

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
})

async function main() {

  const withoutInputQuery = await client.hello.greeting.query();
  console.log(withoutInputQuery);

  const withInputQuery = await client.hello.greeting.query({ name: 'Chocolate' });
  console.log(withInputQuery);

  const users = await Promise.all([
    client.users.queryById.query("1"),
    client.users.queryById.query("2"),
  ])
  console.log(users)

  const newUser = await client.users.createUser.mutate({ name: "Choi", age: 12 })
  console.log(newUser)

  const newUserGot = await client.users.queryById.query(newUser.id)
  console.log(newUserGot)
}

main()