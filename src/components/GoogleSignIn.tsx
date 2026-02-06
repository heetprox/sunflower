"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleSignIn() {
  const handleGoogleLogin = async () => {
    try {
      const frontendURL = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${frontendURL}/dashboard`, // ✅ Full URL
        errorCallbackURL: `${frontendURL}/login?error=auth_failed`,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      <div className="rounded-lg text-md text-[#f93cb7] transition-all duration-100 hover:text-white underline underline-offset-4 cursor-pointer">
        Sign in
      </div>
    </button>
  );
}