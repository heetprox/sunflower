"use client";

export function GoogleSignIn() {
  const handleGoogleSignIn = () => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    window.location.href = `${apiUrl}/auth/social/google?callbackURL=http://localhost:3000/dashboard&errorCallbackURL=http://localhost:3000/error`;
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className=""
    >
      <div className="rounded-lg edi text-md text-[#f93cb7] transition-all duration-100 hover:text-white underline underline-offset-4 cursor-pointer">
        Sign in
      </div>
    </button>
  );
}
