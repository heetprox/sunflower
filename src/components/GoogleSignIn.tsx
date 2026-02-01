"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Sign in failed:", error);
      window.location.href = "/error";
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      <div className="rounded-lg text-md text-[#f93cb7] transition-all duration-100 hover:text-white underline underline-offset-4 cursor-pointer">
        Sign in
      </div>
    </button>
  );
}