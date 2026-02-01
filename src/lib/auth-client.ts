import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://sunflower-backend-vv4o.onrender.com/", 
});

export const { 
  signIn, 
  signOut, 
  signUp,
  useSession 
} = authClient;