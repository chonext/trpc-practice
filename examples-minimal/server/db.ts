type User = { id: string; name: string, email: string, password: string };

// Imaginary database
const users: User[] = [];
export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: { name: string, email: string, password: string }) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};