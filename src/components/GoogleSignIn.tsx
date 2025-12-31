"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleSignIn() {

const handleGoogleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000/dashboard",
    errorCallbackURL: "http://localhost:3000/error"
  });
};
  return (
    <button
      onClick={handleGoogleSignIn}
      className=""
    >
     
      <div className="rounded-lg bg-white px-6 py-2 super text-sm font-semibold text-black transition-all duration-100 hover:bg-black hover:text-white cursor-pointer">
      Sign in
      </div>
    </button>
  );
}
