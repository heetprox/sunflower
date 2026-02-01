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
     
      <div className="rounded-lg   edi  text-md  text-[#f93cb7] transition-all duration-100 hover:text-white underline underline-offset-4 cursor-pointer">
      Sign in
      </div>
    </button>
  );
}
