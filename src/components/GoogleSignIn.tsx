"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleSignIn() {
 const handleGoogleLogin = async () => {
        try {
            const data = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
            
            if (data.error) {
                console.error("Login error:", data.error);
            }
        } catch (error) {
            console.error("Login failed:", error);
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