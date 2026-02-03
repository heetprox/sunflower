import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:"https://sunflower.realblue.lol",
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signOut,
  signUp,
  useSession
} = authClient;