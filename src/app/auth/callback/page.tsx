"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AuthCallback() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending) {
            if (session) {
                // Success! Redirect to dashboard or home
                console.log("✅ Session found:", session);
                router.push("/dashboard"); // Change to your protected route
            } else {
                // No session, redirect to login
                console.log("❌ No session found");
                router.push("/login");
            }
        }
    }, [session, isPending, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Completing sign in...</h2>
                <p className="mt-2 text-gray-600">Please wait</p>
            </div>
        </div>
    );
}