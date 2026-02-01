"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // ✅ Use relative path (cleaner)
      });
    } catch (error) {
      console.error("Sign in failed:", error);
      // Optionally redirect to error page
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